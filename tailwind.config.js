/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        earth: {
          50:  '#f2f9f0',
          100: '#e0f2da',
          200: '#c2e5b9',
          300: '#96cf8d',
          400: '#64b35a',
          500: '#429638',
          600: '#31782a',
          700: '#285f23',
          800: '#234d1f',
          900: '#1e401b',
          950: '#0d230d',
        },
        honey: {
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}

