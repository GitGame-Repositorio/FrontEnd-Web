/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
    },
    boxShadow: {
      common: "8px 8px 32px rgba(114, 114, 114, 0.1)",
    },
  },
  plugins: [],
};
