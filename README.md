# Modo DS

Design system monorepo — Modo Design Systems Studio

## Packages

| Package | Descrição |
|---|---|
| `@modo/tokens` | Design tokens (JSON → CSS / SCSS / JS / TS) |
| `@modo/core` | Primitivos de UI (Button, Input, Badge, Icon...) |
| `@modo/patterns` | Composições reutilizáveis (Form, Modal, DataTable...) |

## Apps

| App | Descrição |
|---|---|
| `@modo/docs` | Storybook — documentação interativa e visual regression |

## Setup

```bash
# Requer Node 20+ e pnpm 9+
corepack enable
pnpm install
pnpm build:tokens
pnpm dev          # Abre Storybook em localhost:6006
```

## Pipeline

```
prompt → geração (Claude API) → lint tokens → a11y check → code review → tests → build → publish
```

Cada gate safeguard bloqueia o avanço em caso de falha, com retry automático (max 3x) e circuit breaker.

## Colaboradores

- Configurar secrets no GitHub: `CHROMATIC_PROJECT_TOKEN`, `NPM_TOKEN`
- Convidar colaboradores: Settings → Collaborators

---

*Modo Design Systems Studio — documento confidencial*
