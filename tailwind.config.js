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
        primary: "#C39A6A",
        secondary: "#2D3748",
        background: "#F7F8FA",
        card: "#FFFFFF",
        // Dark mode surface colors
        dark: {
          bg: "#0F1117",
          surface: "#1A1D27",
          card: "#222633",
          border: "#2E3344",
          text: "#E4E6EF",
          muted: "#9CA3B4",
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
