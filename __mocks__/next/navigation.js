// Manual Jest mock for 'next/navigation', applied automatically to every
// test (Jest convention for node_modules mocks under <rootDir>/__mocks__).
// routerTestMocks.ts re-exports push/replace as the mockPush/mockReplace
// helpers that component tests assert against.
const push = jest.fn();
const replace = jest.fn();

export const useRouter = jest.fn(() => ({ push, replace }));
export const usePathname = jest.fn(() => '/');
