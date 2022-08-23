const {
  base,
  elementPlus,
  miniprogramBase,
  miniprogramScreens,
} = require('@modyqyw/tailwind-presets');
const typography = require('@tailwindcss/typography');
const lineClamp = require('@tailwindcss/line-clamp');
const aspectRatio = require('@tailwindcss/aspect-ratio');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  presets: [base, elementPlus(), miniprogramBase, miniprogramScreens],
  plugins: [typography, lineClamp, aspectRatio],
};
