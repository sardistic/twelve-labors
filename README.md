# Twelve Labors

A web-first workout planner and progression tracker built for a Monday-Friday 6 PM gym routine under 60 minutes. The app is tuned for Planet Fitness-style machine work, fast logging, Discord-backed cloud save, and a visual style that does not look like the usual AI dashboard.

## Stack

- Vite
- React
- TypeScript
- Plain CSS
- IndexedDB persistence with Discord cloud sync
- Node HTTP server for Railway deploys, Discord OAuth, sync, and slash commands
- PWA manifest and service worker

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

- Selectable Monday-Friday gym-machine and no-equipment home-bodyweight programs
- 6 PM weekday schedule panel
- Option trees for primary, backup, and fallback movements
- Machine descriptions
- Exercise recognition cues through `machineLooksLike`, setup notes, execution notes, form checks, and muscle targets
- Equipment icon cards and increment recommendations inferred from each selected movement
- Per-set weight and reps logging with first-set autofill for the remaining sets
- Previous-set prefill for future sessions of the same exercise
- Difficulty tracking
- Previous session lookup by exercise
- Double-progression recommendations
- Body profile and workout aim settings that alter training guidance
- Training program setting that switches Today, Plan, History, and weekly adherence between gym and home-bodyweight regimens
- Onboarding-style settings for weight, height, age, gym type, and injury flags
- Session tag logging and cardio log
- 60-minute workout timer with active phase highlighting
- Dark mode
- Discord OAuth cloud save
- Discord bot commands for `/today`, `/next`, and `/log`
- Per-exercise history drawer with a top-weight trend chart and session history view
- Weekly adherence score and missed-session rollover cue
- Offline installability through a web manifest and service worker

## Build Target Status

| Target | Status | Notes |
| --- | --- | --- |
| Replace localStorage with IndexedDB or SQLite/Turso/Supabase after schema stabilizes | Implemented foundation | Logs, settings, and Discord session now hydrate from IndexedDB with one-time legacy localStorage migration. Server sync still writes JSON records on Railway. |
| Add exercise image slots or icon cards for machine recognition | Partial | Equipment icon cards exist and movement recognition still uses text cues. Actual exercise image/media slots are still next. |
| Add calendar scheduling for 6 PM weekdays | Partial | A 6 PM weekday schedule panel exists. Calendar export, push reminders, and editable schedule rules are still next. |
| Add per-exercise history charts | Implemented first pass | The exercise history drawer now shows a top-weight trend chart. Richer volume/reps charts can build on this. |
| Add plate/pin increment recommendations per equipment type | Implemented first pass | Movement equipment is inferred as pin stack, plate loaded, cable, dumbbell, bodyweight, or other, with matching progression guidance. Explicit equipment metadata is still next. |
| Add onboarding for weight, height, age, goal, injury flags, and gym type | Implemented first pass | Settings now capture those fields plus body profile and workout aim. A dedicated first-run onboarding flow is still next. |
| Add offline installability with a PWA manifest and service worker | Implemented first pass | Web manifest and service worker are registered. Offline behavior should be expanded with better cache/version handling later. |
| Add weekly adherence score and missed-day rollover logic | Implemented first pass | The schedule panel calculates weekly adherence and exposes the first missed session as a rollover cue. Automatic rescheduling is still next. |

## Next Build Order

1. Add explicit equipment metadata to the workout plan so icon cards, machine media, and increment rules stop relying on inference.
2. Add real exercise image slots or compact machine cards for the movements that need visual recognition.
3. Turn the settings fields into a first-run onboarding flow.
4. Add richer per-exercise charts for volume, top set, reps, and difficulty.
5. Expand scheduling into editable reminders, Discord notification timing, and optional calendar export.
6. Harden the service worker cache/version strategy before treating offline mode as production-grade.

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
src/components/SchedulePanel.tsx
src/components/SessionNotes.tsx
src/components/SettingsView.tsx
src/components/SyncPanel.tsx
src/components/WorkoutBrief.tsx
src/components/WorkoutHeader.tsx
src/components/WorkoutTimer.tsx
src/lib/discordAuth.ts
src/lib/dates.ts
src/lib/adherence.ts
src/lib/equipment.ts
src/lib/progression.ts
src/lib/trainingGuidance.ts
src/storage/appStorage.ts
src/storage/dbStore.ts
src/storage/logStore.ts
src/storage/settingsStore.ts
src/storage/syncStore.ts
server/index.js
docs/DISCORD_RAILWAY.md
```
