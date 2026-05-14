# Post-MVP TODOs

Backlog of intentionally-deferred items. Pulled out of inline `TODO`
comments so the code stays clean and decisions live in one place.

## Settings

### Wipe Ending Collection (separate destructive action)

**Status:** deferred — not in v0.2.2 (Sprint 16 Reset wording clarity).

**Context.** As of Sprint 16, the Settings "Xoá lượt chơi hiện tại" button
only clears `las.save.v1` (the active playthrough). The Ending Collection
key `las.endings.unlocked.v1` is intentionally preserved so the player can
work toward all 5 endings across multiple runs.

**Open question.** Some players will eventually want to fully wipe their
device — e.g. to test a fresh-install flow, to hand the phone to a friend,
or because they're done and want everything gone. The current path for
that is uninstalling the app, which is awkward.

**Proposed UI (when we do it):**

- Second button in Settings, visually separated and lower than the active
  "Xoá lượt chơi hiện tại" button, with a darker / more dangerous
  treatment (e.g. text-only or thin border, not the rose-tinted block).
- Label: "Xoá luôn Ending Collection" (explicit — no "reset everything"
  catch-all wording, that's what the current button looked like and
  confused testers).
- Confirm dialog must spell out what's being lost: `"Xoá X / 5 ending đã
  mở? Hành động này không khôi phục được."` — substitute X with current
  unlocked count.
- Implementation: new `clearEndings()` in `src/engine/storage.ts` that
  `localStorage.removeItem(ENDINGS_KEY)`. Wire to a new prop on
  SettingsScreen.

**Why not now.** Adding it before there's a real ask risks two things: (1)
testers reset by accident and lose meta-progression they cared about; (2)
the screen becomes a "settings page" of buttons instead of a quiet space.
Wait until a tester or playtest feedback explicitly asks for it.

## Cloud sync / account

Out of scope for V1. Revisit only if cross-device save becomes a top-3
piece of feedback. Adding cloud sync pulls in: auth provider, backend,
account recovery flow, privacy policy update. Cost is large.

## Day 8+ content (Week 2)

Tracked in main README's "Chưa có ở milestone này". This is the next major
content milestone, not a Settings-screen TODO.

## Analytics

Planning doc at `docs/analytics-v0.md`. Not implemented. Will require
privacy policy update + Apple App Privacy questionnaire update if turned
on later.
