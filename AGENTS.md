# Stellarium App — AGENTS.md

## Tech Stack
- **Runtime/Bundler**: Bun (no Vite — custom `bun-server.ts` compiles Tailwind via `@tailwindcss/cli`, bundles Svelte 5 via custom plugin, copies `public/` to `dist/`)
- **Production relay server**: Go + Fiber in `CallServer/main.go` (HTTP chunked audio relay, deployed to Render as service `CallerServer`, `rootDir: CallServer/`). Built with `go build -o server`; listens on `$PORT` (default 3001).
- **Dev/build server**: `bun-server.ts` — builds the SPA and (via `--start`/`--dev`) serves `dist/` with a legacy WebSocket relay at `/ws`. In production the Go `CallerServer` handles the call relay; the Bun server's WebSocket is NOT used in prod.
- **Frontend**: Svelte 5 (`$state`/`$effect`/`$derived`/`mount()`), TailwindCSS 4, `@lucide/svelte` icons
- **Audio codec**: Browser uses the native `MediaRecorder` API with `audio/webm;codecs=opus` (WebM container blobs), not libopus-wasm. `libopus-wasm` is a declared dependency in `package.json` but is **unused** in the code. Incoming audio is played back via a `new Audio(url)` element. Native callee (`StellariumCaller/`) connects to the same `/callee` HTTP protocol using an Opus encoder/decoder.
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

> **NOTE — relay server mismatch**: `bun run start`/`bun run ws` reference `ws-server.ts`, which does NOT exist in this repo. The production call relay is the Go service `CallServer/main.go` (see deployment in `render.yaml`). The Bun `bun-server.ts` only exists to build the SPA and, with `--start`, to serve `dist/` plus a legacy `/ws` WebSocket (dev-only). Do not rely on `bun run ws` in prod.

## Current Version
- `package.json` version: **1.4.0**

## Project Structure
```
bun-server.ts          — Build + dev server + legacy WebSocket (only build used in prod)
CallServer/main.go     — Production HTTP chunked relay server (Go + Fiber, deployed on Render as CallerServer)
CallServer/go.mod      — Go module (fiber/v2, golang.org/x/crypto)
dist/                  — Static output (deployed to GitHub Pages)
android/               — Capacitor Android project (app name: "Stellarium Foundation")
ios/                   — Capacitor iOS project
StellariumCaller/      — Native Android app (Jetpack Compose, app name: "StellariumCaller")
src/
  main.ts              — Svelte mount + service worker registration
  App.svelte           — SPA shell with bottom navbar, hash-free routing via pushState
  lib/OpusStream.ts    — Native MediaRecorder-based webm/opus capture + playback (singleton reused across PTT presses); libopus-wasm is declared but unused
  utils/callClient.ts  — HTTP chunked streaming client (GET/POST/DELETE /caller), framed-binary parser, call state machine
  screens/             — 8 screen components (Home, Library, Quiz, Media, Download, Sponsor, Contact, Privacy)
  components/          — AudioControl.svelte, BottomSheet.svelte
  index.css            — TailwindCSS 4 directives + :root dark theme + font-face
```

## Walkie-Talkie Audio Protocol
- **GET /caller** — persistent HTTP chunked stream from browser. If callee available and no active call: immediately connected. Otherwise: queued, receives `queue_position` control frame.
- **POST /caller** — browser sends an audio WebM body (MediaRecorder `audio/webm;codecs=opus` blob). Server wraps it as a framed audio packet and pushes to callee stream (only if this caller is the active caller).
- **DELETE /caller** — browser hangup. If active caller, ends active call and dequeues next waiting caller (if any).
- **GET /callee** — same for Android native app. On connect, if callers are queued, dequeues first as active and sends `incoming_call`.
- **POST /callee** — answer + audio from caller. `callActive` flag set on first POST.
- **DELETE /callee** — Android hangup. Ends active call (callers remain queued).
- **Framed binary**: `[type:1B][length:4B BE][payload]`. type=0 for JSON control, type=1 for audio. Heartbeat every 5s.
- **Audio codec**: Browser side uses `MediaRecorder` `audio/webm;codecs=opus` (WebM/Opus blobs), not libopus-wasm (which is declared but unused). `src/lib/OpusStream.ts` captures mic input and plays incoming WebM/Opus packets via an `HTMLAudioElement`. Native callee (`StellariumCaller/`) connects to the same `/callee` HTTP protocol using an Opus encoder/decoder.

### Caller Queue
- Multiple callers can be queued simultaneously via GET /caller when callee is unavailable.
- Each queued caller receives periodic `queue_position` updates (control frame `{"type":"queue_position","position":N}`).
- When callee connects or a call ends, the first waiting caller is dequeued as `active`, receives `connected`, and callee gets `incoming_call`.
- Callers can leave the queue by disconnecting or calling DELETE /caller (no-op if not active).
- State: `callerEntries[]` (all waiting callers), `activeCallerId/activeCallerQueue` (caller in current call), `calleeQueue` (single callee).

## Svelte 5 Conventions
- Use `$state()`, `$effect()`, `$derived()` runes — e.g. `let x = $state(...)`. Do NOT use legacy Svelte 4 stores/`on:` event syntax.
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
- **StellariumCaller FGS permission fix**: On API 34+ with `compileSdk=37`, all `FOREGROUND_SERVICE_*` permissions must be declared in manifest AND `RECORD_AUDIO` must be runtime-granted BEFORE `startForegroundService()` is called. Missing `FOREGROUND_SERVICE_DATA_SYNC` was the silent blocker — the system checks ALL declared FGS types' permissions. See `SettingsScreen.kt:ensureMicPermAndStart()` for the runtime request pattern.
- **@lucide/svelte brand icons**: `Twitter` was renamed to `X`, `Youtube` removed — use `PlaySquare` instead. Check available icons in `node_modules/@lucide/svelte/dist/icons/`.
- **`.opencode/` directory**: Contains speckit agent commands. Don't modify unless updating OpenCode config.
- **Relay URL injection**: `index.html` injects `window.__RELAY_URL__` (currently `https://callserver-q9sj.onrender.com`) — the base host of the Go HTTP relay (`CallServer/main.go`). The relay uses HTTP chunked `/caller` + `/callee` routes, not a `/ws` WebSocket. `src/utils/callClient.ts` reads `__RELAY_URL__`, normalizing any legacy `ws(s)://` scheme or trailing `/ws` to `http(s)://`.
