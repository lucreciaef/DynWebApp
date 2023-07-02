/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './views/*.html',
    './index.js',
    './routes/*.js'],
  theme: {
    'sans':['Helvetica','Arial', defaultTheme.fontFamily.sans],
    extend: {},
  },
  plugins: [],
}

