const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ["stilson", ...defaultTheme.fontFamily.serif],
        display: ["stilson-display-condensed", ...defaultTheme.fontFamily.serif],
      },
      transitionTimingFunction: {
        'out-quint': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'in-quint': 'cubic-bezier(0.64, 0, 0.78, 0)'
      }
    },
  },
  plugins: [
    require('@headlessui/tailwindcss')
  ],
}

