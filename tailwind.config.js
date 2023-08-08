/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
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

