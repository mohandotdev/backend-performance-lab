# Investigation

## Scenario

Contract listing endpoint exhibits increasing response times despite the N+1 query issue already being resolved.

Endpoint:

```http
GET /contracts?tenantId=1
```

The service already uses optimized Prisma relation loading and aggregate counts.

No excessive query execution was observed.

---

## Environment

- Runtime: Node.js
- Framework: Express.js
- ORM: Prisma
- Database: PostgreSQL

Dataset:

| Entity | Records |
|----------|----------:|
| Tenants | 10 |
| Users | 200 |
| Contracts | 10,000 |
| Approvals | 30,000 |
| Comments | 50,000 |

---

## Initial Observation

Symptoms:

- Query count is low
- Database CPU usage increases during load
- Response time grows as contract volume increases
- Query execution plan indicates sequential scanning

## Investigation Approach

1. Measure API response times.
2. Inspect generated SQL.
3. Analyze PostgreSQL execution plan.
4. Identify scan strategy.
5. Evaluate indexing opportunities.

---

## Query Under Investigation

```sql
SELECT *
FROM "Contract"
WHERE "tenantId" = 1
ORDER BY "createdAt" DESC
LIMIT 1000;
```

## Execution Plan (Before Optimization)

```sql
EXPLAIN ANALYZE

SELECT *
FROM "Contract"
WHERE "tenantId" = 1
ORDER BY "createdAt" DESC
LIMIT 1000;
```

Observed:

```text
 Seq Scan on "Contract"
 Filter: ("tenantId" = 5)
```

The database scans the table before filtering and sorting.

---

## Findings

The query frequently filters by:

- tenantId

and sorts by:

- createdAt DESC

No supporting index exists for this access pattern.

The PostgreSQL planner therefore chooses a sequential scan.