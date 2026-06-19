# Benchmark Results - After Optimization

## Environment

* Runtime: Node.js
* Framework: Express.js
* ORM: Prisma
* Database: PostgreSQL

Dataset:

* Tenants: 10
* Users: 200
* Contracts: 10,000
* Approvals: 30,000
* Comments: 50,000

---

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

## API Benchmark Results

| Metric                | Value         |
| --------------------- | ------------- |
| Total Requests        | 200           |
| Average Response Time | 24.50 ms      |
| Minimum Response Time | 14 ms         |
| Maximum Response Time | 64 ms         |
| Median Response Time  | 20 ms         |
| 90th Percentile       | 41.90 ms      |
| 95th Percentile       | 44.95 ms      |
| 99th Percentile       | 60.91 ms      |
| Throughput            | 38.11 req/sec |
| Error Rate            | 0.00%         |
| Query Count           | 2             |

---

## Query Plan Analysis

Execution Plan:

```text
Bitmap Index Scan

Using:
Contract_tenantId_createdAt_idx
```

Database Execution Time:

```text
0.292 ms
```

---

## Observations

* PostgreSQL switched from Sequential Scan to Bitmap Index Scan.
* Query execution time improved from 0.698 ms to 0.292 ms.
* Rows no longer required full table scanning.
* Query planner successfully leveraged the composite index.
* API response time remained largely unchanged because database execution already represented a small portion of overall request latency.

---

## Conclusion

The composite index successfully optimized database access. While API latency improvements were not significant due to the relatively small dataset size, execution plan analysis confirmed that PostgreSQL adopted a more efficient access strategy that will scale better as data volume grows.
