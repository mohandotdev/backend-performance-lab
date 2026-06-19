# Benchmark Results - Before Optimization

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
| Average Response Time | 21.98 ms      |
| Minimum Response Time | 14 ms         |
| Maximum Response Time | 90 ms         |
| Median Response Time  | 18 ms         |
| 90th Percentile       | 38.00 ms      |
| 95th Percentile       | 43.90 ms      |
| 99th Percentile       | 65.91 ms      |
| Throughput            | 40.92 req/sec |
| Error Rate            | 0.00%         |
| Query Count           | 2             |

---

## Query Plan Analysis

Execution Plan:

```text
Seq Scan on Contract

Rows Removed By Filter: 9000

Sort Key: createdAt DESC
```

Database Execution Time:

```text
0.698 ms
```

---

## Observations

* Application query count was already optimized.
* PostgreSQL performed a Sequential Scan.
* 9,000 rows were scanned and discarded.
* Additional sorting was required after filtering.
* Database execution remained fast due to the relatively small dataset.
* Potential scalability concerns exist as data volume increases.

---

## Conclusion

Although the endpoint responded quickly under the current dataset size, the database execution plan revealed an inefficient access pattern. PostgreSQL performed a full table scan and additional sorting work because no supporting index existed for the query.
