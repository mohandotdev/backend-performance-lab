# Benchmark Results - After Optimization

## Environment

- Runtime: Node.js
- Framework: Express.js
- ORM: Prisma
- Database: PostgreSQL
- Dataset:
  - Tenants: 10
  - Users: 200
  - Contracts: 10,000
  - Approvals: 30,000
  - Comments: 50,000

## Test Configuration

Endpoint:

```http
GET /contracts?tenantId=1
```

Load Profile:

```text
Virtual Users: 10
Ramp-Up: 5 seconds
Iterations per User: 20

Total Requests: 200
```

---

## Results

| Metric | Value |
|----------|-------------|
| Total Requests | 200 |
| Average Response Time | 24.35 ms |
| Minimum Response Time | 16 ms |
| Maximum Response Time | 181 ms |
| Median Response Time | 20.00 ms |
| 90th Percentile | 38.00 ms |
| 95th Percentile | 41.00 ms |
| 99th Percentile | 49.96 ms |
| Throughput | 39.46 req/sec |
| Error Rate | 0.00% |
| Query Count | 2 |

---

## Observations

- Average response time dropped from multiple seconds to just 24.35 ms.
- Median response time remained consistently low at 20 ms.
- 99th percentile latency stayed below 50 ms, indicating stable performance under load.
- Throughput increased significantly from less than 1 request/sec to nearly 40 requests/sec.
- No functional failures or request errors were observed.
- Query logging confirmed that the endpoint executed only 2 database queries regardless of the number of contracts returned.

---

## Optimization Applied

The original implementation suffered from an N+1 query problem by executing:

- One query to fetch contracts
- One query per contract to fetch creator information
- One query per contract to count approvals
- One query per contract to count comments

The endpoint was refactored to:

- Fetch related user information using Prisma relation selection
- Retrieve approval and comment counts using `_count`
- Eliminate all per-record database queries
- Return only the required fields through selective projection

This reduced approximately **3001 SQL queries to just 2 queries** for the same request.

---

## Performance Improvement Summary

| Metric                | Before       | After        |
|-----------------------|-------------:|-------------:|
| Query Count           | ~3001        | 2            |
| Average Response Time | 10222.58 ms  | 24.35 ms     |
| Minimum Response Time | 6546 ms      | 16 ms        |
| Maximum Response Time | 16199 ms     | 181 ms       |
| Median Response Time  | 9684.50 ms   | 20.00 ms     |
| Throughput            | 0.96 req/sec | 39.46 req/sec|
| Error Rate            | 0.00%        | 0.00%        |

---

## Conclusion

By eliminating the N+1 query pattern and leveraging Prisma's relation selection and aggregation capabilities, the endpoint achieved a dramatic reduction in database round-trips and response latency.

The optimized implementation is significantly more scalable and demonstrates the importance of measuring query patterns before attempting performance optimizations.