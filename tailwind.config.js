/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        // Defines 'font-bebas'
        bebas: ['"Bebas Neue"', 'sans-serif'], 
        // Defines 'font-poppins'
        poppins: ['Poppins', 'sans-serif'],
        // Defines 'font-sourceSerif'
        sourceSerif: ['"Source Serif"', 'serif'],
      },
      colors: {
        primary: "#1C1D1D",
        secondary: "#5C553A",
        blackSoft: "#231F20",
        grayMedium: "#707070",
        grayLight: "#DDD6D7",
      }
    },
  },
  plugins: [],
};
