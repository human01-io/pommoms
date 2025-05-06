module.exports = {
    extends: 'next/core-web-vitals',
    rules: {
      // Disable the unused vars rule or modify it to allow variables prefixed with _
      '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }]
    }
  };