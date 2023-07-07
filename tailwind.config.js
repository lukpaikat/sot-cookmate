/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "horizontal-pulse": {
          "0%": {
            opacity: "0",
            transform: "scaleY(0)",
            transformOrigin: "center",
          },
          "50%": {
            opacity: "1",
            transform: "scaleY(1)",
          },
          "100%": {
            opacity: "0",
            transform: "scaleY(0)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "horizontal-pulse": "horizontal-pulse 0.5s ease-in-out infinite",
      },
      fontFamily: {
        "josefin-sans": ["Josefin Sans", ...defaultTheme.fontFamily.sans],
        "syne-mono": ["Syne Mono", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
