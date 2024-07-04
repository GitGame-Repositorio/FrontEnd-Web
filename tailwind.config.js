import { transform } from "typescript";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: "Space-Grotesk, sans-serif",
        secondary: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
      },
      spacing: {
        15: "3.75rem",
        18: "4.5rem",
        50: "12.5rem",
        128: "32rem",
      },
      fontSize: {
        "2.5xl": ["1.6875rem", "2.125rem"],
      },
      borderWidth: {
        '3': '3px'
      },
      colors: {
        primary: {
          DEFAULT: "#FFFDEA",
          50: "#fffdea",
          100: "#fff6c5",
          200: "#ffed85",
          300: "#ffde46",
          400: "#ffcb1b",
          500: "#f7a400",
          600: "#e28000",
          700: "#bb5902",
          800: "#984408",
          900: "#7c380b",
          950: "#481c00",
        },
        tertiary: "#EF233C",
      },
      transitionProperty: {
        modal: "opacity",
      },
      keyframes: {
        sliderRight: {
          "0%": { transform: "translate(50%)" },
          "100%": { transform: "translate(0)" },
        },
        opacity: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "slider-right": "sliderRight .65s ease-in",
        opacity: "opacity .65s ease-in",
        message: "sliderRight .75s ease-in, opacity .75s ease-in",
      },
    },
    boxShadow: {
      common: "8px 8px 32px rgba(114, 114, 114, 0.1)",
    },
  },
  plugins: [],
};
