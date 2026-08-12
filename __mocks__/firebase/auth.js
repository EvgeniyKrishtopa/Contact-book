// Manual Jest mock for the 'firebase/auth' subpath, applied automatically to
// every test (Jest convention for node_modules mocks under <rootDir>/__mocks__).
// store/firebaseTestMocks.ts re-exports these as the mockXxx helpers that
// action/component tests configure per test.
export const getAuth = jest.fn(() => ({}));
export const signInWithEmailAndPassword = jest.fn();
export const createUserWithEmailAndPassword = jest.fn();
export const signOut = jest.fn();
export const onAuthStateChanged = jest.fn();
export const updateProfile = jest.fn();
