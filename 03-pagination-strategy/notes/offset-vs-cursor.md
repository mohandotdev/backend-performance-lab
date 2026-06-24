# Offset Pagination vs Cursor Pagination

## Offset Pagination

Offset pagination retrieves records by skipping a number of rows before returning the requested dataset.

Example:

```http
?page=100&pageSize=50
```

Query logic:

```ts
skip = (page - 1) * pageSize
take = pageSize
```

Example:

```sql
LIMIT 50 OFFSET 4950
```

---

## Advantages

- Easy to implement.
- Easy for frontend applications.
- Supports direct page navigation.
- Works well for small and medium datasets.

---

## Disadvantages

As page depth increases:

```text
Database
↓
Read Rows
↓
Skip Rows
↓
Discard Rows
↓
Return Requested Records
```

The database performs additional work for every skipped row.

---

## Cursor Pagination

Cursor pagination uses a reference value to continue reading from a known position.

Example:

```http
?cursor=50000&limit=50
```

Query logic:

```sql
WHERE id < 50000
LIMIT 50
```

---

## Advantages

- Stable performance.
- Efficient index utilization.
- Better scalability.
- Ideal for infinite scrolling.
- Suitable for very large datasets.

---

## Disadvantages

- Slightly more complex implementation.
- No direct page-number navigation.
- Requires a unique sortable field.

---

## Comparison

| Feature | Offset | Cursor |
|----------|----------|----------|
| Easy to Implement | ✅ | ⚠️ |
| Page Numbers | ✅ | ❌ |
| Infinite Scroll | ⚠️ | ✅ |
| Large Dataset Performance | ⚠️ | ✅ |
| Deep Page Navigation | ⚠️ | ✅ |
| Index Efficiency | Moderate | High |

---

## Lab Observation

For the current dataset:

```text
100,000 contracts per tenant
1,000,000 contracts total
```

both strategies performed well.

However:

- Offset execution cost increased with larger offsets.
- Cursor execution remained more stable.

---

## Key Learning

Offset pagination is a practical solution for most applications.

Cursor pagination is preferable when working with very large datasets or APIs requiring consistent performance regardless of page depth.