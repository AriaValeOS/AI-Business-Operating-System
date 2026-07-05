# Architecture Decisions

## Decision 001 — Brain decides

The Brain is responsible for choosing what task should run.

## Decision 002 — Agents execute

Agents perform the actual work.

## Decision 003 — AISession coordinates

AISession connects Brain, AgentManager, ContentStore and UI.

## Decision 004 — UI stays clean

UI components display state and trigger actions, but do not contain business logic.

## Decision 005 — Agents use a shared interface

Every agent should follow the same Agent interface.

## Decision 006 — Content generation is separated

Story, caption and prompt generation live in separate generator services.