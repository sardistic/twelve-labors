# Engineering Decisions

## 2026-07-19 — Scope workout logs by training program

The selectable gym and home-bodyweight programs use the same weekday navigation but distinct exercise IDs and log identities. Gym log IDs retain the legacy `date:weekday` shape for backward compatibility; additional programs append the program ID. Logs without program metadata normalize to `gym`.

This prevents a user who changes programs from mixing exercises from two regimens into the same dated session while preserving existing gym history and imports.
