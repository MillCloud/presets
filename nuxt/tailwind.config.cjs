const { basePreset, elementPlusPreset } = require('tailwind-extensions');
const { iconsPlugin: icons, getIconCollections } = require('@egoist/tailwindcss-icons');
const typography = require('@tailwindcss/typography');
const lineClamp = require('@tailwindcss/line-clamp');

module.exports = {
  content: [
    `components/**/*.{vue,js,jsx,ts,tsx}`,
    `layouts/**/*.{vue,js,jsx,ts,tsx}`,
    `pages/**/*.{vue,js,jsx,ts,tsx}`,
    `composables/**/*.{js,ts}`,
    `App.{vue,js,jsx,ts,tsx}`,
    `app.{vue,js,jsx,ts,tsx}`,
    `Error.{vue,js,jsx,ts,tsx}`,
    `error.{vue,js,jsx,ts,tsx}`,
  ],
  presets: [basePreset, elementPlusPreset()],
  plugins: [typography, lineClamp, icons({ collections: getIconCollections('all') })],
};
