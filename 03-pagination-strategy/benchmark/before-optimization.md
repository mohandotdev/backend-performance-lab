# Benchmark Results - Before Pagination

## Environment

- Runtime: Node.js
- Framework: Express.js
- ORM: Prisma
- Database: PostgreSQL

Dataset:

- Tenants: 10
- Contracts per Tenant: 100,000
- Total Contracts: 1,000,000

---

## Endpoint

GET /contracts?tenantId=1

---

## Postman Results

| Metric | Value |
|----------|----------|
| Response Time | 1.16 sec |
| Payload Size | 16.67 MB |

---

## JMeter Results

| Metric | Value |
|----------|----------|
| Average Response Time | 5260.02 ms |
| Minimum Response Time | 785 ms |
| Maximum Response Time | 13392 ms |
| Median Response Time | 5322 ms |
| 90th Percentile | 6468 ms |
| 95th Percentile | 6894 ms |
| 99th Percentile | 11885 ms |
| Throughput | 0.72 req/sec |
| Error Rate | 0.00% |

---

## Observations

- Query count remained low.
- Database indexes were functioning correctly.
- API latency increased significantly under concurrent load.
- Response payload reached 16.67 MB.
- Network throughput exceeded 12 MB/sec.
- Large response serialization and transfer became the dominant bottleneck.

---

## Conclusion

The bottleneck was no longer located in the database layer.

The endpoint returned the entire contract dataset for a tenant, producing a large JSON payload and causing excessive memory allocation, serialization overhead, and network transfer costs.