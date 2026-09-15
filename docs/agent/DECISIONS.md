# Engineering Decisions

## 2026-09-14 — One public canonical page

Twelve Labors has one indexable public URL at `https://gym.sardistic.com/`. The application does not implement client-side routes, so nonexistent paths return a real noindex 404 instead of duplicating the app shell. API paths remain excluded from crawling. Search metadata describes the local-first workout planner without exposing personal workout data.

## 2026-07-19 — Scope workout logs by training program

The selectable gym and home-bodyweight programs use the same weekday navigation but distinct exercise IDs and log identities. Gym log IDs retain the legacy `date:weekday` shape for backward compatibility; additional programs append the program ID. Logs without program metadata normalize to `gym`.

This prevents a user who changes programs from mixing exercises from two regimens into the same dated session while preserving existing gym history and imports.
