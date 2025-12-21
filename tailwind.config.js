/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        aqi: {
          good: '#22c55e', // green-500
          moderate: '#eab308', // yellow-500
          poor: '#ef4444', // red-500
        }
      },
      keyframes: {
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      },
      animation: {
        'zoom-in': 'zoomIn 0.5s ease-out forwards',
      }
    },
  },
  plugins: [],
}
