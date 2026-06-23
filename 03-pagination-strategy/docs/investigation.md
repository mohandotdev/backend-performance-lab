# Investigation Report

## Incident Summary

The contract listing endpoint exhibited poor response times under concurrent load despite previous optimizations addressing N+1 queries and database indexing.

Users reported slow page loads when accessing contract listings for large tenants.

---

## Endpoint Under Investigation

```http
GET /contracts?tenantId=1
```

---

## Initial Assumptions

Potential causes considered:

* N+1 query issue
* Missing database indexes
* Large dataset size
* Network overhead
* Serialization overhead

---

## Evidence Collected

### Query Count

Application query logging showed:

```text
Total Queries: 2
```

No excessive database round-trips were observed.

---

### Database Analysis

Query execution plan:

```text
Bitmap Index Scan
Bitmap Heap Scan
```

The database was successfully using the composite index created in Scenario 02.

Database execution times remained low.

---

### API Benchmark Results

#### Postman

| Metric        | Value    |
| ------------- | -------- |
| Response Time | 1.16 sec |
| Payload Size  | 16.67 MB |

#### JMeter

| Metric                | Value        |
| --------------------- | ------------ |
| Average Response Time | 5260.02 ms   |
| Throughput            | 0.72 req/sec |
| Maximum Response Time | 13392 ms     |

---

### Network Analysis

JMeter throughput reports showed significant outbound traffic.

Observed:

```text
Received: ~12 MB/sec
```

The API was transferring a large JSON response for every request.

---

### Dataset Analysis

Current dataset:

```text
Tenants: 10
Contracts Per Tenant: 100,000
Total Contracts: 1,000,000
```

The endpoint returned all contracts for a tenant in a single response.

---

## Findings

The database layer was functioning correctly.

The endpoint generated a response containing approximately:

```text
100,000 contracts
16.67 MB JSON payload
```

Large payload generation introduced:

* Increased memory usage
* JSON serialization overhead
* Network transfer delays
* Client-side parsing overhead

---

## Conclusion

The primary bottleneck was not query execution.

The endpoint returned an excessive amount of data in a single response, causing application-layer and network-layer performance degradation.
