# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Run the bot (development)
npm start                  # runs ts-node src/app.ts

# Build TypeScript
npm run build              # tsc -p tsconfig.json

# Run compiled build
npm run serve              # node build/app.js
```

No test suite is configured.

## Environment Setup

Create a `.env` file with:
```
BOT_TOKEN=<telegram-bot-api-token>
THINGIVERSE_TOKEN=<thingiverse-api-token>
```

MongoDB must be running locally at `mongodb://localhost:27017/thingiversemakerbot`.

## Architecture

This is a Telegram bot (using Telegraf v3) that wraps the Thingiverse API, providing access to likes, collections, designs, makes, and search from within Telegram.

### Request flow

```
Telegram User → Telegraf → src/commands/<command>.ts → src/datasource/api/thingiverse.ts → Thingiverse REST API
                                  ↓
                         src/datasource/db/DatabaseDataSource.ts (MongoDB)
                                  ↓
                         src/analytics/analytics.ts (event logging)
```

### Key structural patterns

**Commands vs. Actions:** Each user-facing command (`/likes`, `/search`, etc.) lives in its own file under `src/commands/`. Inline keyboard button callbacks (pagination "Load more") are registered as `bot.action()` handlers inside the same command file. Regex-matched commands like `/files_<id>` and `/zip_<id>` have their own files (`files.ts`, `zip.ts`).

**Pagination:** Results are sliced into pages of 3 (`ITEMS_PER_PAGE` in `src/commands/const.ts`). The current page offset is passed as a callback data parameter in the inline keyboard button so no server-side session state is needed.

**Username resolution:** Many commands accept an optional username argument. `getUsername()` in `src/commands/utils.ts` resolves priority: inline argument → MongoDB stored default → prompts user to set one.

**Message formatting:** `src/commands/messages/index.ts` centralizes how Things are formatted into Telegram messages (photo + caption with metadata).

### Data layer

- `src/datasource/api/thingiverse.ts` — All Thingiverse API calls via Axios with bearer token auth.
- `src/datasource/db/DatabaseDataSource.ts` — MongoDB: stores user records (Telegram ID → Thingiverse username) and event logs.

### Models

TypeScript interfaces in `src/models/` describe Thingiverse API response shapes (`Thing`, `Collection`, `File`, `Make`, `Creator`, `Hits`, `Category`, `Tag`, `Zip`) and the internal `User` model.

## Deployment

The `Procfile` targets Heroku using PM2:
```
worker: pm2 install typescript && pm2-runtime start src/app.ts
```
