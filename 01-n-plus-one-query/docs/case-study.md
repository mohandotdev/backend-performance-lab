# Case Study - N+1 Query Problem

## Overview

This scenario recreates one of the most common backend performance bottlenecks encountered in production systems: the **N+1 query problem**.

The objective was to intentionally implement an inefficient contract listing endpoint, benchmark its behavior under load, identify the root cause through investigation, and validate the impact of an optimized implementation.

---

## Business Context

The endpoint retrieves contracts belonging to a specific tenant.

Each response includes:

* Contract information
* Contract creator details
* Approval count
* Comment count

Example Response:

```json
{
  "id": 1,
  "name": "Vendor Agreement",
  "createdBy": "John Doe",
  "approvalCount": 5,
  "commentCount": 10
}
```

The dataset used for testing contained:

* 10 Tenants
* 200 Users
* 10,000 Contracts
* 30,000 Approvals
* 50,000 Comments

---

## Initial Implementation

The endpoint first retrieved all contracts for a tenant and then executed additional database queries for every individual contract to fetch:

* Creator information
* Approval count
* Comment count

Conceptually:

```text
Fetch Contracts

↓

For Every Contract

    Fetch User

    Fetch Approval Count

    Fetch Comment Count
```

Although functionally correct, this implementation generated excessive database round-trips.

---

## Symptoms Observed

During load testing:

* High API response times
* Heavy database activity
* Thousands of SQL queries for a single request
* Throughput degradation as dataset size increased

Despite having zero functional failures, the endpoint was not scalable.

---

## Investigation

To identify the bottleneck:

* Enabled Prisma query logging
* Measured execution time using `console.time`
* Counted executed database queries
* Performed load testing using Apache JMeter

Query logs revealed the same SQL patterns being executed repeatedly for every contract returned by the endpoint.

For every contract:

```text
Fetch User

Fetch Approval Count

Fetch Comment Count
```

This confirmed the presence of an N+1 query pattern.

---

## Root Cause

The service executed database operations inside an iteration loop.

For 1000 contracts:

```text
1 Query

↓

Fetch Contracts

+

1000 User Queries

+

1000 Approval Count Queries

+

1000 Comment Count Queries

↓

3001 Total Queries
```

The excessive number of database round-trips became the primary source of latency.

---

## Optimization Strategy

The implementation was refactored to leverage Prisma's relation loading and aggregation capabilities.

Changes included:

* Fetching related creator information through relation selection
* Using `_count` for approval and comment aggregation
* Eliminating per-record database calls
* Returning only required fields through selective projection

The optimized implementation performs the same business logic while significantly reducing database interaction.

---

## Benchmark Comparison

| Metric                | Before Optimization | After Optimization |
| --------------------- | ------------------: | -----------------: |
| Query Count           |               ~3001 |                  2 |
| Average Response Time |         10222.58 ms |           24.35 ms |
| Minimum Response Time |             6546 ms |              16 ms |
| Maximum Response Time |            16199 ms |             181 ms |
| Median Response Time  |          9684.50 ms |           20.00 ms |
| 90th Percentile       |         12644.70 ms |           38.00 ms |
| 95th Percentile       |         12742.75 ms |           41.00 ms |
| 99th Percentile       |         16172.65 ms |           49.96 ms |
| Throughput            |        0.96 req/sec |      39.46 req/sec |
| Error Rate            |               0.00% |              0.00% |

---

## Outcome

The optimized implementation reduced:

* Query count from approximately **3001 to 2**
* Average response time from **10.2 seconds to 24 milliseconds**
* Maximum response time from **16.2 seconds to 181 milliseconds**

At the same time, throughput increased from **0.96 requests/sec** to **39.46 requests/sec** while maintaining zero request failures.

---

## Key Takeaways

* Avoid performing database queries inside loops.
* Measure system behavior before attempting optimization.
* Query count is often a better indicator than response time alone.
* Reducing database round-trips can produce dramatic performance improvements.
* ORM features such as relation loading and aggregation should be leveraged instead of iterative lookups.

---

## Interview Summary

> I intentionally recreated an N+1 query problem in a backend performance lab using Express, Prisma, and PostgreSQL. The initial implementation executed roughly 3001 SQL queries for a request returning 1000 contracts, resulting in an average response time of about 10.2 seconds. After profiling the query pattern, I refactored the endpoint to use Prisma relation selection and aggregate counts through `_count`, reducing the query count to just 2 and lowering the average response time to around 24 milliseconds while significantly improving throughput.
