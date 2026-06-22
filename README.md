# Twelve Labors

A web-first workout planner and progression tracker built for a Monday-Friday 6 PM gym routine under 60 minutes. The app is tuned for Planet Fitness-style machine work, fast logging, Discord-backed cloud save, and a visual style that does not look like the usual AI dashboard.

## Stack

- Vite
- React
- TypeScript
- Plain CSS
- localStorage persistence with Discord cloud sync
- Node HTTP server for Railway deploys, Discord OAuth, sync, and slash commands

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## What exists

- Monday-Friday workout plan
- Option trees for primary, backup, and fallback movements
- Machine descriptions
- Exercise recognition cues through `machineLooksLike`, setup notes, execution notes, form checks, and muscle targets
- Per-set weight and reps logging with first-set autofill for the remaining sets
- Previous-set prefill for future sessions of the same exercise
- Difficulty tracking
- Previous session lookup by exercise
- Double-progression recommendations
- Body profile and workout aim settings that alter training guidance
- Session tag logging and cardio log
- 60-minute workout timer with active phase highlighting
- Dark mode
- Discord OAuth cloud save
- Discord bot commands for `/today`, `/next`, and `/log`
- Per-exercise history drawer and session history view

## Build Target Status

| Target | Status | Notes |
| --- | --- | --- |
| Replace localStorage with IndexedDB or SQLite/Turso/Supabase after schema stabilizes | Not started | Current browser persistence is still localStorage. Discord cloud sync writes JSON records server-side for signed-in users. |
| Add exercise image slots or icon cards for machine recognition | Partial | The workout data has text-based machine recognition cues. It does not yet have image URLs, media slots, or icon cards. |
| Add calendar scheduling for 6 PM weekdays | Partial | The plan is structured around Monday-Friday at 6 PM, but there is no calendar view, reminder scheduler UI, or calendar export yet. |
| Add per-exercise history charts | Partial | Exercise history exists as a drawer/list. Charts are not implemented. |
| Add plate/pin increment recommendations per equipment type | Partial | There is a global default increment and double-progression guidance. Equipment-specific plate/pin logic is not implemented. |
| Add onboarding for weight, height, age, goal, injury flags, and gym type | Partial | Settings include body profile, workout aim, ramp/deload settings, default increment, and training notes. Dedicated onboarding and structured height/age/injury/gym-type fields are not implemented. |
| Add offline installability with a PWA manifest and service worker | Not started | No manifest or service worker is registered yet. |
| Add weekly adherence score and missed-day rollover logic | Partial | Friday is written as a weak-point/missed-day filler. There is no adherence score or automatic missed-day rollover yet. |

## Next Build Order

1. Stabilize the log/settings schema and migrate browser persistence to IndexedDB.
2. Add structured onboarding fields for body stats, goal, injury flags, and gym type.
3. Add equipment metadata so icon cards, machine media, and equipment-specific increments share one model.
4. Add per-exercise charts on top of the existing history data.
5. Add weekday scheduling, missed-day rollover, adherence scoring, and Discord reminders.
6. Add PWA manifest and service worker once the app shell is stable.

## File map

```text
src/App.tsx
src/main.tsx
src/styles.css
src/types.ts
src/data/workoutPlan.ts
src/components/DayTabs.tsx
src/components/ExerciseCard.tsx
src/components/ExerciseHistoryDrawer.tsx
src/components/HistoryView.tsx
src/components/PlanView.tsx
src/components/ProgressionPanel.tsx
src/components/SessionNotes.tsx
src/components/SettingsView.tsx
src/components/SyncPanel.tsx
src/components/WorkoutBrief.tsx
src/components/WorkoutHeader.tsx
src/components/WorkoutTimer.tsx
src/lib/discordAuth.ts
src/lib/dates.ts
src/lib/progression.ts
src/lib/trainingGuidance.ts
src/storage/logStore.ts
src/storage/settingsStore.ts
src/storage/syncStore.ts
server/index.js
docs/DISCORD_RAILWAY.md
```
