# Android Text Input Rendering Fix

## Issue
On Android devices, typing into the CLI prompt could render text backwards (new characters appearing at the start of the command).

## Root Cause
The UI uses an off-screen controlled `<input>` and mirrors text into the terminal line. On Android browsers, cursor/selection in this hidden input can reset to index `0`, causing subsequent characters to insert at the beginning.

## Fix
- Added a `syncCursorToEnd()` helper in `src/app/page.tsx`.
- Called it after focus and on every input change.
- Ensures the hidden input selection stays at the end, preventing reverse insertion order.

## Reproduction Steps (Before Fix)
1. Open site on Android Chrome (or Android emulator in Chrome DevTools device mode).
2. Tap terminal area to focus input.
3. Type a command quickly (for example `just contact`).
4. Observe characters may appear in reverse order on affected devices.

## Verification Steps (After Fix)
1. Run site locally (`npm run dev`).
2. Open in Android emulator/device mode.
3. Tap terminal and type `just contact`.
4. Confirm characters append left-to-right in expected order.
5. Press `Enter`; confirm command executes normally and desktop behavior is unchanged.

## Regression Guard
Use the verification steps above for every future change touching the input/mirroring flow in `src/app/page.tsx`.

## Rollback Note
If unexpected side effects occur, revert the cursor-sync change in `src/app/page.tsx` and redeploy previous stable commit.
