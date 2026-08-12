// Manual Jest mock for the 'firebase/app' subpath, applied automatically to
// every test (Jest convention for node_modules mocks under <rootDir>/__mocks__).
// Keeps initializeApp() a no-op in tests instead of running the real SDK
// against the empty config test runs see (no NEXT_PUBLIC_FIREBASE_* env vars).
export const initializeApp = jest.fn(() => ({}));
