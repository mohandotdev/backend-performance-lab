# Root Cause Analysis

## Root Cause

The Contract Approval endpoint held an interactive database transaction open while executing expensive business logic and multiple external service integrations.

Although the database operations completed quickly, the transaction continued running for approximately 5.5 seconds before committing.

During this period the database connection remained reserved, preventing other incoming requests from acquiring a connection.

Under concurrent load this resulted in connection pool exhaustion and transaction start failures.

---

## Technical Flow

```text
Acquire Connection

↓

Read Contract

↓

Validate Rules

↓

Insert Approval

↓

Update Contract

↓

Insert Audit

↓

Generate PDF

↓

Extract Metadata

↓

Send Email

↓

Notify Dashboard

↓

Notify ERP

↓

Commit Transaction

↓

Release Connection
```

---

## Why This Is Problematic

Database transactions should remain open only while performing operations that require transactional consistency.

Operations such as

- Rule Engine execution
- PDF generation
- Metadata extraction
- Email delivery
- Dashboard updates
- ERP integration

do not require an active database transaction.

Keeping them inside the transaction unnecessarily increases transaction lifetime and reduces connection availability.

---

## Impact

- Long transaction duration
- Low throughput
- High response latency
- Connection pool exhaustion
- Failed transaction initialization