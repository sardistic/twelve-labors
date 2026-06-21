# Twelve Labors

A local-first workout planner and progression tracker built for a Monday-Friday 6 PM gym routine under 60 minutes.

## Stack

- Vite
- React
- TypeScript
- Plain CSS
- localStorage persistence

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
- Setup, execution, form checks, and muscle targets
- Per-set weight and reps logging
- Difficulty tracking
- Previous session lookup by exercise
- Double-progression recommendations
- Session notes and cardio log
- 60-minute workout timer
- JSON export/import for local logs

## File map

```text
src/App.tsx
src/main.tsx
src/styles.css
src/types.ts
src/data/workoutPlan.ts
src/components/DayTabs.tsx
src/components/ExerciseCard.tsx
src/components/ProgressionPanel.tsx
src/components/SessionNotes.tsx
src/components/WorkoutBrief.tsx
src/components/WorkoutHeader.tsx
src/components/WorkoutTimer.tsx
src/lib/dates.ts
src/lib/progression.ts
src/storage/logStore.ts
```

## Next build targets

- Replace localStorage with IndexedDB or SQLite/Turso/Supabase after schema stabilizes
- Add exercise image slots or icon cards for machine recognition
- Add calendar scheduling for 6 PM weekdays
- Add per-exercise history charts
- Add plate/pin increment recommendations per equipment type
- Add onboarding for weight, height, age, goal, injury flags, and gym type
- Add offline installability with a PWA manifest and service worker
- Add weekly adherence score and missed-day rollover logic
