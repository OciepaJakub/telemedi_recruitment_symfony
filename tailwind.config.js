/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './assets/js/**/*.{js,ts,jsx,tsx,mdx}',
    "./templates/**/*.html.twig", 
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0056B3',
          light: '#4C8CD4',
          dark: '#003A7A',
        },
        accent: {
          DEFAULT: '#1ABC9C',
          light: '#48D1B6',
          dark: '#0E8F72',
        },
        secondary: {
          DEFAULT: '#7F8C8D',
          light: '#B2BABB',
          dark: '#566A6B',
        },
        background: {
          DEFAULT: '#F4F6F8',
        },
        warning: {
          DEFAULT: '#E74C3C',
        },
        success: {
          DEFAULT: '#27AE60',
        },
      }
    },
  },
  plugins: [],
}

