# Scenario Learnings

## What Was The Problem?

The application query count had already been optimized.

However, PostgreSQL was still executing:

```text
Sequential Scan
```

for a frequently used query.

---

## Investigation Process

1. Observed API behavior.
2. Verified query count remained low.
3. Executed EXPLAIN ANALYZE.
4. Identified Sequential Scan.
5. Examined query pattern.
6. Added composite index.
7. Re-ran EXPLAIN ANALYZE.
8. Verified Bitmap Index Scan.
9. Compared execution metrics.

---

## Key Takeaways

### Query Count Is Not Everything

Reducing query count improves application performance.

However, even optimized queries can become inefficient if database access paths are poor.

---

### Measure Before Optimizing

Indexes should not be added blindly.

Evidence should come from:

* EXPLAIN ANALYZE
* Query costs
* Execution time
* Scan strategy

---

### Small Datasets Can Be Misleading

The API response time remained nearly identical after indexing.

Reason:

The database query already executed in less than 1 millisecond.

At this scale:

* Network overhead
* Prisma execution
* JSON serialization

contributed more to overall latency.

---

### Indexes Improve Scalability

The primary value of an index is not always immediate speed.

Indexes ensure queries continue performing efficiently as data volume grows.

---

### Composite Indexes Should Match Query Patterns

The optimized query used:

```sql
WHERE tenantId = ?
ORDER BY createdAt DESC
```

The index was designed to support both operations:

```sql
(tenantId, createdAt DESC)
```

A good index reflects how data is accessed.

---

## What I Learned

* How PostgreSQL executes queries internally.
* Difference between Sequential Scan and Bitmap Index Scan.
* How composite indexes work.
* How to interpret EXPLAIN ANALYZE output.
* Why execution plans matter more than assumptions.
* How to validate database optimizations using evidence.
