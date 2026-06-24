# Pagination Notes

## What is Pagination?

Pagination is a technique used to divide large datasets into smaller chunks instead of returning all records in a single API response.

Without pagination:

```http
GET /contracts?tenantId=1
```

the API may return:

```text
100,000 contracts
```

in a single response.

With pagination:

```http
GET /contracts?tenantId=1&page=1&pageSize=50
```

only:

```text
50 contracts
```

are returned.

---

## Why Pagination Matters

Large responses introduce performance issues across multiple layers of the application.

### Database

- More rows need to be read.
- More data needs to be transferred to the application.

### Application

- More objects created in memory.
- Higher JSON serialization cost.

### Network

- Larger payloads.
- Higher bandwidth consumption.

### Client

- Increased parsing time.
- Slower rendering.

---

## Symptoms of Missing Pagination

Common indicators:

- Large response payloads.
- High memory usage.
- Slow API response times.
- Increased network traffic.
- Poor throughput under load.

---

## When Pagination Should Be Applied

Pagination should be considered whenever an endpoint can return:

- Hundreds of rows
- Thousands of rows
- Continuously growing datasets

Examples:

- Contracts
- Invoices
- Users
- Orders
- Audit Logs
- Notifications

---

## Pagination Strategies

### Offset Pagination

Uses:

```ts
skip
take
```

Example:

```http
?page=5&pageSize=50
```

### Cursor Pagination

Uses:

```ts
cursor
take
```

Example:

```http
?cursor=50000&limit=50
```

---

## Key Learning

A slow API is not always caused by database queries.

Large payload generation, serialization, and network transfer can become the primary bottlenecks even when query execution is efficient.