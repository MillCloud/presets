const basePreset = require('@modyqyw/tailwind-presets/base').default;
const miniprogramPreset = require('@modyqyw/tailwind-presets/miniprogram').default;
const tailwindcssTypography = require('@tailwindcss/typography');
const tailwindcssLineClamp = require('@tailwindcss/line-clamp');
const tailwindcssAspectRatio = require('@tailwindcss/aspect-ratio');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  presets: [basePreset, miniprogramPreset],
  plugins: [tailwindcssTypography, tailwindcssLineClamp, tailwindcssAspectRatio],
};
