/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
  content: ['./src/**/*.vue'],
  theme: {
    extend: {
      colors: {
        primary: colors.green['500'],
        secondary: colors.orange['500'],
      },
    },
  },
  plugins: [],
};
