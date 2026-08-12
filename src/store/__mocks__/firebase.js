// Manual Jest mock for store/firebase.js (Firebase v7 compat API).
// Activate per test file with `jest.mock('store/firebase')`, then call
// `resetFirebaseMock()` in `beforeEach` — CRA's Jest config runs with
// `resetMocks: true`, which wipes every jest.fn()'s return-value wiring
// (including this chain's intermediate .collection()/.doc() links) before
// each test, so the chain must be rebuilt every time rather than once here.

export const mockSignInWithEmailAndPassword = jest.fn();
export const mockCreateUserWithEmailAndPassword = jest.fn();
export const mockSignOut = jest.fn();
export const mockOnAuthStateChanged = jest.fn();

export const mockOnSnapshot = jest.fn();
export const mockAdd = jest.fn();
export const mockDelete = jest.fn();
export const mockUpdate = jest.fn();

const contactDocRef = {
  delete: mockDelete,
  update: mockUpdate,
};

const contactsCollectionRef = {
  onSnapshot: mockOnSnapshot,
  add: mockAdd,
  doc: jest.fn(),
};

const userDocRef = {
  collection: jest.fn(),
};

const usersCollectionRef = {
  doc: jest.fn(),
};

const authInstance = {
  signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
  createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword,
  signOut: mockSignOut,
  onAuthStateChanged: mockOnAuthStateChanged,
};

const firestoreInstance = {
  collection: jest.fn(),
};

const firebase = {
  auth: jest.fn(),
  firestore: jest.fn(),
};

export const resetFirebaseMock = () => {
  contactsCollectionRef.doc.mockReturnValue(contactDocRef);
  userDocRef.collection.mockReturnValue(contactsCollectionRef);
  usersCollectionRef.doc.mockReturnValue(userDocRef);
  firestoreInstance.collection.mockReturnValue(usersCollectionRef);
  firebase.auth.mockReturnValue(authInstance);
  firebase.firestore.mockReturnValue(firestoreInstance);
};

resetFirebaseMock();

export default firebase;
