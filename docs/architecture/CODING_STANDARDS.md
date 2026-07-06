# Coding Standards

## General

- Use TypeScript everywhere.
- No business logic inside UI.
- Every service has a single responsibility.
- Prefer composition over duplication.

---

## Agents

Every Agent must:

- implement the Agent interface;
- return AgentResult;
- never access UI directly;
- never call OpenAI directly.

---

## Brain

Brain never knows concrete agents.

Brain decides tasks only.

---

## UI

UI displays data.

UI never decides business logic.

---

## Services

Every external API must go through a Service layer.

Examples:

Brain
↓

LLMService
↓

OpenAIProvider

NOT

Brain
↓

OpenAI API

---

## Documentation

Every architecture change must be documented.

---

## Git

Every Sprint ends with:

git status

git add .

git commit

git push