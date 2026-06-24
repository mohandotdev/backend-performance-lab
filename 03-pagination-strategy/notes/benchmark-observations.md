# Benchmark Observations

## Dataset

```text
Tenants: 10
Users: 200
Contracts Per Tenant: 100,000
Total Contracts: 1,000,000
```

---

# Phase 1 - No Pagination

## Postman

| Metric | Value |
|----------|----------|
| Response Time | 1.16 sec |
| Payload Size | 16.67 MB |

---

## JMeter

| Metric | Value |
|----------|----------|
| Average Response Time | 5260.02 ms |
| Throughput | 0.72 req/sec |

---

## Observation

The endpoint returned:

```text
100,000 contracts
```

in a single response.

Database performance was healthy.

The bottleneck originated from:

- Payload generation
- JSON serialization
- Network transfer

---

# Phase 2 - Offset Pagination

Endpoint:

```http
GET /contracts?page=1&pageSize=50
```

---

## Postman

| Metric | Value |
|----------|----------|
| Response Time | 36 ms |
| Payload Size | 8.92 KB |

---

## JMeter

| Metric | Value |
|----------|----------|
| Average Response Time | 3.56 ms |
| Throughput | 44.37 req/sec |

---

## Observation

Significant performance improvement observed after limiting the response size.

Payload reduced from:

```text
16.67 MB
↓
8.92 KB
```

---

# Phase 3 - Cursor Pagination

Endpoint:

```http
GET /contracts/cursor?cursor=<id>&limit=50
```

---

## JMeter

| Metric | Value |
|----------|----------|
| Average Response Time | 2.45 ms |
| Throughput | 44.06 req/sec |

---

## Observation

Cursor pagination maintained stable execution characteristics while avoiding OFFSET-based scans.

---

# Overall Findings

| Metric | No Pagination | Offset | Cursor |
|----------|----------:|----------:|----------:|
| Payload Size | 16.67 MB | 8.92 KB | 8.7 KB |
| Response Time | 1.16 sec | 36 ms | 40 ms |
| Avg JMeter Response | 5260 ms | 3.56 ms | 2.45 ms |
| Throughput | 0.72 req/sec | 44.37 req/sec | 44.06 req/sec |

---

## Key Learning

Pagination produced the largest performance gain in this lab.

The biggest improvement came from reducing the amount of data returned by the API rather than optimizing database execution.