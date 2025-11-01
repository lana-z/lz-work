## Lana Zumbrunn CLI Portfolio

A CLI-themed personal portfolio for Lana Zumbrunn. The landing page mirrors a macOS terminal session, showing staged commands (`just introduce`, `just projects`, `just contact`) with AI-focused project highlights, contact addresses, and a blinking prompt.
The cursor is now interactive: click anywhere (or press `Tab`) to focus the hidden input, type commands inline, and hit `Enter` to append them to the transcript.

### Supported Commands

```
just introduce
just projects
just projects --current
just projects --current --limit 3
just projects --past
just contact
just social
just education
just background
just speaking
just hackathon
just forfun
just help
```
> Extend or customize commands by editing `getCommandOutput` in `src/app/page.tsx`.

## Run Locally

```bash
npm install
npm run dev
```

Visit http://localhost:3000 to view the site.

## Quality Checks

```bash
npm run lint
npm run build
```

> `npm run build` requires network access (for font downloads) and permission to spawn helper processes; run locally outside of sandboxed environments.

## Deployment

The project is ready for Vercel. Push a feature branch, open a PR, then promote to `main` once verified.👍

## Extend or Customize

- Edit `KNOWN_COMMANDS` and `getCommandOutput` in `src/app/page.tsx` to add, update, or remove CLI commands.
- Each command appends a `(prompt, command, output)` entry to the history array; adjust `INITIAL_HISTORY` if you want a different default transcript.
- Favicon lives at `src/app/icon.svg`. Replace it with a new SVG if you update branding.
