/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          base: '#EF516D',
          dark: '#B5263F',
        },
        gray: {
          light: '#C4C4C4',
          medium: '#616161',
        },
      },
      fontFamily: {
        sans: ['var(--font-roboto)'],
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
