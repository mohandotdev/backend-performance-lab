# Benchmark Results - Before Optimization

## Environment

- Runtime: Node.js
- Framework: Express.js
- ORM: Prisma ORM
- Database: PostgreSQL
- Transaction Type: Interactive Transaction
- Dataset:
  - Tenants: 10
  - Users: 200
  - Contracts: 1,000,000
  - Approvals: Existing approval records
  - Audit Logs: Enabled

---

## Test Configuration

Endpoint

```http
POST /contracts/:id/approve
```

Request Body

```json
{
    "userId": 5
}
```

Load Profile

```text
Virtual Users: 20
Ramp-Up: 5 seconds
Iterations per User: 10

Total Requests: 199
```

Transaction Timeout

```text
15 seconds (temporarily increased for experiment)
```

---

## Postman Benchmark

| Metric | Value |
|----------|---------|
| Response Time | 5.56 sec |
| Response Size | 312 B |

---

## JMeter Results

| Metric | Value |
|----------|-------------|
| Total Requests | 199 |
| Average Response Time | 4116.01 ms |
| Minimum Response Time | 2000 ms |
| Maximum Response Time | 7343 ms |
| Median Response Time | 2016 ms |
| 90th Percentile | 7240 ms |
| 95th Percentile | 7275 ms |
| 99th Percentile | 7320 ms |
| Throughput | 3.58 req/sec |
| Error Rate | 56.28 % |

---

## Transaction Timeline

Average transaction duration observed during execution:

```text
Database Read
↓

Business Rule Validation

↓

Approval Creation

↓

Contract Update

↓

Audit Log

↓

PDF Generation

↓

Metadata Extraction

↓

Email Notification

↓

Dashboard Notification

↓

ERP Notification

↓

Commit Transaction
```

Approximate transaction duration:

```text
5.5 seconds
```

---

## Observations

- More than half of the incoming requests failed under concurrent load.
- Response time exceeded five seconds for a single approval request.
- Database queries completed quickly, but transactions remained open while executing business logic and external integrations.
- Long-running transactions occupied database connections for several seconds.
- New requests were forced to wait for available connections.
- Several requests failed before a transaction could even begin.

---

## Conclusion

The application successfully completed the approval workflow functionally, but the transaction scope was significantly larger than required.

Instead of limiting the transaction to database operations, expensive business logic and external service integrations were executed while the database connection remained reserved, causing connection pool exhaustion under concurrent traffic.