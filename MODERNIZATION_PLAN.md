# Contact-Book 2026 Modernization Plan

## Context

The project is a Create React App (react-scripts 4.0.0-next) SPA last touched with 2019–2020-era
dependencies: React 16, react-router-dom 5, Redux 4 with hand-written action-type constants,
redux-form 8 (unmaintained since 2020), Firebase 7 (deprecated namespaced/compat API), node-sass
(deprecated, unmaintained), and TypeScript 4.0. CRA itself was archived by Meta in Feb 2025 and no
longer receives updates. There are currently **zero tests** in the repo despite
`@testing-library/*` being listed as dependencies.

The goal is to bring every layer up to a 2026-current baseline. Per the project owner's own
stack/learning goals (Next.js is the primary framework and a stated learning focus), the migration
target is **Next.js (App Router)** rather than a same-shape Vite swap — this is a larger rewrite
than a pure version bump, but it's an intentional, justified one, not a premature abstraction.
Deployment stays on GitHub Pages via Next's static export, so the app's actual runtime behavior
(all client-side: Firebase auth/Firestore, Redux, forms) doesn't change — only how it's built and
routed.

Decisions locked in:
- **Build tool:** Next.js, App Router
- **Deployment:** static export (`output: 'export'`), keep GitHub Pages
- **State management:** upgrade Redux/react-redux and adopt `@reduxjs/toolkit` (RTK), replacing
  the hand-rolled action-type constants and plain reducers/thunks
- **Forms:** redux-form is unmaintained with no newer major — replace with `react-hook-form`
- **Firebase:** move from v7 namespaced/compat API to the modular v9+ SDK
- **Styling:** node-sass + CSS Modules (9 `.scss`/`.module.scss` files) → **Tailwind CSS**; the
  color/spacing tokens in `styles/variables.scss` become Tailwind theme config, and each
  component's `.module.scss` classes are converted to utility classes inline
- **Icons:** `material-icons-react` is an abandoned 2019 package — swap to a maintained
  alternative (`react-icons`), used in only 3 files

The Firebase Auth migration is a **high-risk** change (touches auth) and gets extra scrutiny: a
pre-migration safety net of smoke tests, and manual validation of the real login/register flow
post-migration — not just green typecheck/lint.

This plan is scoped as a **modernization**, not a feature change: no new product behavior, no
acceptance criteria beyond "the app does exactly what it does today, on current dependencies."

---

## Process & git workflow

- **One phase = one branch = one commit = one MR, then stop.** For each phase below:
  1. Branch off `feature/modernize-2026`: `feature/modernize-2026-phase-N-<short-name>` (e.g.
     `feature/modernize-2026-phase-2-firebase-modular`).
  2. Implement only that phase's scope.
  3. Commit (single focused commit, or a few if the phase naturally splits — but no
     phase-straddling commits).
  4. Open a PR/MR from the phase branch **into `feature/modernize-2026`** (not into `master`).
  5. **Stop and wait for explicit approval of that PR before starting the next phase's branch.**
     No phase N+1 branch gets created until phase N's PR is reviewed and approved.
- This means the 10 phases (0–9) become 10 sequential PRs, each independently revertable, each
  gated on review before proceeding.

---

## Current → Target versions

| Package | Current | Target (2026) | Why |
|---|---|---|---|
| react-scripts | ^4.0.0-next.98 | *removed* | replaced by `next` |
| react, react-dom | ^16.13.1 | ^19.x | required by Next 15+ |
| next | — | ^15.x (latest stable) | new build framework |
| react-router-dom | ^5.2.0 | *removed* | replaced by Next App Router file-based routing |
| redux | ^4.0.5 | ^5.x | current major |
| react-redux | ^7.2.1 | ^9.x | current major, React 19-compatible |
| @reduxjs/toolkit | — | ^2.x | new — replaces hand-written action types/reducers |
| redux-thunk | ^2.3.0 | *removed* | bundled inside RTK's default middleware |
| reselect | ^4.0.0 | *removed* | use RTK's re-exported `createSelector` |
| redux-form | ^8.3.6 | *removed* | unmaintained since 2020 |
| react-hook-form | — | ^7.x | new — replaces redux-form |
| firebase | ^7.21.1 | ^12.x (or latest v12+) | v7 compat API deprecated; move to modular SDK |
| node-sass | ^4.14.1 | *removed* | unmaintained, breaks on modern Node |
| (7 `.module.scss` + 2 global `.scss` files) | — | *removed* | replaced by Tailwind utility classes |
| tailwindcss | — | ^4.x (or latest) | new — replaces Sass/CSS Modules styling |
| postcss, autoprefixer | — | latest | Tailwind's build dependencies |
| react-select | ^3.1.0 | ^5.x | current major |
| material-icons-react | ^1.0.4 | *removed* | abandoned; replace with `react-icons` |
| typescript | ^4.0.3 | ^5.x | current major |
| eslint-config-react-app | ^5.2.1 | *removed* | CRA-specific |
| (new) eslint-config-next | — | latest | official Next.js lint config |
| eslint / typescript-eslint | ^4.x | ^9.x / ^8.x | flat config |
| prettier | 2.1.2 | ^3.x | current major |
| @testing-library/react, jest-dom, user-event | 2019–2020 versions | latest (16.x / 6.x / 14.x) | current + actually used going forward |
| gh-pages | ^3.1.0 | ^6.x | routine bump |
| normalize.css | ^8.0.1 | latest 8.x | routine bump |
| @types/* (node, react, react-dom, react-redux) | old | matched to new majors | routine |
| @types/react-router, @types/react-router-dom, @types/redux-form | present | *removed* | dependencies removed |

Treat the exact patch/minor numbers above as directional — resolve actual `latest` at
implementation time (`npm view <pkg> version`).

---

## Phased implementation order

Phases run in this order, each as its own branch/commit/PR per the *Process & git workflow* section
above — later phases depend on earlier ones having already merged into `feature/modernize-2026`:

**Phase 0 — Safety net before touching anything**
Add minimal smoke tests against the *current* CRA app for the flows that matter most: register,
login, add/edit/delete a contact, toggle status, filter by email/status. This is the only way to
verify "no behavior changed" once Next.js + Firebase modular + RHF migrations land. Use the
existing (currently-unused) `@testing-library/react` setup.

**Phase 1 — Next.js scaffold + tooling**
Set up `next.config` (`output: 'export'`, `basePath`/`assetPrefix: '/Contact-book'` to match the
current GitHub Pages path, `images: { unoptimized: true }` since export mode has no image server).
Bring TypeScript to 5.x with Next's recommended `tsconfig` (`moduleResolution: "bundler"`, JSX
`preserve`). Install and initialize Tailwind CSS (`tailwindcss`, `postcss`, `autoprefixer`), wire
it into `app/globals.css` and `tailwind.config`, and port the tokens in `styles/variables.scss`
(colors, etc.) into the Tailwind theme (`theme.extend.colors`) so the rest of the migration has a
named palette to use instead of hardcoded utility values. Set up ESLint 9 flat config with
`eslint-config-next` + Prettier 3. Migrate `public/` assets. Update `package.json` scripts to
`next dev`/`next build` and point the existing `deploy`/`predeploy` (`gh-pages`) scripts at Next's
`out/` directory instead of CRA's `build/`.

*Implementation notes (discovered during Phase 1, not anticipated above):*
- *`src/pages/` was renamed to `src/views/` — Next.js reserves any directory literally named
  `pages` for its legacy Pages Router, and this repo already had an unrelated `pages/` naming
  convention that collided with it, breaking file discovery for `next dev`/`build`/Jest alike.*
- *Next 16 requires React 18.2+; bumped straight to React 19 (this phase's own version table
  target). That forced three things not originally scoped here, each because Next's own tooling
  (not app code) broke otherwise: `@testing-library/react`/`jest-dom`/`user-event` bumped to
  current majors (RTL v9's `render()` calls `ReactDOM.render`, removed in React 19 — this is
  effectively Phase 8's runner swap, pulled forward); `material-icons-react` swapped for
  `react-icons` (bundles its own nested React 15, which any two-React-copies-in-one-tree check
  rejects on re-render, regardless of React major — effectively pulling forward the one Phase 7
  item this collides with); and `react-scripts`' own test runner was dropped for Jest via
  `next/jest`, since `react-scripts test` crashes outright on Next's required `tsconfig.json`
  shape (not a version mismatch — a real crash in its tsconfig auto-verifier).*
- *`node-sass` swapped for `sass` (dart-sass) — Next's built-in Sass support needs it, and
  node-sass cannot build node-gyp bindings on modern Node regardless.*
- *`app/page.tsx` renders the existing `App` tree via `next/dynamic(..., { ssr: false })`.
  Necessary for two independent reasons: this app has no server-rendering upside to chase (see
  Risks below), and Turbopack (Next 16's default bundler) breaks `store/firebase.js`'s Firebase v7
  compat SDK even in the browser bundle, not just during prerender — `firebase.auth is not a
  function` at runtime. Classic webpack (Next's fully-supported `--webpack` flag) bundles the same
  compat SDK correctly, matching CRA's original webpack-based build. `dev`/`start`/`build` all pass
  `--webpack` accordingly. This may become removable once Phase 2 replaces the compat SDK with the
  modular one — worth a quick check when that phase lands.*
- *Tailwind CSS 4 uses CSS-first configuration (`@theme` in `app/globals.css`), not
  `tailwind.config.js` — v4 dropped `autoprefixer` as a separate dependency too
  (`@tailwindcss/postcss` handles vendor prefixing itself). Only the color tokens were ported this
  phase; `common.scss`/`.module.scss` files are untouched until Phase 6.*

**Phase 2 — Firebase modular SDK (high-risk: auth)**
Rewrite `src/store/firebase.js` from `firebase/app` compat imports to modular
`initializeApp`/`getAuth`/`getFirestore`. Move the hardcoded config into `NEXT_PUBLIC_FIREBASE_*`
env vars (`.env.local`, add `.env.example`, keep `.env.local` gitignored). Update the Firestore
calls in `store/actions/Contacts/actions.ts` (collection/doc/get/add/update patterns) and the Auth
calls in `store/actions/Users/actions.ts` to the modular functional API
(`signInWithEmailAndPassword`, `createUserWithEmailAndPassword`, etc.). Re-run Phase 0's smoke
tests against this change specifically; do a manual login/register check before moving on.

**Phase 3 — Routing**
Replace `routes.tsx` (`Switch`/`Route`/`component=`) with Next App Router files: `app/layout.tsx`
(root layout hosting the Redux `Provider` + `CurrentUserProvider`, marked `'use client'`),
`app/page.tsx` (StartPage), and route segments for Authentication and the logged-in Homepage tree.
Replace `useHistory()` (`pages/Homepage/isLoggedUser/index.tsx`) with `useRouter()` from
`next/navigation`, and `<Redirect>` (`pages/Authentication/index.tsx`) with `router.replace()`/
`redirect()`.

*Implementation notes (discovered during Phase 3, not anticipated above):*
- *`app/layout.tsx` cannot itself be marked `'use client'` — it exports `metadata`/`viewport`,
  which the App Router only allows from a Server Component. Split the responsibility instead: a
  new `app/providers.tsx` (`'use client'`) hosts the Redux `Provider` + `CurrentUserProvider` +
  `TopBar` + `Footer`, and the still-Server-Component `app/layout.tsx` renders
  `<Providers>{children}</Providers>` inside `<body>`. The root layout still "hosts" the providers
  in the sense the plan meant — just one component boundary lower.*
- *Phase 1's `next/dynamic(..., { ssr: false })` wrapper around the whole app (needed because
  Turbopack broke the Firebase v7 **compat** SDK) turned out to be droppable now that Phase 2
  replaced it with the modular SDK — confirmed by actually running `next build --webpack` with no
  `ssr: false` anywhere: it prerendered all four routes (`/`, `/home`, `/login`, `/register`) to
  static HTML with no Firebase-under-Node errors. Each route segment (`app/page.tsx`,
  `app/home/page.tsx`, `app/login/page.tsx`, `app/register/page.tsx`) is a plain `'use client'`
  page rendering its view directly — no dynamic-import indirection needed.*
- *`views/Authentication/index.tsx` and `views/Homepage/isLoggedUser/index.tsx` (and the components
  they render, like `Topbar`) don't carry their own `'use client'` directive — same pattern Phase 1
  used for `App.tsx`/`routes.tsx`. They're only ever reached through the `'use client'` `app/*/page.tsx`
  boundaries, so they're pulled into the client bundle transitively.*
- *`Authentication`'s `isLogin` used to come from matching `match.path` against `/login` at
  render time (one shared route, two paths); now `/login` and `/register` are genuinely separate
  route segments, so `isLogin` is passed in directly as a prop by each `page.tsx` instead.*
- *`next/navigation`'s `useRouter`/`usePathname` aren't available outside a real Next.js request
  context, so component tests need them mocked — added `__mocks__/next/navigation.js` (the same
  root-level manual-mock convention Phase 2 established for `firebase/{app,auth,firestore}` in
  `__mocks__/firebase/`) plus `src/routerTestMocks.ts` (mirrors `store/firebaseTestMocks.ts`) for
  typed `mockPush`/`mockReplace` access in tests.*

**Phase 4 — State management: Redux → RTK**
Bump `redux`/`react-redux`, add `@reduxjs/toolkit`. Convert `store/reducers/{contacts,user}.ts` +
`store/actions/{Contacts,Users}/actions.ts` into `createSlice` + `createAsyncThunk`. Replace
`store/state/index.ts`'s `createStore(reducer, applyMiddleware(thunk))` with `configureStore`.
Delete `store/constants.js` (RTK generates action types). Re-source `selectors/` from
`@reduxjs/toolkit`'s `createSelector` instead of `reselect`, then remove `reselect` and
`redux-thunk` as direct deps.

*Implementation notes (discovered during Phase 4, not anticipated above):*
- *The `createAsyncThunk`/`createSlice` pair for each domain now lives together in
  `store/reducers/{contacts,user}.ts` rather than split across `reducers/` and `actions/` as the
  bullet above literally names — `extraReducers` needs the async thunk's action creators, and
  the thunks need the slice's plain sync action creators, so keeping them in separate files would
  create a `reducers/contacts.ts` ⇄ `store/actions/Contacts/actions.ts` circular import.
  `store/actions/{Contacts,Users}/actions.ts` are now thin `export { ... } from 'store/reducers/...'`
  barrels, so every existing `from 'store/actions/.../actions'` import site (5 components, 2 test
  files) kept working unchanged — only the thunks' call signatures changed (see below).*
- *`selectors/` were **not** switched to `createSelector`: they're plain `state => state.slice`
  pass-throughs with no derived computation, and wrapping a zero-transform selector in
  `createSelector` trips reselect's own dev-mode "identity function" warning — a real anti-pattern
  it exists to catch, not a false positive. They stay the plain functions they already were; the
  actual goal (no direct `reselect` dependency) was already true before this phase; `reselect` is
  fully removed from `package.json` now.*
- *`SendContact`, `deleteContactFromBook`, `changeContactStatus`, `LogIn`, and `SignUp` now take a
  single object argument (`createAsyncThunk` payload creators take one arg) instead of positional
  parameters — updated their 4 call sites (`ContactItem`, `IsLogginedUserPage`, `Authentication`)
  and both `actions.test.ts` files accordingly. `FetchCurrentUserContacts`, `IsLogIn`, `LogOut`,
  `filterContact`, `filterContactsByStatus`, and `changeAuthPage` keep their original signatures
  (subscriptions and no-payload/single-array actions don't need the object-arg treatment).*
- *Added `store/hooks.ts` (`useAppDispatch`/`useAppSelector`) and switched every component off raw
  `useDispatch`/`useSelector`. Needed because `redux-thunk`'s old ambient `Dispatch` type
  augmentation (which let a bare `useDispatch()` accept a thunk without complaint) is gone now that
  nothing imports `redux-thunk` directly — RTK's official TS pattern is exactly this typed-hooks
  pair, so this isn't scope creep, it's what unblocks `tsc --noEmit` staying clean.*
- *`configureStore`'s dev-only `immutableStateInvariantMiddleware` caught a real pre-existing bug:
  `statusToggler` and `selectContact` were mutating the Firestore-sourced contact objects living in
  Redux state directly (`item.visibility = false; return item;`) before dispatching, instead of
  building new objects. Plain `createStore` never checked for this, so it silently worked; RTK
  correctly flags it, and the Phase 0 "filtering contacts by status" smoke test started failing
  because of it. Fixed both handlers to map to new objects (`{ ...item, visibility: ... }`) — same
  resulting values, immutable instead of in-place.*
- *`redux-form@8.3.6`'s `peerDependencies` cap `react-redux` at `^6 || ^7`, predating `react-redux`
  v8/v9's release — a stale constraint on a dependency Phase 5 removes outright. Installed with
  `npm install --legacy-peer-deps` to get past `npm`'s peer-dependency resolution; `react-redux` v9's
  `connect` HOC (what `redux-form` actually uses) is unaffected, confirmed by the AuthForm/ContactForm
  smoke tests and a manual `/login` page load still rendering and submitting correctly.*

**Phase 5 — Forms: redux-form → react-hook-form**
Rewrite `ContactForm/index.tsx` and `AuthForm/index.tsx` off `reduxForm`/`<Field>` onto RHF's
`useForm`/`register`. Convert `Input/index.tsx` from consuming `WrappedFieldProps`
(`input`/`meta.{touched,error,warning}`) to RHF's `register` return + `formState.errors` — it's
already presentational, so this is a props-shape change, not a rewrite. Reuse the existing
framework-agnostic `validate()` in `utils/index.tsx` as a manual validation resolver. Remove the
`form` key from `combineReducers` (Phase 4 will have already replaced `combineReducers` with RTK's
reducer map, so this just means not including it there). Remove `redux-form` and
`@types/redux-form`.

**Phase 6 — Styling: Sass/CSS Modules → Tailwind CSS**
Convert the two global stylesheets and 7 `.module.scss` files (`components/{Footer,Loader,Topbar}`,
`pages/{Authentication,StartPage,Homepage/isLoggedUser,Homepage/isLoggedUser/contactItem}`) one
component at a time: replace each `import styles from './index.module.scss'` +
`className={styles.x}` usage with inline Tailwind utility classes, using the Phase 1 theme tokens
for colors instead of arbitrary values. Delete the `.scss`/`.module.scss` files and `node-sass`/
`sass` deps once nothing imports them. Visually diff each converted component against the current
build before moving to the next (this phase is pure presentation — no behavior should change, but
it's the phase most likely to introduce visual regressions since it touches every component).

*Implementation notes (discovered during Phase 6, not anticipated above):*
- *`styles/common.scss` and `normalize.css` turned out to be silently orphaned since Phase 1:
  `App.tsx`'s import of both was dropped when it was restructured into `app/layout.tsx` +
  `app/providers.tsx`, and nothing re-added it. Confirmed against `master`'s original `App.tsx`.
  This meant every plain-string className from `common.scss` (`.btn`, `.container`, `.form-control`,
  `.input-holder`, etc. — used across `AuthForm`, `ContactForm`, `Footer`, `Topbar`, `StartPage`,
  `Authentication`, and the logged-in Homepage tree) was rendering completely unstyled, and Tailwind's
  own Preflight (`h1`-`h6 { font-size: inherit; font-weight: inherit; }`, active since Phase 1) was
  flattening every heading to body-text size with no compensating override. Restoring this cascade is
  squarely this phase's job ("convert the two global stylesheets"), so it's fixed here rather than
  filed separately: `app/globals.css` now has a `@layer base` restoring the body font/link/heading
  defaults `common.scss` + the browser's own UA stylesheet used to provide, and normalize.css itself
  is dropped outright as a dependency — Tailwind's Preflight already fully supersedes it.*
- *Classes shared across multiple, unrelated components (`.btn`/`.btn-primary`, `.container`, `.row`,
  `.center`, `.page-center`, `.form-styles`, `.form-control`, `.input-holder`,
  `.error-field-message`) are defined once in `app/globals.css` via `@layer components` + `@apply`
  rather than inlined at every call site — JSX keeps `className="btn btn-primary"` unchanged. This
  was a deliberate choice over literal inline utilities: those classes are used at ~15 call sites
  across otherwise-unrelated components (StartPage, AuthForm, ContactForm, Homepage), and duplicating
  a long utility string at each site would violate DRY for no benefit. Component-local classes (the
  actual 7 `.module.scss` files' worth of styling — `contactItem`, `Topbar`'s `.navbar`/`.logo`/
  `.underlineClosing`, etc.) are still converted to literal inline utilities at their single usage
  site, matching the plan's original instruction, since those have exactly one owner.*
- *All numeric values (padding, margins, border-radius, font-size, breakpoints) are ported as
  arbitrary bracket values (e.g. `px-[15px]`, `min-[767px]:`) taken directly from the original SCSS,
  rather than mapped to the "nearest" named Tailwind spacing-scale step — this guarantees pixel-exact
  parity with the pre-migration design instead of introducing small, hard-to-spot drifts. The
  "theme tokens instead of arbitrary values" instruction is read as applying to colors specifically
  (colors do use the Phase 1 `--color-*` tokens throughout, including with opacity modifiers like
  `bg-blue/80` for what was `rgba($blue, 0.8)`).*
- *A handful of classNames in the original code were already fully dead before this phase touched
  them (unreachable regardless of the dropped-import bug above) and were dropped rather than ported:
  `form-label` (never defined in `common.scss`), `.projectInfo` (`Footer`, never defined), and the
  `.contactData i` / `.active i` / `.inActive i` nested rules in `contactItem`'s module.scss (written
  for the `<i>`-tag icon markup `material-icons-react` used to render; Phase 1 already swapped that
  library for `react-icons`' SVG components before this phase started, so those selectors could never
  match). The active/inactive checkbox-icon coloring intent (`rgba(black,0.54)` / white) is restored
  correctly for the current SVG-based icons via `text-black/54` / `text-white` on the button itself
  (SVGs from `react-icons` use `fill="currentColor"`, so this reaches the icon via inheritance the
  same way the old `i { color }` rule did for its target).*
- *Verified via a temporary, uncommitted preview route rendering `contactsList`/`selectContact`/
  `statusToggler` with mock Redux state (not committed) — logging in for real requires Firebase
  credentials outside this session's access. `IsLogginedUserPage` itself couldn't be used for this
  because its `useEffect` fires a real Firestore `onSnapshot` fetch against the fake uid, which
  immediately overwrites any preloaded mock contacts with an empty result.*

**Phase 7 — Remaining dependency bumps**
`react-select` → v5 (verify `onChange`/styling API in `selectContact/index.tsx`, one usage site).
`material-icons-react` → `react-icons` in the 3 usage sites (`Topbar`, `contactItem`, and the
`react-app-env.d.ts` type reference). `normalize.css`, `@types/*` bumps. Remove
`@types/react-router`, `@types/react-router-dom`.

**Phase 8 — Testing modernization**
Bump `@testing-library/*` to current majors. Set up a test runner compatible with Next.js (Jest via
`next/jest`, the officially documented path — avoids introducing a second new tool alongside the
Next.js migration itself). Port Phase 0's baseline tests into the new structure, plus targeted
tests for the Phase 2 (Firebase) and Phase 5 (forms) migrations specifically, since those are the
two behavior-preserving rewrites with the most surface for regressions.

**Phase 9 — Cleanup & deploy verification**
Remove leftover CRA artifacts (`react-app-env.d.ts` if no longer needed, any CRA-only tsconfig
options). Update `README.md`'s tech list. Bump `gh-pages`. Run `next build` (static export) and
verify the `out/` output serves correctly under the `/Contact-book/` basePath. Manually walk every
user flow (register, login, add/edit/delete/filter/toggle-status contact, logout) against the real
static export build — typecheck/lint/tests verify correctness, not feature correctness, so this
manual pass is required before calling the migration done.

---

## Risks

- **Auth behavior drift** (Phase 2): modular Firebase Auth's error-handling/session-persistence
  defaults differ subtly from the v7 compat API — covered by Phase 0 tests + manual validation.
- **App Router client/server boundary**: since virtually everything here is Firebase-client-driven
  and Redux-driven, most components will need `'use client'`. There's no server-rendering upside
  to chase here — don't try to convert data-fetching to Server Components/Server Actions, that
  would be scope creep against "modernize versions," not a requirement of this plan.
- **GitHub Pages basePath**: static export under a non-root path is easy to get subtly wrong
  (asset 404s). Verify with an actual deployed/served `out/` build, not just `next build` succeeding.
- **RTK + react-hook-form landing in the same area** (`ContactForm` dispatches `reset('contactForm')`
  today, which is redux-form-specific): confirm the Phase 4/5 ordering above — RTK lands first so
  Phase 5 has a stable action layer to call into, not the reverse.

## Verification

- `next build` succeeds with no type errors (`tsc --noEmit` clean) after each phase.
- ESLint clean under the new flat config.
- Phase 0 smoke tests (and their Phase 8 successors) pass after every phase that could affect them.
- Manual walkthrough of the full user flow against the real static export build (Phase 9), not just
  `next dev`.
- No remaining references to `react-scripts`, `react-router-dom`, `redux-form`, `node-sass`,
  `material-icons-react`, or the Firebase compat API anywhere in `src/` (`grep -r` clean).

## Progress log

- [x] Phase 0 — Safety net tests (PR #43, merged)
- [x] Phase 1 — Next.js scaffold + tooling (PR #44, merged)
- [x] Phase 2 — Firebase modular SDK (PR #45, merged)
- [x] Phase 3 — Routing (PR #46, merged)
- [x] Phase 4 — State management: Redux → RTK (PR #47, merged)
- [x] Phase 5 — Forms: redux-form → react-hook-form (PR #48, merged)
- [ ] Phase 6 — Styling: Sass/CSS Modules → Tailwind CSS (open — awaiting review/approval)
- [ ] Phase 7 — Remaining dependency bumps
- [ ] Phase 8 — Testing modernization
- [ ] Phase 9 — Cleanup & deploy verification
