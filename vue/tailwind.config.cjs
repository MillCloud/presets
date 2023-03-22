const { basePreset, elementPlusPreset } = require('tailwind-extensions');
const { iconsPlugin: icons, getIconCollections } = require('@egoist/tailwindcss-icons');
const typography = require('@tailwindcss/typography');
const lineClamp = require('@tailwindcss/line-clamp');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  presets: [basePreset, elementPlusPreset()],
  plugins: [typography, lineClamp, icons({ collections: getIconCollections('all') })],
};
