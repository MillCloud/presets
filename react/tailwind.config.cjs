const basePreset = require('@modyqyw/tailwind-presets/base').default;
const getAntDesignPreset = require('@modyqyw/tailwind-presets/ant-design').default;
const tailwindcssTypography = require('@tailwindcss/typography');
const tailwindcssLineClamp = require('@tailwindcss/line-clamp');
const tailwindcssAspectRatio = require('@tailwindcss/aspect-ratio');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  presets: [basePreset, getAntDesignPreset()],
  plugins: [tailwindcssTypography, tailwindcssLineClamp, tailwindcssAspectRatio],
};
