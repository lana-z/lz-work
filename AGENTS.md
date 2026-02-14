# Repo Agent Rules: portfolio-1

## Scope
- Product/domain: Personal CLI-style portfolio site (`lanazumbrunn.com`)
- Stack: Next.js 16, React 19, TypeScript, Tailwind CSS 4
- Runtime: Browser-first UI, deployed on Vercel

## Required checks
1. Run `npm run lint` for every code change.
2. Run `npm run build` before handoff when environment permits.
3. Verify interactive command input behavior on desktop and mobile emulation for UI/input changes.

## Change policy
1. Prefer minimal, targeted fixes over broad refactors.
2. Preserve existing command behavior and transcript rendering.
3. Keep accessibility attributes intact for interactive elements.

## Approval gates
1. Human approval required for production deployment and domain configuration changes.
2. Human approval required for destructive content removals.

## Handoff contract
1. Summarize what changed and why.
2. Include validation evidence (commands + results).
3. Include risk assessment and rollback note.
