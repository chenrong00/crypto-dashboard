/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        white: "white",
        none: "none",
      },
      borderWidth: {
        1: "1px",
      },
    },
    fontFamily: {
      quicksand: ["Quicksand", "sans-serif"],
    },
    // Create 7 or 8 equally-sized rows, tailwind css only goes up to 6
    gridTemplateRows: {
      7: "repeat(7, minmax(0,1fr))",
      8: "repeat(8, minmax(0,1fr))",
    },
  },
  plugins: [],
};
