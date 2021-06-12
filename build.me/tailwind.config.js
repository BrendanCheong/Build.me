const colors = require('tailwindcss/colors')

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
      pink:colors.pink,
      blueGray:colors.blueGray,
      coolGray:colors.coolGray,
      trueGray:colors.trueGray,
      warmGray:colors.warmGray,
      lime:colors.lime,
      emerald:colors.emerald,
      teal:colors.teal,
      orange:colors.orange,
      amber:colors.amber,
    },
  }, 
  plugins: [
    require('tailwind-scrollbar')
  ],
  variants: {
    scrollbar:['rounded', 'dark']
  },
}
