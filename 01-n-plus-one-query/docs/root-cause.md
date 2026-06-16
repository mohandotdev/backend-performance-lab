# Root Cause Analysis

## Problem

The contract listing endpoint exhibited poor performance when retrieving a large number of contracts.

## Investigation Summary

The service first retrieves all contracts for a tenant.

For every contract returned:

* Fetch creator information
* Count approvals
* Count comments

These operations were executed individually inside a loop.

## Query Breakdown

For 1000 contracts:

```text
1 query -> contracts

1000 queries -> users

1000 queries -> approval counts

1000 queries -> comment counts
```

Total:

```text
3001 queries
```

## Root Cause

An N+1 query pattern was introduced by performing database operations inside an iteration.

Instead of fetching related information in batches, the application generated additional queries for every record returned.

## Impact

* Increased database load
* Excessive network round-trips
* High API response times
* Poor scalability as data volume grows

## Why It Happens

The application retrieves parent records first and then performs additional lookups for each individual record.

As the dataset grows:

```text
N contracts
↓
3 × N additional queries
```

This causes performance degradation proportional to dataset size.

## Conclusion

The primary bottleneck is the N+1 query pattern caused by repeated database access within a loop.
