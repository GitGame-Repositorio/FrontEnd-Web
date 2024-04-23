/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FFFDEA",
          100: "#FFF6C5",
          600: "#E28000",
          800: "#984408",
          900: "#7C380B",
          950: "#481C00"
        },
        white: "#FFFFFF"
      },
      transitionProperty: {
        'modal': 'opacity',
      }
    },
  },
  plugins: [],
}

