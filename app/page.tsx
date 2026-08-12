'use client';

import dynamic from 'next/dynamic';

// Renders the existing HashRouter/Redux app tree unchanged. Next.js App
// Router only owns the shell (layout.tsx) at this phase; routes.tsx keeps
// doing its own client-side routing until Phase 3 replaces it with real
// App Router route segments.
//
// ssr: false: this app has no server-rendering upside to chase (see
// MODERNIZATION_PLAN.md's Risks section) and store/firebase.js's Firebase
// v7 namespaced/compat SDK has no business running in Next's Node-based
// prerender pass. (Separately, Turbopack breaks that same compat SDK even
// client-side -- see the "build"/"dev" scripts' --webpack flag in
// package.json. Moving to the modular SDK is still Phase 2's job, since it
// touches auth and needs its own scrutiny; the --webpack flag is what
// actually unblocks this phase.)
const App = dynamic(() => import('App'), { ssr: false });

const Page = () => <App />;

export default Page;
