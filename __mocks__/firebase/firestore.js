// Manual Jest mock for the 'firebase/firestore' subpath, applied automatically
// to every test (Jest convention for node_modules mocks under <rootDir>/__mocks__).
// store/firebaseTestMocks.ts re-exports these as the mockXxx helpers that
// action/component tests configure per test.
export const getFirestore = jest.fn(() => ({}));
export const collection = jest.fn(() => ({}));
export const doc = jest.fn(() => ({}));
export const onSnapshot = jest.fn();
export const addDoc = jest.fn();
export const deleteDoc = jest.fn();
export const updateDoc = jest.fn();
