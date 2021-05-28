module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins']
      },
    },
  },
  variants: {
    extend: {},
  }, 
  plugins: [
    require('tailwind-scrollbar')
  ],
  variants: {
    scrollbar:['rounded', 'dark']
  },
}
