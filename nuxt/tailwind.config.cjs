const { basePreset, elementPlusPreset } = require('tailwind-extensions');
const { iconsPlugin: icons, getIconCollections } = require('@egoist/tailwindcss-icons');
const typography = require('@tailwindcss/typography');
const lineClamp = require('@tailwindcss/line-clamp');

module.exports = {
  content: [
    `{components,layouts,pages,styles}/**/*.{vue,js,jsx,ts,tsx}`,
    `[Aa]pp.{vue,js,jsx,ts,tsx}`,
    `[Ee]rror.{vue,js,jsx,ts,tsx}`,
  ],
  presets: [basePreset, elementPlusPreset()],
  plugins: [typography, lineClamp, icons({ collections: getIconCollections('all') })],
};
