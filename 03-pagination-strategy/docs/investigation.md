# Investigation Report

## Incident Summary

The contract listing endpoint exhibited poor performance despite previous optimizations addressing N+1 queries and database indexing.

Benchmarking revealed that the endpoint returned the entire dataset for a tenant in a single response.

---

## Endpoint Under Investigation

```http
GET /contracts?tenantId=1
```

Dataset:

```text
Contracts per Tenant: 100,000
Total Contracts: 1,000,000
```

---

## Evidence Collected

### Postman Benchmark

| Metric        | Value    |
| ------------- | -------- |
| Response Time | 1.16 sec |
| Payload Size  | 16.67 MB |

### JMeter Benchmark

| Metric                | Value        |
| --------------------- | ------------ |
| Average Response Time | 5260.02 ms   |
| Throughput            | 0.72 req/sec |

---

## Findings

Database query count was already optimized.

Indexes were present and actively used.

Query execution remained efficient.

The primary bottleneck was the volume of data returned by the endpoint.

The API returned approximately 100,000 contracts in a single response, generating a payload exceeding 16 MB.

---

## Optimization Investigation

Two pagination approaches were evaluated:

### Offset Pagination

```http
GET /contracts?page=1&pageSize=50
```

Implemented using:

```ts
skip;
take;
```

### Cursor Pagination

```http
GET /contracts/cursor?cursor=<id>&limit=50
```

Implemented using:

```ts
cursor;
take;
```

---

## Final Findings

Offset pagination dramatically reduced payload size and response time.

Cursor pagination provided similar response times while maintaining stable query execution characteristics as navigation depth increased.

---

## Conclusion

The root cause was excessive payload generation caused by returning the complete dataset in a single request.

Pagination eliminated the application-layer bottleneck and significantly improved overall API responsiveness.
