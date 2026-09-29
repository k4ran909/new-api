# AGENTS.md — Project Overview for new-api

## Overview

This is an AI API gateway/proxy built with Go. It aggregates 40+ upstream AI providers (OpenAI, Claude, Gemini, Azure, AWS Bedrock, etc.) behind a unified API, with user management, billing, rate limiting, and an admin dashboard.

## Tech Stack

- **Backend**: Go 1.25.1 (see each module’s `go.mod`), Gin web framework, GORM v2 ORM
- **Frontend**: React 19, TypeScript, Rsbuild 2, TanStack Router/Query/Table, Zustand, Base UI, Tailwind CSS 4
- **Databases**: SQLite, MySQL, PostgreSQL for the primary database; a separately configured log database also supports ClickHouse
- **Cache**: Redis (go-redis) + in-memory cache
- **Auth**: Browser sessions, API tokens and personal access tokens, JWT, WebAuthn/Passkeys, TOTP, OAuth/OIDC; Casbin authorization in `service/authz/`
- **Extensions**: JavaScript task plugins executed by Sobek; Electron desktop wrapper
- **Frontend package manager**: Bun

## Architecture

- The Go gateway handles management APIs, upstream relay, billing, and background tasks across `router/`, `middleware/`, `controller/`, `service/`, `model/`, and `relay/`.
- `relaykit/` is a Go module for protocol DTOs and conversions; transport, authentication, database access, and billing stay in the host.
- JavaScript task plugins live in `plugins/tasks/`, run through `pkg/jsplugin/`, and integrate with host task polling and settlement.
- `web/` is the React frontend; `electron/` is the desktop wrapper.

## Internationalization (i18n)

### Backend (`i18n/`)
- Library: `nicksnyder/go-i18n/v2`
- Languages: en, zh

### Frontend (`web/src/i18n/`)
- Library: `i18next` + `react-i18next` + `i18next-browser-languagedetector`
- Languages: en (base), zh (fallback), zh-TW, fr, ru, ja, vi
- Translation files: `web/src/i18n/locales/{lang}.json` — flat JSON, keys are English source strings
- Usage: `useTranslation()` hook, call `t('English key')` in components
- CLI tools: `bun run i18n:sync` (from `web/`)
