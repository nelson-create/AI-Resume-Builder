/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: '#ff8c00',     // Dark orange
          magenta: '#ff4500',  // Red-orange
          pink: '#ff6b35',     // Bright orange
          lime: '#ffa500',     // Orange
          orange: '#ff6600',   // Orange
          purple: '#ff8c00',   // Dark orange
          'cyan-dark': '#cc5500',
          'magenta-dark': '#e63900',
          'pink-dark': '#ff4500',
        }
      }
    },
  },
  plugins: [],
}
