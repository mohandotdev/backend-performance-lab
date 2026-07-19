# Investigation

## Objective

Investigate why the Contract Approval endpoint experiences high response times and transaction failures under concurrent load.

---

## Initial Symptoms

Observed during load testing:

- High API latency
- Large number of failed requests
- Throughput degradation
- Transaction timeout errors

JMeter Results

- Average Response Time: 4116 ms
- Error Rate: 56.28%
- Throughput: 3.58 requests/sec

---

## Application Workflow

Current implementation

```text
BEGIN TRANSACTION

↓

Fetch Contract

↓

Validate Approval Rules

↓

Create Approval

↓

Update Contract

↓

Insert Audit Log

↓

Generate PDF

↓

Extract Metadata

↓

Send Email

↓

Notify Dashboard

↓

Notify External ERP

↓

COMMIT
```

---

## Database Activity

Database operations executed during approval:

- Fetch Contract
- Insert Approval
- Update Contract
- Insert Audit Log

These operations completed within only a few milliseconds.

---

## External Operations

The transaction also executed several long-running tasks.

| Operation | Approx Duration |
|------------|----------------|
| Rule Validation | ~1 sec |
| PDF Generation | ~1.5 sec |
| Metadata Extraction | ~0.8 sec |
| Email | ~1 sec |
| Dashboard Notification | ~0.5 sec |
| ERP Notification | ~0.7 sec |

Combined execution time exceeded five seconds.

---

## Prisma Errors

During concurrent execution Prisma reported

```text
Unable to start a transaction in the given time.
```

This indicates that incoming requests were unable to acquire a database connection because existing transactions were still active.

---

## Findings

The database itself was not slow.

Instead,

- Transactions remained open while non-database work executed.
- Database connections stayed occupied unnecessarily.
- Connection pool capacity became exhausted under concurrent traffic.
- New requests timed out while waiting for a free connection.

The bottleneck originated in the application layer rather than the database engine.