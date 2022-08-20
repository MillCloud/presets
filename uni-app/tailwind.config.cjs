const basePreset = require('@modyqyw/tailwind-presets/base').default;
const getElementPlusPreset = require('@modyqyw/tailwind-presets/element-plus').default;
const miniprogramPreset = require('@modyqyw/tailwind-presets/miniprogram').default;
const tailwindcssTypography = require('@tailwindcss/typography');
const tailwindcssLineClamp = require('@tailwindcss/line-clamp');
const tailwindcssAspectRatio = require('@tailwindcss/aspect-ratio');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  presets: [basePreset, getElementPlusPreset(), miniprogramPreset],
  theme: {
    screens: {},
  },
  plugins: [tailwindcssTypography, tailwindcssLineClamp, tailwindcssAspectRatio],
};
