# Case Study - Pagination Strategy

## Overview

This scenario demonstrates how returning large datasets without pagination can become a major performance bottleneck even when database queries are already optimized.

---

## Business Context

The endpoint retrieves contracts belonging to a tenant.

Dataset:

- 100,000 contracts per tenant
- 1,000,000 total contracts

The API originally returned the complete dataset in a single request.

---

## Symptoms

- Large response payloads
- Slow API responses
- Low throughput
- Increased network utilization

---

## Root Cause

No pagination strategy was implemented.

The endpoint attempted to return 100,000 contracts in a single response.

---

## Optimization Strategy

### Phase 1 - Offset Pagination

Implemented:

```ts
skip;
take;
```

to limit the number of records returned.

---

### Phase 2 - Cursor Pagination

Implemented:

```ts
cursor;
take;
```

to avoid growing OFFSET costs for deep page navigation.

---

## Benchmark Comparison

### No Pagination vs Offset Pagination

| Metric                       | No Pagination | Offset Pagination |
| ---------------------------- | ------------: | ----------------: |
| Payload Size                 |      16.67 MB |           8.92 KB |
| Postman Response Time        |      1.16 sec |             36 ms |
| JMeter Average Response Time |    5260.02 ms |           3.56 ms |
| Throughput                   |  0.72 req/sec |     44.37 req/sec |

---

### Offset vs Cursor Pagination

| Metric                | Offset Pagination | Cursor Pagination |
| --------------------- | ----------------: | ----------------: |
| Average Response Time |           3.56 ms |           2.45 ms |
| Throughput            |     44.37 req/sec |     44.06 req/sec |
| Error Rate            |             0.00% |             0.00% |

---

## SQL Analysis

Offset pagination:

```text
OFFSET 0    -> 0.053 ms
OFFSET 500  -> 0.078 ms
OFFSET 1000 -> 0.120 ms
OFFSET 2000 -> 3.057 ms
```

Execution cost increased as the offset grew.

---

Cursor pagination:

```text
id < 2000 -> 0.624 ms
id < 1000 -> 0.167 ms
id < 500  -> 0.163 ms
id < 100  -> 0.054 ms
id < 50   -> 0.029 ms
```

Execution remained stable and relied on indexed lookups.

---

## Lessons Learned

- Database optimization alone is not sufficient.
- Large payloads can become the dominant bottleneck.
- Pagination should be applied to collection endpoints.
- Offset pagination is simple and effective.
- Cursor pagination provides better scalability for deep navigation scenarios.
- Always validate optimizations using benchmarks and query plans.

---

## Key Takeaways

- Identified an API performance issue caused by returning 100,000 records in a single response.
- Measured payload size, response time, and throughput before making changes.
- Implemented offset pagination to reduce payload size and improve responsiveness.
- Evaluated deep-page performance using EXPLAIN ANALYZE.
- Implemented cursor pagination as a scalable alternative.
- Validated improvements using Postman, JMeter, and SQL execution plans.
