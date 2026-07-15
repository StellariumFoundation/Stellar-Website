# The Stellarium App

Welcome to **The Stellarium App**, the digital gateway to the **Stellarium Foundation** and the **Stellarium Society**. This application is the living embodiment of our foundational ethos:

> **Do Good, Make Money, Have Fun.**

Designed by John Victor, this platform serves as a hub for members, prospective governors, and the global community to engage with our vision, access our library of wisdom, and participate in the greatest endeavor of our time: the **Elevation to Eden**.

---

## 🌟 The Vision: Elevation to Eden
We stand at a critical juncture in human history. With the advent of advanced Artificial Intelligence and Robotics, humanity is poised to enter a post-scarcity society—an abundance society where drudgery is automated, and human potential is unleashed. 

The Stellarium Foundation is dedicated to accelerating this transition. We believe that wealth is the greatest metric of societal success, and through **Strategic Incentive Engineering**, **Wealth Activism**, and principled collaboration, we can create a world where prosperity is not a privilege, but a universal reality.

## 🏛️ The Stellarium Society
The Stellarium Society is a non-political, non-religious, mutually beneficial alliance of exceptional individuals. We are honest builders united by shared principles to enrich one another's lives through collaboration, shared enterprise, and strategic support.

### The Six Pillars of the Stellarium Way:
1. **Liberty:** We champion individual sovereignty and freedom of expression.
2. **Empowerment:** We unlock untapped potential through mastery and resource sharing.
3. **Peace:** We are peacemakers; peace and wealth walk in one accord.
4. **Love:** We practice active, tangible love and support for our fellow members.
5. **Fun:** We integrate pleasure, celebration, and joy into the pursuit of success.
6. **Wealth Creation:** We systematically generate and share wealth to elevate the collective.

---

## 💧 The "Water" Suite of Products
The Stellarium Foundation is engineering the future through a portfolio of transformative AI & Robotics products, designed to solve critical issues of labor, expertise, and efficiency:

- **Water Company:** A platform for building and managing fully autonomous digital AI workforces.
- **Water AI:** An "Everything AI" Supermodel that intelligently routes tasks to specialized AI models.
- **Water Robotics:** VR-teleoperated humanoid robots resolving global labor shortages in vital industries.
- **Water Classroom:** A comprehensive, personalized AI-powered educational platform.
- **Water Economics:** An AI foundational model for simulating economic policy and empirically-grounded decision-making.
- **Water AI Fluid:** A decentralized, peer-to-peer network for cost-effective AI computing.
- **Water Coach:** An AI-powered personal coach for real-time productivity and focus guidance.
- **Water Gov:** A visionary super-app centralizing citizen-government interactions.

---

## 📚 Application Features
This web application provides native-like access to the core tenets and resources of the Stellarium mission:

- **The Library:** Read and download the foundational texts, including *The Stellarium Book* and *The Stellarium Society* operations manual, formatted beautifully with Markdown.
- **The Quiz Engine:** Test your knowledge and mastery of the Stellarium principles, Structural Incentive Engineering, and wealth creation strategies.
- **Sponsorship & Action:** Direct links to engage with John Victor, fund the Stellarium Mansion, and support Wealth Activism initiatives.
- **Contact & Collaboration:** Secure channels to join the movement, become a Franchise Governor, or partner in the "Cast In Person" revolution. Includes a "Call Owner" feature for direct voice communication over HTTP chunked streaming with real-time audio.

---

## 🛠️ Build & Development

Built with **Bun** — a fast JavaScript runtime and bundler.

### Prerequisites
- Install [Bun](https://bun.sh) (v1.3+)

### Commands

```bash
# Install dependencies
bun install

# Start development server (with hot-reload on file changes)
bun run dev

# Build for production (outputs to ./dist)
bun run build

# Run TypeScript type checking
bun run lint

# Start production server (serves ./dist on port 3000)
bun run start
```

The production build outputs static files to `dist/`. Deploy the contents of `dist/` to any static host (Render, Vercel, Netlify, etc.). The `--start` command runs the Bun build/serve server (`bun-server.ts --start`), which serves `./dist` on port 3000 and also exposes a legacy `/ws` WebSocket. That Bun WebSocket is **dev-only** and is NOT used in production — the call relay is handled by the separate Go service (see below).

### Architecture

The app includes a real-time walkie-talkie "Call Owner" feature connecting visitors (browser) to the foundation owner's Android app:

- **Web Client (`src/utils/callClient.ts`):** HTTP chunked-streaming client with a state machine (`idle → calling → in_call → ended`/`no_answer`/`failed`) managing call requests, timeouts (30s), queue-position updates, and audio streaming.
- **Audio Capture/Playback (`src/lib/OpusStream.ts`):** Browser-native `MediaRecorder` producing `audio/webm;codecs=opus` blobs; incoming WebM/Opus packets are played via an `HTMLAudioElement`. (The `libopus-wasm` package is declared in `package.json` but is **unused**.)
- **Call UI (`src/screens/ContactScreen.svelte`):** Integrated "Call Owner" button, mute toggle, and call status display. Mic access required for voice calls.
- **Protocol:** Framed binary over HTTP chunked streams — `[type:1B][length:4B BE][payload]`, where type 0 = JSON control frame and type 1 = audio frame. Heartbeat sent every 5s.

### Call Relay Server (Go, `CallServer/main.go`)

The production call relay is a **Go + Fiber** service (deployed to Render as `CallerServer`, see `render.yaml`) that bridges the browser caller and the Android callee over **HTTP chunked streams** — not WebSockets:

- **Caller routes (public):** `GET /caller` (persistent stream; queued with `queue_position` if the callee is busy/absent), `POST /caller` (upload a WebM/Opus audio blob), `DELETE /caller` (hangup).
- **Callee routes (auth):** `GET|POST|DELETE /callee` — protected by `Authorization: Bearer <sha256(TOKEN)>`; only one callee may be connected at a time (a second gets `409`).
- **Call flow:** Visitor clicks "Call Owner" → `GET /caller` → queued (`queue_position`) or connected immediately → callee receives `incoming_call` → callee `POST /callee` answers (`call_answered`, `callActive=true`) → audio is exchanged as framed packets → `DELETE` ends the call and dequeues the next waiting caller.
- **Auth:** The `TOKEN` env var is mandatory (the server refuses to start without it). The callee authenticates with `Authorization: Bearer <sha256(TOKEN)>`.
- **Deployment:** `rootDir: CallServer/`, build `go build -o server`, listens on `$PORT` (default 3001).

> **Dev note:** `bun run start` runs the Bun `bun-server.ts --start` static server, which also exposes a legacy `/ws` WebSocket. That Bun WebSocket is dev-only and is NOT used in production — the Go `CallerServer` handles the real relay.

### Mobile Apps

**Capacitor App (General purpose):**
```bash
# Sync web build to Capacitor platforms
bun run cap sync android
bun run cap sync ios

# Build Android APK/AAB
cd android && ./gradlew assembleDebug

# Build iOS (requires macOS + Xcode)
xcodebuild -workspace ios/App/App.xcworkspace -scheme App ...
```

**StellariumCaller (Owner App):** Standalone Android app in `StellariumCaller/` for receiving voice calls from web visitors.

#### Architecture (Kotlin, 4 components):

- **`MainActivity.kt`** — Simple launcher activity with a service toggle button ("Start/Stop Call Service").
- **`CallService.kt`** — Foreground service that connects to the Go relay as the callee over the `/callee` HTTP chunked protocol (same framed-binary stream, authenticated with `Authorization: Bearer <sha256(TOKEN)>`). It receives `incoming_call`, and on answer captures microphone audio (Opus), sending it as framed audio packets while playing the caller's audio. Implements auto-reconnect with exponential backoff (up to 64s delay).
- **`IncomingCallActivity.kt`** — Full-screen incoming call UI with Answer/Decline buttons. Shows on the lock screen (`setShowWhenLocked`, `setTurnScreenOn`). Plays the system ringtone looped until answered/declined.
- **`BootReceiver.kt`** — `BroadcastReceiver` that auto-starts the `CallService` on device boot (`ACTION_BOOT_COMPLETED`).

#### Build:
```bash
cd StellariumCaller
./gradlew assembleDebug
# APK output: StellariumCaller/app/build/outputs/apk/debug/
```

CI/CD via GitHub Actions (`.github/workflows/build-mobile.yml`) produces web, Capacitor Android, StellariumCaller (owner), and iOS artifacts on push to `main`.

---

## 🤝 Join the Movement
You are not an outsider looking in; you are an integral part of this "great subconscious working." Whether you are here to learn, to invest, or to lead as a Stellarium Governor, your role is vital.

> **"If you agree with these principles, if you recognize that this is the path you have been seeking—then you are ready. Welcome to the franchise of prosperity, principle, and purpose."**

**Trust no one but the one, John Victor.**

**We are one. Let us act as one.**