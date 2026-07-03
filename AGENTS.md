# Stellarium App — AGENTS.md

## Tech Stack
- **Runtime/Bundler**: Bun (no Vite — custom `bun-server.ts` compiles Tailwind via `@tailwindcss/cli`, bundles Svelte 5 via custom plugin, copies `public/` to `dist/`)
- **Server**: Hono (HTTP chunked relay in `ws-server/ws-server.ts`)
- **Frontend**: Svelte 5 (`$state`/`$effect`/`mount()` — not legacy APIs), TailwindCSS 4, `@lucide/svelte` icons
- **Mobile**: Capacitor 8 (Android + iOS wrapper), Jetpack Compose native app (`StellariumCaller/`)

## Key Commands
| Command | What it does |
|---------|-------------|
| `bun run build` | Tailwind → Svelte bundle → copy public → `./dist/` |
| `bun run dev` | Same as build + file watcher + static server on :3000 |
| `bun run start` / `bun run ws` | Starts Hono HTTP relay server (`ws-server/ws-server.ts`) |
| `bun run lint` | `tsc --noEmit` (typecheck only, no linter) |
| `bunx cap sync android` | Sync Capacitor web build → Android native project |
| `bunx cap sync ios` | Sync Capacitor web build → iOS native project |

**There is no test framework configured.** No test command exists.

## Current Version

## Project Structure
```
bun-server.ts          — Build + dev server + legacy WebSocket (only build used in prod)
ws-server/ws-server.ts — Production HTTP chunked relay server (Hono, deployed on Render)
dist/                  — Static output (deployed to GitHub Pages)
android/               — Capacitor Android project (app name: "Stellarium Foundation")
ios/                   — Capacitor iOS project
StellariumCaller/      — Native Android app (Jetpack Compose, app name: "StellariumCaller")
src/
  main.ts              — Svelte mount + service worker registration
  App.svelte           — SPA shell with 6-tab bottom navbar, hash-free routing via pushState
  lib/OpusStream.ts    — Single MediaRecorder instance, reused across PTT presses
  utils/callClient.ts  — fetch + ReadableStream HTTP streaming client
  screens/             — 7 screen components (one per tab + library detail)
  components/          — AudioControl.svelte, BottomSheet.svelte
  index.css            — TailwindCSS 4 directives + :root dark theme + font-face
```

## Walkie-Talkie Audio Protocol
- **GET /caller** — persistent HTTP chunked stream from browser. Server relays audio from callee.
- **POST /caller** — browser sends audio WebM body. Server merges chunks via `readAllChunks()`, wraps as framed binary, pushes to callee stream.
- **DELETE /caller** — browser hangup.
- **GET /callee** — same for Android native app.
- **POST /callee** — answer + audio from caller. `callActive` flag set on first POST.
- **DELETE /callee** — Android hangup.
- **Framed binary**: `[type:1B][length:4B BE][payload]`. type=0 for JSON control, type=1 for audio. Heartbeat every 5s.

## Svelte 5 Conventions
- Use `$state()`, `$effect()`, `$derived()` — not `let x = $state(...)` is the Svelte 5 runes syntax.
- `mount()` in `main.ts` instead of `new App()`.
- Subscribe to stores via `store.subscribe(v => ...)` in `$effect`, not `$store` syntax.
- Event handlers: `onclick`, `onmouseenter`, etc. (lowercase, not `on:click`).

## CSS Conventions
- **Always-dark**: `:root` defines dark theme directly, no `.dark` class toggle.
- **No bold fonts**: All text at weight 400 (regular) or 100 (thin). No `font-bold` usage.
- **Font**: Neue Frutiger World (`/fonts/thin.woff2`, `/fonts/regular.woff2`).
- **TailwindCSS 4**: Uses `@import "tailwindcss"` + `@theme` block + `@layer` directives (not Tailwind 3 `@tailwind` directives or `tailwind.config.js`).

## CI/CD (`.github/workflows/build-mobile.yml`)
Uses `actions/checkout@v6`, `actions/setup-java@v5` with JDK 26 Zulu, `oven-sh/setup-bun@v2`.
On push to `main`/`master`:
1. Generate Android launcher icons from `assets/logo.png`
2. Build Capacitor Android APK + AAB (requires `KEYSTORE_BASE64` etc. secrets)
3. Build StellariumCaller APK + AAB
4. Build iOS simulator (macOS runner)
5. Create continuous date-tagged release (`release-YYYYMMDD-HHMMSS`) with all artifacts

On push of semver tag `v*`:
1-4 same as above
5. Create versioned GitHub Release with the tag name

Keystore decoding from `${{ secrets.KEYSTORE_BASE64 }}` is required for release builds in CI.

## Version Bump Process
- `package.json` version
- `StellariumCaller/app/build.gradle.kts` `versionCode` (increment) + `versionName`
- `android/app/build.gradle` `versionCode` + `versionName`
- Git tag `v<version>` + GitHub release

## Important Gotchas
- **No `npm`**: Use `bun install`, `bunx`, `bun run`. `npx` may fail if `@capacitor/cli` isn't discoverable — use `bunx cap sync`.
- **No Vite**: Don't look for `vite.config.ts`. Build is in `bun-server.ts`.
- **Keystore guarded**: Both `android/app/build.gradle` and `StellariumCaller/app/build.gradle.kts` wrap release signing in `if (keystorePath)` to not break debug builds.
- **Capacitor app name**: `"Stellarium Foundation"` in `capacitor.config.ts`. Native Android uses `strings.xml`. Both must stay in sync.
- **Mic permission**: `RECORD_AUDIO` + `MODIFY_AUDIO_SETTINGS` in Capacitor `AndroidManifest.xml`; `NSMicrophoneUsageDescription` in iOS `Info.plist`. Not via Capacitor plugins.
- **Two Android Gradle projects**: `android/` (Capacitor, AGP 9.2.1, Gradle 9.4.1, JDK 26 Zulu on CI) and `StellariumCaller/` (native, AGP 9.2.1, Gradle 9.4.1, JDK 26 Zulu on CI). Capacitor uses Java only. Android SDK 36 per Capacitor 8 guide.
- **@lucide/svelte brand icons**: `Twitter` was renamed to `X`, `Youtube` removed — use `PlaySquare` instead. Check available icons in `node_modules/@lucide/svelte/dist/icons/`.
- **`.opencode/` directory**: Contains speckit agent commands. Don't modify unless updating OpenCode config.
- **WebSocket server URL** is injected via `window.__WS_URL__` in `index.html` (points to Render).
