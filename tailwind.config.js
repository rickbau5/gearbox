/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: '#111827',
        orange: '#F97316',
        'light-blue': "#B5BBC7",
        white: '#F8FAFC'
      }
    },
  },
  plugins: [],
}
