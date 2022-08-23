const { base, elementPlus } = require('@modyqyw/tailwind-presets');
const typography = require('@tailwindcss/typography');
const lineClamp = require('@tailwindcss/line-clamp');
const aspectRatio = require('@tailwindcss/aspect-ratio');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  presets: [base, elementPlus()],
  plugins: [typography, lineClamp, aspectRatio],
};
