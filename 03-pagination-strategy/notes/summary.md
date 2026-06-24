# Summary

## Scenario

03-pagination-strategy

---

## Objective

Investigate and resolve performance issues caused by returning large datasets without pagination.

---

## Dataset

```text
Tenants: 10
Contracts Per Tenant: 100,000
Total Contracts: 1,000,000
```

---

## Problem

The endpoint returned all contracts for a tenant.

```http
GET /contracts?tenantId=1
```

Result:

```text
100,000 contracts
```

per request.

---

## Symptoms

### Postman

| Metric | Value |
|----------|----------|
| Response Time | 1.16 sec |
| Payload Size | 16.67 MB |

### JMeter

| Metric | Value |
|----------|----------|
| Average Response Time | 5260.02 ms |
| Throughput | 0.72 req/sec |

---

## Investigation

Verified:

- Query count healthy
- Index usage healthy
- Database execution healthy

Large response payload identified as the primary bottleneck.

---

## Root Cause

The endpoint lacked a pagination strategy.

Returning the entire dataset created:

- Large JSON payloads
- Increased serialization costs
- Increased network transfer costs
- Poor throughput under load

---

## Optimization 1

### Offset Pagination

Implemented:

```ts
skip
take
```

Results:

- Payload reduced to 8.92 KB
- Average response time reduced to 3.56 ms
- Throughput increased to 44.37 req/sec

---

## Optimization 2

### Cursor Pagination

Implemented:

```ts
cursor
take
```

Results:

- Average response time reduced to 2.45 ms
- Stable execution characteristics
- Better scalability for deep navigation

---

## Final Results

| Metric | Before | Offset | Cursor |
|----------|----------:|----------:|----------:|
| Payload Size | 16.67 MB | 8.92 KB | 8.7 KB |
| Response Time | 1.16 sec | 36 ms | 40 ms |
| Avg Response Time | 5260 ms | 3.56 ms | 2.45 ms |
| Throughput | 0.72 req/sec | 44.37 req/sec | 44.06 req/sec |

---

## Key Takeaways

- Not every slow API is a database problem.
- Large payloads can become the dominant bottleneck.
- Pagination should be implemented for collection endpoints.
- Offset pagination is simple and effective.
- Cursor pagination provides better scalability.
- Performance improvements should always be validated using benchmarks and query analysis.

---

## Final Learning

The most impactful optimization in this scenario was not a database change.

The biggest improvement came from reducing the amount of data transferred between the server and client.