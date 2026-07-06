# ADR-0001

## Title

Task First Architecture

---

## Status

Accepted

---

## Context

Originally the Brain selected concrete agents directly.

This tightly coupled business logic with implementation details.

---

## Decision

The Brain will never know concrete agents.

The Brain creates Tasks.

The Task Registry resolves Tasks into Agents.

---

## Consequences

Advantages

- Easy to add new agents.
- Brain remains simple.
- Better scalability.
- Better testing.
- Supports multiple AI employees.

Trade-offs

- One extra abstraction layer.
- Slightly more code.

---

## Date

2026-07-06