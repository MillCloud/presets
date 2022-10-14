const { basePreset, elementPlusPreset } = require('tailwind-extensions');
const typography = require('@tailwindcss/typography');
const lineClamp = require('@tailwindcss/line-clamp');
const aspectRatio = require('@tailwindcss/aspect-ratio');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  presets: [basePreset, elementPlusPreset()],
  plugins: [typography, lineClamp, aspectRatio],
};
