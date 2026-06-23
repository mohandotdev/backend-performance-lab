# Benchmark Results - After Offset Pagination

## Environment

* Runtime: Node.js
* Framework: Express.js
* ORM: Prisma
* Database: PostgreSQL

Dataset:

* Tenants: 10
* Contracts per Tenant: 100,000
* Total Contracts: 1,000,000

---

## Endpoint

```http
GET /contracts?tenantId=1&page=1&pageSize=50
```

---

## Pagination Strategy

The endpoint was updated to use offset-based pagination.

```ts
skip = (page - 1) * pageSize
take = pageSize
```

Only 50 records are returned per request.

---

## Postman Results

| Metric        | Value   |
| ------------- | ------- |
| Response Time | 5 ms    |
| Payload Size  | 8.92 KB |

---

## JMeter Results

| Metric                | Value         |
| --------------------- | ------------- |
| Total Requests        | 200           |
| Average Response Time | 3.56 ms       |
| Minimum Response Time | 1 ms          |
| Maximum Response Time | 169 ms        |
| Median Response Time  | 2 ms          |
| 90th Percentile       | 5 ms          |
| 95th Percentile       | 5 ms          |
| 99th Percentile       | 6.99 ms       |
| Throughput            | 44.37 req/sec |
| Error Rate            | 0.00%         |

---

## Network Metrics

| Metric   | Value         |
| -------- | ------------- |
| Received | 395.95 KB/sec |
| Sent     | 6.72 KB/sec   |

---

## Observations

* Response payload decreased significantly.
* Average response time dropped from several seconds to a few milliseconds.
* Throughput increased substantially.
* No functional failures were observed during load testing.
* Network utilization decreased dramatically.
* Database execution remained efficient due to existing indexing improvements.

---

## Conclusion

Offset pagination successfully eliminated the large payload bottleneck by restricting the number of records returned per request.

The optimization reduced memory consumption, serialization overhead, and network transfer costs, resulting in significantly improved API responsiveness under concurrent load.
