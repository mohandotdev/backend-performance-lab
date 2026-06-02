# Backend Performance Lab

A collection of deliberately broken backend systems, performance bottlenecks, and production-inspired scenarios that I build, investigate, and optimize.

## Why this repository?

Over the years, I've worked on enterprise applications involving Node.js, Python, PostgreSQL, Redis, Docker, and multi-tenant architectures. While building features is part of the job, understanding why systems become slow, unstable, or difficult to scale requires a different kind of practice.

This repository is my attempt to create that practice intentionally.

Instead of only reading about performance issues, I'm recreating them in isolated environments, debugging them, measuring their impact, and documenting the solutions.

The goal is simple:

* Learn by breaking things.
* Understand systems beyond the happy path.
* Build stronger engineering intuition.
* Develop production-oriented troubleshooting skills.

## How this repository works

Each scenario starts with a working but intentionally flawed implementation.

The workflow typically looks like this:

1. Create a realistic backend problem.
2. Generate enough data to expose the issue.
3. Benchmark and observe the symptoms.
4. Investigate the root cause.
5. Apply one or more optimizations.
6. Compare before and after results.
7. Document findings and lessons learned.

Every scenario includes:

* Problem statement
* System setup
* Investigation process
* Root cause analysis
* Solution implementation
* Benchmark results
* Key takeaways

## Repository Structure

```text
01-n-plus-one-query/
02-missing-index/
03-no-pagination/
04-large-payload-response/
...
```

Each folder represents a standalone performance or scalability challenge.

## Current Focus

This is an ongoing learning project.

The intention is not to build the perfect system from day one, but to continuously explore real-world backend problems, document the journey, and improve my understanding of how production systems behave under load.

If you're exploring backend performance, database optimization, caching, scalability, or system design, you might find some of these experiments useful as well.
