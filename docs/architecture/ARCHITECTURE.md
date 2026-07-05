# Architecture

Aria OS is an AI Business Operating System built with modular services, agents and UI components.

## Core Flow

User
→ Command Center
→ AI Session
→ Brain
→ Agent Manager
→ Agent
→ Content Store
→ UI

## Core Services

- Brain decides what should happen.
- AISession coordinates the workflow.
- AgentManager executes the selected agent.
- ContentStore stores generated content.
- AgentRegistry will manage available agents.

## Current Agents

- InstagramAgent
- AnalyticsAgent

## Current Generators

- StoryGenerator
- CaptionGenerator
- PromptGenerator

## Principles

- UI does not contain business logic.
- Brain decides.
- Agents execute.
- Generators create content.
- Services are modular.