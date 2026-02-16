/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f4ff",
          100: "#dbe4ff",
          200: "#bac8ff",
          300: "#91a7ff",
          400: "#748ffc",
          500: "#4c6ef5",
          600: "#3b5bdb",
          700: "#364fc7",
          800: "#2b3ea0",
          900: "#1b2559",
        },
        surface: {
          light: "#ffffff",
          dark: "#1a1a2e",
        },
        muted: {
          light: "#f1f3f5",
          dark: "#2d2d44",
        },
        stage: {
          new: "#4dabf7",
          responded: "#ffd43b",
          negotiating: "#ff922b",
          booked: "#51cf66",
          declined: "#ff6b6b",
        },
      },
    },
  },
  plugins: [],
};
