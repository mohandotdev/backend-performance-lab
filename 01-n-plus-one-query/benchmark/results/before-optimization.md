# Benchmark Results - Before Optimization

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
| Average Response Time | 10222.58 ms |
| Minimum Response Time | 6546 ms |
| Maximum Response Time | 16199 ms |
| Median Response Time | 9684.50 ms |
| 90th Percentile | 12644.70 ms |
| 95th Percentile | 12742.75 ms |
| 99th Percentile | 16172.65 ms |
| Throughput | 0.96 req/sec |
| Error Rate | 0.00% |
| Query Count | 3001 (approx.) |

---

## Observations

- Average response time exceeded 10 seconds.
- Maximum response time reached over 16 seconds.
- Throughput remained below 1 request per second.
- No functional failures occurred, but overall latency was unacceptable.
- Query logging showed repeated SQL execution patterns for every contract returned by the endpoint.
- Investigation confirmed an N+1 query pattern caused by database calls executed inside an iteration loop.

---

## Conclusion

Although the endpoint was functionally correct, it did not scale with increasing data volume. The primary bottleneck was excessive database round-trips introduced by the N+1 query pattern, making the implementation unsuitable for production workloads.