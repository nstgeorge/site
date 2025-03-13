/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Amelie Fierce"', "ui-serif", "Georgia", "Cambria", "serif"],
        serif: [
          '"thermal-variable"',
          "ui-serif",
          "Georgia",
          "Cambria",
          "serif",
        ],
        "sans-serif": [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        mono: ['"cartograph-cf"', "monospace"],
      },
      fontSize: {
        xxs: "0.7rem",
        xxxs: "0.5rem"
      },
    },
  },
  plugins: [],
};
