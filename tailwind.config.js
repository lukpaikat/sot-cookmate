/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "josefin-sans": ["Josefin Sans", ...defaultTheme.fontFamily.sans],
        "syne-mono": ["Syne Mono", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};
