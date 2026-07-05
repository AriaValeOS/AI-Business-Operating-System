# Aria OS Project Structure

## Root

```
aria-os
```

Contains the complete application.

---

## docs/

Project documentation.

Contains architecture, roadmap, decisions and technical documentation.

---

## src/

Application source code.

---

## app/

Next.js routing.

Only pages, layouts and routing belong here.

---

## components/

Reusable UI components.

Examples:

- Button
- Card
- Sidebar
- Dashboard

---

## hooks/

Reusable React hooks.

---

## lib/

Shared helper functions.

---

## services/

External integrations.

Examples:

- OpenAI
- Supabase
- Instagram
- Google Drive

---

## styles/

Global styling.

---

## types/

Shared TypeScript types.

---

## Rule

Every file must have a clear purpose.

If a folder starts doing multiple unrelated jobs,
split it into smaller modules.
```