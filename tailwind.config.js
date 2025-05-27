// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'home-primary': '#4caf50', // Matches MUI home theme
        'filter-primary': '#0288d1', // Matches MUI filter theme
      },
      maxHeight: {
        'fit': 'fit-content',
      }
    },
  },
  plugins: [],
}
