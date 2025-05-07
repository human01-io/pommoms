// tailwind.config.js

/** @type {import('tailwindcss').Config} */ // Optional: JSDoc for better VSCode IntelliSense
const config = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './styles/utils.ts', // Keep this path as it's for scanning TypeScript files too
    ],
    theme: {
      extend: {
        colors: {
          'pom-bg': {
            DEFAULT: '#0B0F19',
            secondary: '#111827',
            tertiary: '#1E293B',
          },
          'pom-accent': {
            light: '#7DD3FC',
            DEFAULT: '#60A5FA',
            dark: '#334155',
          },
          'pom-border': {
            DEFAULT: '#1E2533',
            dark: '#334155',
          },
          'pom-text': {
            DEFAULT: '#FFFFFF',
            secondary: '#94A3B8',
            muted: '#64748B',
          },
        },
        boxShadow: {
          'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
        },
        backgroundImage: {
          'navbar-gradient': 'linear-gradient(to right, #0B0F19, #111B2D, #0F172A)',
          'hero-gradient': 'linear-gradient(to bottom right, #0B0F19, #0F172A)',
          'title-gradient': 'linear-gradient(to right, #A5B4FC, #60A5FA, #38BDF8)',
          'feature-gradient': 'linear-gradient(to right, #8AA0FF, #5A6DFB, #00C6FF)',
        },
      },
    },
    plugins: [],
  };
  
  module.exports = config;