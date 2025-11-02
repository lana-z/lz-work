## Lana Zumbrunn CLI Portfolio

A CLI-themed personal portfolio for Lana Zumbrunn. The landing page mirrors a macOS terminal session, showing staged commands (`just introduce`, `just projects`, `just contact`) with AI-focused project highlights, contact addresses, and a blinking prompt.  
Live site: https://lanazumbrunn.com
The cursor is interactive: click anywhere (or press `Tab`) to focus the hidden input, type commands inline, and hit `Enter` to append them to the transcript.

### Supported Commands

```
just introduce
just contact
just social
just projects [--current] [--past] [--limit N]
just speaking
just community
just forfun
just education
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

- Adjust command routing in `getCommandOutput` (and, if needed, the helper arrays near the top of `src/app/page.tsx`) to add, update, or remove CLI commands.
- Each command appends a `(prompt, command, output)` entry to the history array; adjust `INITIAL_HISTORY` if you want a different default transcript.
- Favicon lives at `src/app/icon.svg`. Replace it with a new SVG if you update branding.
