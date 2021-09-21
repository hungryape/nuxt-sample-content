module.exports = {
  purge: {
    content: ['./src/**/*.vue'],
    safelist: [
      /^col-span-/
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
