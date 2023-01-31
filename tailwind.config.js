const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          base: 'var(--primary-base)',
          light: 'var(--primary-light)',
          dark: 'var(--primary-dark)',
        },
        theme: {
          primary: 'var(--theme-primary)',
          secondary: 'var(--theme-secondary)',
        },
        gray: {
          primary: 'var(--gray-primary)',
          secondary: 'var(--gray-secondary)',
          light: 'var(--gray-light)',
        },
        'black-light': 'var(--black-light)',
        'error-color': '#f16262',
      },
      fontFamily: {
        sans: ['var(--font-roboto)', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/typography')],
};
