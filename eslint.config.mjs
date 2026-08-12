import { defineConfig, globalIgnores } from 'eslint/config';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

const eslintConfig = defineConfig([
  ...nextCoreWebVitals,
  ...nextTypescript,
  prettier,
  {
    rules: {
      // Matches the project's established tolerance for the existing
      // pre-modernization codebase; not a statement on new code.
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      // Flags the existing context/props-into-local-state useEffect pattern
      // used throughout src/views/** (Authentication, Homepage, StartPage).
      // A real fix means changing component behavior, out of scope for a
      // scaffold/tooling phase -- a legitimate cleanup opportunity for
      // whichever later phase actually touches these components.
      'react-hooks/set-state-in-effect': 'off',
      // statusToggler's filter links are plain `<a href="/" onClick={...
      // preventDefault}>` styled as anchors, not real navigation; swapping
      // the element out risks breaking its .module.scss `a` selectors
      // ahead of Phase 6's styling pass.
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
  {
    // Root-level tooling config files: plain CommonJS on purpose, matching
    // Next.js's own documented next.config.js/jest.config.js patterns.
    files: ['*.config.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: ['**/*.test.{ts,tsx}'],
    languageOptions: {
      globals: {
        jest: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
      },
    },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'coverage/**',
  ]),
]);

export default eslintConfig;
