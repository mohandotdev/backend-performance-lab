# Root Cause Analysis

## Problem Statement

The contract listing endpoint became increasingly slow as tenant data volume grew.

---

## Existing Query

```ts
await prisma.contract.findMany({
  where: {
    tenantId
  },
  orderBy: {
    createdAt: "desc"
  }
});
```

No pagination was applied.

---

## Why The Query Became Expensive

For a tenant containing:

```text
100,000 contracts
```

the application performed the following steps:

```text
Database
↓
Return 100,000 rows

Prisma
↓
Create JavaScript objects

Node.js
↓
Serialize large JSON payload

Network
↓
Transfer 16.67 MB response

Browser
↓
Parse JSON
```

Although database execution remained efficient, the amount of data returned became the dominant cost.

---

## Impact

### Server Side

* Increased memory consumption
* Increased serialization time
* Longer request processing

### Network

* Large response payloads
* Reduced throughput
* Higher bandwidth consumption

### Client Side

* Slower page rendering
* Increased JSON parsing time

---

## Why Previous Optimizations Did Not Help

### N+1 Query Optimization

Scenario 01 reduced:

```text
3001 queries
↓
2 queries
```

This solved excessive database round-trips.

---

### Index Optimization

Scenario 02 improved:

```text
Sequential Scan
↓
Bitmap Index Scan
```

This improved database access efficiency.

---

However, neither optimization reduced the amount of data being returned.

The endpoint still attempted to return the complete dataset.

---

## Root Cause

The endpoint lacked a pagination strategy.

Returning all records in a single response caused the application and network layers to become the primary performance bottlenecks.

---

## Recommended Solution

Implement pagination.

Initial approach:

```ts
skip
take
```

Future optimization:

```ts
cursor-based pagination
```

to avoid large OFFSET costs at scale.
