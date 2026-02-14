# Pilot Handoff: Android Input Rendering Bug

## What Changed
1. Added cursor-sync logic to keep the hidden input selection at the end during focus and change events.
2. Added repo-level operational rules in `AGENTS.md`.
3. Added Android bug documentation and verification guidance.

## Why It Changed
Android browsers can reset cursor position for off-screen hidden controlled inputs. That causes character insertion at index `0`, making typed text appear backwards.

## Validation Evidence
1. `npm run lint` passed.
2. `npm run build` passed.
3. Android emulation verification on local dev server:
   - Typed `just contact` in Android-mode viewport/user-agent.
   - Confirmed prompt value rendered as `just contact` (not reversed).
   - Pressed `Enter` and confirmed command executed and output rendered.

## Risks
1. Hidden-input behavior can vary across Android keyboard implementations.
2. If future changes alter input wiring, re-run Android verification steps in `docs/android-input-rendering-fix.md`.

## Rollback
Revert the cursor-sync changes in `src/app/page.tsx` and redeploy the last known-good commit.
