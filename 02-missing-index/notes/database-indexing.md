# Database Indexing Notes

## What is an Index?

An index is a data structure used by a database to locate rows more efficiently without scanning the entire table.

Similar to a book index:

Without an index:

```text
Read every page
↓
Find matching content
```

With an index:

```text
Jump directly to the relevant page
```

The same principle applies to database queries.

---

## Why Do Databases Need Indexes?

Consider:

```sql
SELECT *
FROM Contract
WHERE tenantId = 1;
```

Without an index:

```text
Read Row 1
Read Row 2
Read Row 3
...
Read Row 10000
```

This is called a Sequential Scan.

With an index:

```text
Locate tenantId = 1 in index
↓
Jump directly to matching rows
```

---

## Common PostgreSQL Index Types

### B-Tree

Default PostgreSQL index.

Supports:

* =
* <
* >
* BETWEEN
* ORDER BY

Example:

```sql
CREATE INDEX idx_contract_tenant
ON Contract(tenantId);
```

Used in this scenario.

---

### Hash

Optimized for equality lookups.

```sql
WHERE id = 10
```

Less commonly used than B-Tree.

---

### GIN

Used for:

* JSONB
* Arrays
* Full-text search

Example:

```sql
metadata JSONB
```

---

### GiST

Used for:

* Geospatial queries
* Range queries

---

### BRIN

Designed for very large tables.

Common in:

* Time-series systems
* Logging platforms

---

## Single Column Index

Example:

```sql
CREATE INDEX idx_contract_tenant
ON Contract(tenantId);
```

Helps:

```sql
WHERE tenantId = 1
```

But does not help sorting.

---

## Composite Index

Example:

```sql
CREATE INDEX idx_contract_tenant_created_at
ON Contract(tenantId, createdAt DESC);
```

Supports:

```sql
WHERE tenantId = 1
ORDER BY createdAt DESC
```

This was the optimization implemented in this scenario.

---

## How Composite Indexes Work

Internally PostgreSQL stores values in sorted order.

Conceptually:

```text
(1, 2025-12-01)
(1, 2025-11-30)
(1, 2025-11-29)

(2, 2025-12-05)
(2, 2025-12-04)
```

This allows PostgreSQL to filter and sort efficiently.

---

## What Does An Index Store?

Indexes do not store complete rows.

Instead they store:

```text
Indexed Value

+

Pointer To Table Row
```

Conceptually:

```text
tenantId = 1

↓

Row A
Row B
Row C
```

PostgreSQL then fetches actual row data using those references.
