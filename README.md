# India Path AI — v5 (Supabase Postgres + Mobile Native iOS & Android + Web)

An AI-powered heritage travel companion for Tamil Nadu, India. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Prisma 7 + SQLite, Google Maps Platform, Auth.js (NextAuth), Stripe (Test Mode), Google Gemini AI, and wrapped as native iOS & Android apps with **Capacitor**.

---

## 🌟 What's New in v4

India Path AI v4 introduces three major intelligent travel additions:

### 1. 🤖 AI Tourism Assistant (`/ask` & Persistent Floating Widget)
- **Persistent Accessibility**: Chat with the assistant from any page via the persistent floating widget or the dedicated `/ask` full page.
- **Grounded POI Knowledge**: When inquiring about destinations (e.g. Kapaleeshwarar Temple, Shore Temple, Meenakshi Amman Temple), the assistant grounds its answers directly in the database's verified historical, architectural, and transit details.
- **Safety Interceptor**: Automatically detects medical emergencies, accident reports, or safety threats and immediately redirects users to the in-app **Tourist SOS tab** and India's official emergency numbers (`112`, `108`, `100`, `101`).
- **Multi-turn & Multilingual**: Retains session history and speaks English, Tamil (`தமிழ்`), and Hindi (`हिंदी`).

### 2. 📅 Culture & Events Calendar (`/events` & Trip Planner Integration)
- **Seasonal Guidance**: Browse recurring Tamil Nadu cultural festivals (Pongal & Jallikattu, Natyanjali Dance Festival, Chithirai Festival, Karthigai Deepam, Margazhi Music Season, etc.) filterable by month and city.
- **Seasonal Timing Disclaimers**: Prominently notes that festival dates follow traditional lunar/solar cycles and must be confirmed for the current year.
- **Trip Planner Integration**: Form includes an optional "Travel Month" selector that automatically surfaces matching cultural events alongside generated multi-day itineraries.

### 3. ✨ Personalized Recommendations (`/dashboard`)
- **Smart Recommendations Engine**: Analyzes authenticated users' past visited destinations and interests to suggest 2-3 unvisited seeded POIs with personalized reasoning.
- **Graceful New User Fallbacks**: For new users or guests with 0 saved trips, gracefully presents popular starter heritage highlights so the dashboard is never empty or broken.

---

## Quick Start (Web)

```bash
# 1. Install dependencies
npm install

# 2. Set up the database (runs prisma db push & seeds POIs)
npm run setup

# 3. Start the dev server
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## 📱 Mobile Native Setup (iOS & Android via Capacitor)

India Path AI is wrapped as a native mobile shell using **Capacitor 8**. Because the app uses Next.js server-side API routes, SQLite database operations, and Stripe secret keys, it connects directly to the live server via `CAPACITOR_SERVER_URL` rather than running a static export.

### 1. Configure Server URL for Mobile

In `.env.local`, set `CAPACITOR_SERVER_URL` to your computer's local network IP address:

```env
# Example for testing on physical phone or simulator
CAPACITOR_SERVER_URL="http://192.168.1.100:3000"

# Or for Android Studio Emulator default host loopback:
# CAPACITOR_SERVER_URL="http://10.0.2.2:3000"
```

### 2. Sync Native Projects

Whenever you update web code, assets, or plugins:

```bash
npm run cap:sync
```

### 3. Open in Xcode (iOS — macOS only)

```bash
npm run cap:ios
```
- Select your target simulator (e.g. *iPhone 16 Pro*) or connected physical iPhone.
- Press **Cmd + R** or click **Run**.
- Native features like Camera, Geolocation, and Haptics will activate automatically.

### 4. Open in Android Studio (Android)

```bash
npm run cap:android
```
- Wait for Gradle to finish indexing.
- Select your target Android Emulator (e.g. *Pixel 8*) or connected physical Android device with USB debugging enabled.
- Click the green **Run ▶** button.

---

## Environment Variables (`.env.local`)

```env
# ─── Supabase PostgreSQL Database ─────────────────────────────────────────────
# DATABASE_URL: The pooled connection string used by Next.js at runtime for efficient connection reuse.
DATABASE_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"

# DIRECT_URL: The direct connection string (port 5432) required by Prisma CLI for running schema migrations and DDL commands.
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres"

# Gemini AI (for trip planning, complaint routing & lens)
GEMINI_API_KEY="your_gemini_api_key"

# Google Maps Platform (Maps JS, Places New, Geocoding, Routes, Route Optimization)
GOOGLE_MAPS_API_KEY="your_google_maps_key"

# Auth.js / NextAuth Session Secret
AUTH_SECRET="india_path_ai_super_secret_jwt_key_2026_prototype"
NEXTAUTH_SECRET="india_path_ai_super_secret_jwt_key_2026_prototype"
NEXTAUTH_URL="http://localhost:3000"

# Stripe Test Mode (Payments for Monument & Tour Passes)
# ONLY use test keys (sk_test_... and pk_test_...). Never use live keys!
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Capacitor Mobile Shell (iOS & Android)
CAPACITOR_SERVER_URL="http://localhost:3000"
```

---

## Native Plugin Features & Platform Branching

| Native Feature | Plugin | Native Behavior (`Capacitor.isNativePlatform()`) | Web Fallback |
|---|---|---|---|
| **Heritage Lens** | `@capacitor/camera` | Launches the hardware device camera directly | Standard file picker / Drag & Drop |
| **Tourist SOS** | `@capacitor/geolocation` | High-accuracy native GPS device sensor | Browser `navigator.geolocation` API |
| **Complaint GPS** | `@capacitor/geolocation` | High-accuracy native GPS device sensor | Browser `navigator.geolocation` API |
| **Officer Dashboard Notifications** | `@capacitor/local-notifications` | On-device local system notifications on complaint status updates | In-app UI status progress bar |
| **App Branding & Identity** | `@capacitor/assets` | Custom amber/orange app icons and dark launch splash screens for iOS & Android | Standard web favicon and PWA icons |

---

## Where to Get Keys for Each Service

### 1. Google Maps Platform (`GOOGLE_MAPS_API_KEY`)
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/library).
2. Enable these APIs on your project:
   - **Maps JavaScript API**
   - **Places API (New)**
   - **Geocoding API**
   - **Routes API**
   - **Route Optimization API**
3. Create an API key under **APIs & Services > Credentials** and paste it into `GOOGLE_MAPS_API_KEY`.
*(If the key is missing or calls fail, transit directions and maps fall back gracefully to seeded data).*

### 2. Stripe Test Mode & Supabase Edge Functions
1. In your **Supabase Dashboard** -> **Project Settings** -> **Edge Functions** (or via Supabase CLI), add these function secrets:
   - `STRIPE_SECRET_KEY`: `sk_test_...`
   - `STRIPE_WEBHOOK_SECRET`: `whsec_...`
   - `STRIPE_PUBLISHABLE_KEY`: `pk_test_...`
   - `SUPABASE_URL`: `https://[PROJECT_REF].supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY`: `your_service_role_key`
2. **Stripe Webhook Configuration**:
   - In [Stripe Dashboard (Test Mode)](https://dashboard.stripe.com/test/webhooks), click **Add destination / endpoint**.
   - URL: `https://[PROJECT_REF].supabase.co/functions/v1/stripe-webhook` (or `https://your-domain/api/payments/webhook`)
   - Events to listen for:
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `payment_intent.canceled`
   - Copy the Signing Secret (`whsec_...`) into `STRIPE_WEBHOOK_SECRET`.
3. In your client `.env.local`, configure:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: `pk_test_...`
   - `STRIPE_PUBLISHABLE_KEY`: `pk_test_...`
   *(The secret key `sk_test_...` is kept strictly inside Supabase Edge Function secrets and is never exposed to the client).*

---

### 3. Auth.js / NextAuth (`AUTH_SECRET` / `NEXTAUTH_SECRET`)
- Any random string of 32+ characters (e.g. generated via `openssl rand -base64 32`).

### 4. Gemini AI (`GEMINI_API_KEY`)
- Get a free key at [ai.google.dev](https://ai.google.dev).

---

## Non-Negotiable Safety & Demo Rules

1. **SOS** — Always displays the "DEMO MODE" banner. No real emergency dispatches or calls are made.
2. **Complaints** — Always displays the "Prototype only" banner. Not submitted to municipal servers.
3. **Payments** — **Strictly test mode only**. The backend rejects any key that does not start with `sk_test_`. Real charges are never processed.
