// Typed access to the mocked 'firebase/auth' / 'firebase/firestore' modules
// (auto-mocked for every test via __mocks__/firebase/{auth,firestore}.js at
// the repo root — see https://jestjs.io/docs/manual-mocks#mocking-node-modules).
// Action/component tests import these mockXxx helpers instead of reaching
// into 'firebase/auth'/'firebase/firestore' directly at each call site.
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { onSnapshot, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';

export const mockSignInWithEmailAndPassword = signInWithEmailAndPassword as jest.Mock;
export const mockCreateUserWithEmailAndPassword = createUserWithEmailAndPassword as jest.Mock;
export const mockSignOut = signOut as jest.Mock;
export const mockOnAuthStateChanged = onAuthStateChanged as jest.Mock;
export const mockUpdateProfile = updateProfile as jest.Mock;

export const mockOnSnapshot = onSnapshot as jest.Mock;
export const mockAdd = addDoc as jest.Mock;
export const mockDelete = deleteDoc as jest.Mock;
export const mockUpdate = updateDoc as jest.Mock;
