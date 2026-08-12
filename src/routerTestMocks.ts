// Typed access to the mocked 'next/navigation' module (auto-mocked for every
// test via __mocks__/next/navigation.js at the repo root — see
// https://jestjs.io/docs/manual-mocks#mocking-node-modules).
// Component tests import these mockPush/mockReplace helpers instead of
// reaching into next/navigation's useRouter() return value directly.
import { useRouter } from 'next/navigation';

// Not a real hook call: useRouter() is mocked to jest.fn(() => ({ push, replace }))
// and always returns the same push/replace references, so calling it here once
// just gives tests a stable handle on those references outside of a component.
// eslint-disable-next-line react-hooks/rules-of-hooks
const { push, replace } = useRouter();

export const mockPush = push as jest.Mock;
export const mockReplace = replace as jest.Mock;
