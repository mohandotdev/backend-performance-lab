# Root Cause Analysis

## Problem

The contract listing endpoint experienced unnecessary database work despite having an optimized application layer.

---

## Investigation Summary

```sql
WHERE tenantId = ?
ORDER BY createdAt DESC
LIMIT 1000
```

This query is executed frequently and forms a critical read path.

---

## Execution Plan

Before optimization:

```text
Seq Scan
↓
Filter tenantId
↓
Sort createdAt
↓
Return rows
```

The database scans a large portion of the table before returning results.

---

## Root Cause

A supporting index was missing.

The database had no efficient structure to:

- Filter contracts by tenant
- Return records already sorted by creation date

As a result PostgreSQL performed:

```text
Full Table Scan
+
Additional Sort Operation
```

for every request.

---

## Why Existing Indexes Were Not Enough

The primary key index on:

```text
id (primary key)
```

does not help because the query does not filter using the primary key.

The database requires an index matching the query access pattern.

---

## Solution

Create a composite B-Tree index:

```sql
CREATE INDEX idx_contract_tenant_created_at
ON "Contract"(tenantId, createdAt DESC);
```

Prisma Schema Modification (Composite Index Addition):

```
@@index([tenantId, createdAt(sort: Desc)]) 
```

This index allows PostgreSQL to:

```text
Locate tenant rows
↓
Maintain sorted order
↓
Return results directly
```

without scanning the entire table.

---

## Conclusion

The root cause was not inefficient application code.

The bottleneck existed at the database layer due to a missing composite index supporting the query pattern.