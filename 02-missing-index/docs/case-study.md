# Case Study - Missing Composite Index

## Overview

This scenario demonstrates a common database performance issue where an application executes efficient SQL queries, but the database lacks the appropriate indexes to execute them efficiently.

Unlike the N+1 Query scenario, the bottleneck in this case exists entirely within PostgreSQL.

---

## Business Context

The endpoint retrieves contracts belonging to a tenant.

Requirements:

- Filter by tenant
- Sort by creation date
- Return latest contracts

Example:

```http
GET /contracts?tenantId=1
```

---

## Symptoms

Observed during load testing:

- Higher response times than expected
- Increased database CPU activity
- Sequential table scans
- Performance degradation as table size grows

---

## Investigation

The generated SQL was analyzed using:

```sql
EXPLAIN ANALYZE
```

Execution plan:

```text
Seq Scan
```

The database scanned a large portion of the Contract table before returning results.

---

## Root Cause

The query pattern:

```sql
WHERE tenantId = ?
ORDER BY createdAt DESC
LIMIT 1000
```

did not have a supporting index.

Without an index PostgreSQL performed:

```text
Scan
↓
Filter
↓
Sort
```

for every request.

---

## Optimization Strategy

Introduce a composite B-Tree index:

```sql
CREATE INDEX idx_contract_tenant_created_at
ON "Contract"(tenantId, createdAt DESC);
```

Equivalent Prisma schema:

```prisma
@@index([tenantId, createdAt(sort: Desc)])
```

---

## Execution Plan Comparison

### Before

```text
Seq Scan
```

### After

```text
Index Scan
```

---

## Benchmark Comparison

### API Metrics

| Metric                |        Before |         After |
| --------------------- | ------------: | ------------: |
| Query Count           |             2 |             2 |
| Average Response Time |      21.98 ms |      24.50 ms |
| Throughput            | 40.92 req/sec | 38.11 req/sec |
| Error Rate            |         0.00% |         0.00% |

### Database Metrics

| Metric                 |         Before |             After |
| ---------------------- | -------------: | ----------------: |
| Scan Strategy          |       Seq Scan | Bitmap Index Scan |
| Rows Removed By Filter |           9000 |                 0 |
| Execution Time         |       0.698 ms |          0.292 ms |
| Query Cost             | 285.83..288.33 |    189.36..191.86 |

---

## Key Findings

The benchmark produced an unexpected result:

API response times remained similar after adding the index.

Further investigation revealed that the database query itself was already executing in less than 1 millisecond. At the current dataset size (~10,000 contracts), application-layer processing, ORM execution, serialization, and network overhead contributed more to total request latency than database scanning.

However, execution plan analysis clearly demonstrated that PostgreSQL adopted a more efficient access strategy:

Before:

```text
Seq Scan
↓
Filter
↓
Sort
```

After:

```text
Bitmap Index Scan
↓
Bitmap Heap Scan
↓
Sort
```

The database execution time improved by approximately 58%, validating the effectiveness of the composite index.

---

## Lessons Learned

* Index effectiveness should be validated using execution plans, not API latency alone.
* Small datasets may not show significant end-to-end improvements after indexing.
* PostgreSQL's query planner may choose different scan strategies depending on table size and query selectivity.
* Database execution metrics often reveal optimization opportunities that are hidden at the API level.
* Performance optimizations should always be backed by measurable evidence rather than assumptions.
