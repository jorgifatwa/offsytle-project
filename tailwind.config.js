/** @type {import('tailwindcss').Config} */
const { DEFAULT_RUNTIME_WEBPACK } = require('next/dist/shared/lib/constants')
const defaultTheme = require('tailwindcss/defaultConfig')
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  important: true,
  theme: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: '',
      white: '#FFFFFF',
      text: {
        DEFAULT: '#3881F6',
        light: '#6C7281',
      },
      light: {
        DEFAULT: '#FAFBFC',
        lighter: '#F3F4F6'
      }
    },
    extend: {},
  },
  plugins: [],
}