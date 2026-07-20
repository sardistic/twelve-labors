# Agent Handoff

## Active objective

Add a user-selectable home body fitness setting and a complete home workout regimen without removing the existing gym program.

## Completed work

- Added a persisted `Training program` setting with `Gym machines` and `Home bodyweight` choices.
- Added a five-day, no-equipment home program with four scalable movements per day, warm-ups, finishers, coaching cues, and primary/backup/fallback variations.
- Switched Today, Plan, History, adherence, exercise history, and the app subtitle to the selected program.
- Namespaced home-session logs while preserving legacy gym log IDs and normalizing older logs/settings to the gym defaults.
- Updated Discord-created daily logs to follow the saved program setting and annotate legacy daily logs when reused.
- Made set logging work for bodyweight and timed movements with `BW` load defaults and reps/seconds input language.
- Generalized progression and movement copy so it works for machine and bodyweight programs.
- Fixed the PWA service worker so navigations check the network before the cached shell, bumped the cache to `twelve-labors-v2`, and disabled HTTP-cache reuse during service-worker update checks.

## Current behavior

Existing users remain on the gym program. Choosing Home bodyweight in Settings immediately loads the home plan. Gym and home sessions from the same date remain separate, and History/adherence show the currently selected program. Online navigations now fetch the current app shell, with the cached index retained only as an offline fallback.

## Validation performed

- `npm run lint` — passed.
- `npm run build` — passed; Vite produced the production bundle.
- `node --check server/index.js` — passed.
- `git diff --check` — passed.
- Production Docker build — passed at commit `af735ecb63e6cd1560baf42a8e4c3f3927dc4fdd`.
- Production container `gym-app-1` — running; startup log confirms the server is listening on port 3000.
- `https://gym.sardistic.com/` — HTTP 200; the served JavaScript bundle contains `Home bodyweight`.
- Production `sw.js` — serves `twelve-labors-v2` with network-first navigation handling.
- Production bundle `index-g4-1msOU.js` — contains both `Home bodyweight` and the service-worker `updateViaCache` registration option.

## Repository state

The home-program implementation is committed in `af735ec`; the cache-refresh fix is committed in `87d3bdc`. Both are pushed to `main`. Two pre-existing untracked PNG files remain untouched and are unrelated to this work.

## Unresolved risks

- No automated browser/E2E suite exists, so interaction and responsive behavior were validated through types/build rather than a browser test.
- The home plan intentionally avoids equipment; true loaded pulling work would require a resistance band, suspension trainer, or weights and a separate equipment-aware variant.
- A browser already displaying the old worker-controlled shell may need one reload after the new worker activates.

## Next concrete action

Reload production once, open Settings, select Home bodyweight, and spot-check a `BW` set log. Add an E2E smoke test if program switching becomes a critical release path.

## Deployment/status impact

Deployed the home-program commit `af735ec` and cache-refresh commit `87d3bdc` to the self-hosted gym Docker Compose service on 2026-07-19. The production container was rebuilt and recreated successfully, and `gym.sardistic.com` is serving the new bundle and `twelve-labors-v2` service worker.
