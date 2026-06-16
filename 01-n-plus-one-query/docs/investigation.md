# Investigation

## Scenario

Contract Listing API experiencing high response times while fetching tenant-specific contracts.

Endpoint:

```http
GET /contracts?tenantId=1
```

## Dataset

| Entity    | Records |
| --------- | ------: |
| Tenants   |      10 |
| Users     |     200 |
| Contracts |  10,000 |
| Approvals |  30,000 |
| Comments  |  50,000 |

## Initial Observation

The endpoint was returning data successfully but response times increased significantly as the number of contracts grew.

Observed Symptoms:

* Slow API response
* Large number of database queries
* Increased database activity
* Response time worsened as contract count increased

## Measurements

Response Time:

```text
contracts-api: 4.581s | 4581 ms
```

Query Count:

```text
Total Queries: 3001
```

## Investigation Approach

1. Enable Prisma query logging.
2. Measure API execution time.
3. Count total queries executed.
4. Analyze query patterns.
5. Identify repeated database access patterns.

## Evidence

Observed query pattern:

```text
SELECT contracts

SELECT user
SELECT approval count
SELECT comment count

SELECT user
SELECT approval count
SELECT comment count

...
```

The same query pattern was repeatedly executed for every contract returned by the API.

## Findings

The endpoint performs additional database queries inside a loop for each contract.

This resulted in thousands of database round-trips for a single request.
