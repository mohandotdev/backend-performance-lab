# EXPLAIN ANALYZE Notes

## Purpose

EXPLAIN ANALYZE allows us to understand how PostgreSQL executes a query.

Instead of guessing, we can inspect:

* Scan strategy
* Sorting operations
* Execution time
* Planner decisions

---

## Query Used

```sql
EXPLAIN ANALYZE

SELECT *
FROM "Contract"
WHERE "tenantId" = 1
ORDER BY "createdAt" DESC
LIMIT 1000;
```

---

## Sequential Scan

Before optimization:

```text
Seq Scan on Contract
```

Meaning:

```text
Read Entire Table
↓
Apply Filter
↓
Discard Non-Matching Rows
```

Evidence:

```text
Rows Removed by Filter: 9000
```

---

## Bitmap Index Scan

After optimization:

```text
Bitmap Index Scan
```

Meaning:

```text
Read Matching Entries From Index
↓
Build Bitmap
↓
Fetch Required Table Pages
```

This reduces unnecessary table scanning.

---

## Bitmap Heap Scan

Observed after adding the composite index.

PostgreSQL used:

```text
Bitmap Index Scan
↓
Bitmap Heap Scan
```

Reason:

Approximately 1000 rows matched the query.

Fetching rows in batches was more efficient than performing many individual index lookups.

---

## Cost

Before:

```text
285.83..288.33
```

After:

```text
189.36..191.86
```

Lower cost indicates PostgreSQL expects less work.

---

## Execution Time

Before:

```text
0.698 ms
```

After:

```text
0.292 ms
```

Improvement:

```text
≈ 58%
```

---

## Important Lesson

Query plans are more reliable indicators of database optimization than API response times.

Application latency can be influenced by:

* ORM processing
* Serialization
* Network overhead
* Runtime execution

while EXPLAIN ANALYZE focuses specifically on database behavior.
