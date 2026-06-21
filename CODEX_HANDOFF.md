# Codex Handoff

You are working in a Vite React TypeScript app named Project Fitness. The app is a local-first workout planner and progression tracker for a Monday-Friday after-work gym routine. Preserve the existing data-driven architecture.

The current app stores workout logs in localStorage, loads a typed workout plan from `src/data/workoutPlan.ts`, renders each exercise slot with a primary/backup/fallback option tree, and calculates progression hints through `src/lib/progression.ts`.

Immediate priorities:

1. Keep the app runnable with `npm install` and `npm run dev`.
2. Preserve strict TypeScript.
3. Do not replace the workout data model unless the migration is implemented fully.
4. Add useful product features directly, not placeholder screens.
5. Keep code readable and component-level responsibilities clean.

Recommended next implementation:

- Add route-like views without adding a router yet: `Today`, `Plan`, `History`, `Settings`.
- Add an exercise history drawer that shows all previous logs for the selected exercise.
- Add simple charts using SVG or a lightweight chart dependency only if needed.
- Add goal selection: recomp, fat loss, muscle gain, strength.
- Add training phase settings: ramp weeks, normal weeks, deload week.
- Add per-exercise increment sizes and next-weight recommendation.
- Add machine/media fields to the data model: `imageUrl`, `diagram`, `gymZone`, `equipmentType`.
- Add export/import schema validation before accepting JSON.
- Add PWA support once the UI stabilizes.

Current persistence shape:

`DayLog` contains date, dayId, bodyWeight, energy, exercises, cardio, and notes.

`ExerciseLog` contains exerciseSlotId, selectedOptionName, sets, difficulty, and notes.

Progression behavior:

- If every set hits the top of the rep range and difficulty is not too hard, recommend increasing weight.
- If the log is incomplete, ask for all working sets to be filled in.
- If difficulty is too hard, recommend reducing or repeating.
- Otherwise recommend adding reps before weight.

Make changes as complete files. Avoid partial snippets.
