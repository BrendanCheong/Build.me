const colors = require('tailwindcss/colors')
const scrollbar = require('tailwind-scrollbar');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins'],
        roboto:['Roboto'],
        nunitoSans:['Nunito+Sans']
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      black: colors.black,
      gray: colors.gray,
      red: colors.red,
      yellow:colors.yellow,
      green:colors.green,
      blue: colors.blue,
      indigo: colors.indigo,
      purple:colors.purple,
      blueGray:colors.blueGray,
      coolGray:colors.coolGray,
      trueGray:colors.trueGray,
      warmGray:colors.warmGray,
      lime:colors.lime,
      teal:colors.teal,
    },
  }, 
  plugins: [
    scrollbar
  ],
  variants: {
    scrollbar:['rounded', 'dark'],
    fill: ['hover', 'focus'],
  },
}
