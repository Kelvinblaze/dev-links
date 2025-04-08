/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: "#633CFF",
          hover: "#BEADFF",
        },
        "light-purple": "#EFEBFF",
        "dark-gray": "#333333",
        grey: "#737373",
        "light-grey": "#FAFAFA",
        borders: "#D9D9D9",
        red: "#FF3939",
      },
      fontFamily: {
        sans: ['"Instrument Sans"', "sans-serif"],
      },
      borderRadius: {
        pill: "9999px",
      },
      boxShadow: {
        glow: "0 0px 24px #633cff40",
      },
    },
  },
  plugins: [],
};
