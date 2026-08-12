// Typed access to store/__mocks__/firebase.js's mock helpers.
//
// TypeScript resolves `import ... from 'store/firebase'` against the real
// module (only a default export), so it can't see the extra named exports
// the manual mock adds. Jest, on the other hand, only swaps in the manual
// mock for a module path once `jest.mock('store/firebase')` has run in the
// current test file — importing straight from '__mocks__/firebase' would
// load a second, disconnected module instance instead. Casting the
// namespace import to the mock's own type gets both right: correct runtime
// wiring, no `as any` at every call site.
import * as firebaseNs from 'store/firebase';

const mocks = (firebaseNs as unknown) as typeof import('./__mocks__/firebase');

export const {
  mockSignInWithEmailAndPassword,
  mockCreateUserWithEmailAndPassword,
  mockSignOut,
  mockOnAuthStateChanged,
  mockOnSnapshot,
  mockAdd,
  mockDelete,
  mockUpdate,
  resetFirebaseMock,
} = mocks;
