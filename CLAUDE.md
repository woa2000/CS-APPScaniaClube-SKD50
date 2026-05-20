# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Scania Clube (`com.rasystem.appclubescania`) — React Native + Expo SDK 53 mobile app (iOS/Android) using TypeScript strict mode. UI in Portuguese; product strings live in `src/languages/{portuguese,english}.json` via i18next.

## Commands

```bash
# Dev (Metro). The app uses expo-dev-client, NOT Expo Go.
npm start                     # expo start --dev-client
npm run android               # build + install dev client to a connected Android device
npm run ios                   # build + install dev client to iOS simulator/device

# Tests
npm test                      # Jest with jest-expo preset
npm test -- path/to/file      # single file
npm test -- -t "test name"    # by test name

# Maestro E2E (requires app already running on device/emulator)
maestro test e2e/maestro/login-flow.yaml
maestro test e2e/maestro/reserve-flow.yaml
maestro test e2e/maestro/cancel-reservation-flow.yaml

# EAS build / submit (Play Store flows — see docs/EAS-Play-Store.md)
npm run eas:build:android                # production AAB build
npm run release:android:internal         # build + auto-submit to Play internal track
npm run release:android:play             # build + auto-submit to production track
```

There is no lint script and no typecheck script wired into `package.json`. Run `npx tsc --noEmit` for typechecking.

## Architecture

### Provider tree (`App.tsx`)

`ErrorBoundary → QueryClientProvider → NavigationContainer → AuthProvider → Routes`. Fonts (Montserrat/Roboto) load via `useFonts`; `intl` polyfill + `pt-BR` locale are imported eagerly. New Architecture is **disabled** (`app.json: newArchEnabled: false`).

### Auth + navigation gate

`src/contexts/auth.tsx` owns the session. Storage keys are namespaced `@ClubeScania:{token,refreshToken,user,fileServer,language}` in AsyncStorage. `src/routes/index.tsx` switches stacks on every render based on auth state:

- not signed → `AuthRoutes`
- signed but `user.policyAccepted !== true` → `PrivacyRoutes`
- signed + policy accepted → `AppRoutes` (bottom tabs + stack)

The privacy gate is currently force-set to `true` on login in `services/auth.ts` (`policyAccepted: true`); don't assume the backend flag is honored without checking that line.

### HTTP layer (`src/services/api.ts`)

Single axios instance, `baseURL = https://scania-clube.azurewebsites.net/api`, 30s timeout. The response interceptor implements a **401 refresh-token flow with a request queue**:

- On 401, the original request is marked `_retry` and parked. While a refresh is in flight (`isRefreshingToken`), other 401s queue in `pendingRequests` and resume with the new token once it arrives.
- Refresh tries three endpoints in order: `auth/refresh`, `auth/refresh-token`, `auth/refreshToken`. First non-5xx success wins.
- On refresh failure, `onSessionExpired` from `AuthProvider` clears AsyncStorage + axios headers.
- Network/timeout errors are normalized to `{ isHandledError: true, userMessage }` — screens can show `userMessage` directly.
- Every request is timed and emitted to telemetry as `api_success` / `api_failure`.

`AuthProvider` wires the interceptor via `configureAuthInterceptors(...)` in a `useEffect`. **Don't import api before AuthProvider mounts** — the interceptor handlers are null until then, and a pre-mount 401 will reject without refreshing.

### Data fetching

`@tanstack/react-query` v5 with `queryClient` in `src/services/queryClient.ts` (`staleTime: 60s`, `gcTime: 5min`, `retry: 1`, `refetchOnWindowFocus: false`). Service files in `src/services/*.ts` are thin axios wrappers; screens consume them through React Query hooks.

### Telemetry

`src/services/telemetry.ts` exposes `trackEvent` / `trackError`. Currently a `console.log` shim — when swapping to a real provider (Sentry/Firebase/etc.), replace the body of `log()` only; call sites across `services/` and screens will keep working.

### Conventions

- Each screen and component lives in `src/screens/<Name>/{index.tsx, styles.ts}` (or `components/<Name>/...`). Styles use `styled-components/native`.
- Service files in `src/services/` are domain-named (`events.ts`, `exams.ts`, `partnership.ts`, …) and return typed Promises that wrap the api instance.
- Shared types live in `src/interfaces/interfaces.ts`.

## Build quirks to know about

- **`metro.config.js` rewrites `axios` to its browser bundle** (`axios/dist/browser/axios.cjs`). Removing this breaks the app in release builds. Don't "simplify" the resolver without testing release.
- **`babel.config.js` must keep `react-native-reanimated/plugin` last.** Reanimated breaks silently if reordered.
- **`patches/`** are applied via `patch-package` on `postinstall`. After `npm install`, verify they applied:
  - `styled-components+5.3.11.patch` — otherwise styled-components throws on RN 0.79.
  - `react-native-modal+13.0.1.patch` — swaps the removed `BackHandler.removeEventListener` API (gone since RN 0.74) for the subscription `.remove()` API. Without it, unmounting any `AlertCustom`/`react-native-modal` modal crashes on RN 0.79 (e.g. right after login).
- **Android** blocks legacy storage permissions in `app.json` (`READ_EXTERNAL_STORAGE`, `WRITE_EXTERNAL_STORAGE`, `READ_MEDIA_IMAGES`, `READ_MEDIA_VIDEO`). Use scoped Expo APIs (`expo-image-picker`, `expo-document-picker`, `expo-file-system`); don't add raw `MANAGE_EXTERNAL_STORAGE` flows.
- **OTA updates** are enabled via `expo-updates` (`runtimeVersion.policy: "appVersion"`). Bumping `expo.version` in `app.json` starts a new runtime channel — a bare JS change without a version bump can be shipped as an OTA; native or `app.json` plugin changes need a new build.
- **Version management is remote**: `eas.json` has `appVersionSource: "remote"` and `production.autoIncrement: true`. Do not hand-edit Android `versionCode` — let EAS bump it.
- The Expo Go client will NOT run this app. Always use a dev client build (`npm run android` / `npm run ios`) or an internal EAS build for device testing.

## Testing notes

- Jest uses `jest-expo` preset; `jest.setup.ts` mocks `expo-updates`. Add module mocks there when adding tests that pull in native modules.
- `transformIgnorePatterns` already covers `@expo`, `@react-navigation`, `@tanstack`, `@expo-google-fonts`. If a new native-ish dep fails to transform, append it to that list rather than mocking the whole module.
- Existing examples: `src/services/__tests__/auth.test.ts`, `src/components/ErrorBoundary/ErrorBoundary.test.tsx`, `src/routes/Routes.test.tsx`.

## Reference docs

- `docs/EAS-Play-Store.md` — Play Console / service-account setup, release flows, troubleshooting submission errors.
- `docs/PRD-Scania-Clube.md`, `docs/SPEC-Scania-Clube.md` — product/feature specs (Portuguese).
- `e2e/README.md` — Maestro flow inventory.
