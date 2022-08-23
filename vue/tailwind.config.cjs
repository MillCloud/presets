const { base, elementPlus } = require('@modyqyw/tailwind-presets');
const tailwindcssTypography = require('@tailwindcss/typography');
const tailwindcssLineClamp = require('@tailwindcss/line-clamp');
const tailwindcssAspectRatio = require('@tailwindcss/aspect-ratio');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  presets: [base, elementPlus()],
  plugins: [tailwindcssTypography, tailwindcssLineClamp, tailwindcssAspectRatio],
};
