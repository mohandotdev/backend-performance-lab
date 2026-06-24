# Root Cause Analysis

## Problem Statement

The contract listing endpoint returned all available contracts for a tenant in a single response.

---

## Original Implementation

```ts
await prisma.contract.findMany({
  where: {
    tenantId
  }
});
```

No pagination mechanism existed.

---

## Impact

For a tenant containing:

```text
100,000 contracts
```

the application performed:

```text
Database
↓
100,000 rows returned

Prisma
↓
Object creation

Node.js
↓
JSON serialization

Network
↓
16.67 MB transfer

Client
↓
JSON parsing
```

---

## Why The API Became Slow

The database was not the bottleneck.

The primary cost came from:

* Large payload generation
* JSON serialization
* Network transfer
* Client-side parsing

---

## Offset Pagination Solution

Implemented:

```ts
skip
take
```

Benefits:

* Reduced payload size
* Reduced serialization cost
* Reduced network usage

Limitation:

As page depth increases, the database must scan and discard more rows.

---

## Cursor Pagination Solution

Implemented:

```ts
cursor
take
```

Benefits:

* Consistent navigation performance
* Avoids large OFFSET scans
* Better scalability for large datasets

---

## Root Cause

The endpoint lacked an appropriate pagination strategy and attempted to return the complete dataset in a single response.

---

## Recommended Approach

Use pagination for all large collection endpoints.

Prefer cursor pagination for APIs expected to handle deep navigation or very large datasets.
