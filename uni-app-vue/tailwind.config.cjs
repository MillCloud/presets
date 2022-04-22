const color = require('color');
const tailwindcssTypography = require('@tailwindcss/typography');
const tailwindcssLineClamp = require('@tailwindcss/line-clamp');
const tailwindcssAspectRatio = require('@tailwindcss/aspect-ratio');

// Remember to update colors in ./src/styles/variables.scss
// https://element-plus.gitee.io/zh-CN/component/color.html
const colorMap = {
  primary: {
    base: '#409eff',
    DEFAULT: '#409eff',
  },
  success: {
    base: '#67c23a',
    DEFAULT: '#67c23a',
  },
  warning: {
    base: '#e6a23c',
    DEFAULT: '#e6a23c',
  },
  danger: {
    base: '#f56c6c',
    DEFAULT: '#f56c6c',
  },
  info: {
    base: '#909399',
    DEFAULT: '#909399',
  },
  'primary-text': '#303133',
  'regular-text': '#606266',
  'secondary-text': '#909399',
  'placeholder-text': '#a8abb2',
  border: '#dcdfe6',
  'base-border': '#dcdfe6',
  'light-border': '#e4e7ed',
  'lighter-border': '#ebeef5',
  'extra-light-border': '#f2f6fc',
};
const types = ['primary', 'success', 'warning', 'danger', 'info'];
for (const type of types) {
  for (let i = 1; i <= 9; i += 1) {
    colorMap[type][`lighten-${i}`] = color(colorMap[type].base)
      .mix(color('white'), i / 10)
      .hex();
    colorMap[type][`darken-${i}`] = color(colorMap[type].base)
      .mix(color('black'), i / 10)
      .hex();
  }
}

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1600px',
        xxl: '1600px',
      },
      colors: {
        ...Object.fromEntries(Object.entries(colorMap).map(([key, value]) => [key, value])),
      },
      boxShadow: {
        base: '0px 12px 32px 4px rgba(0, 0, 0, 0.04), 0px 8px 20px rgba(0, 0, 0, 0.08),',
        light: '0px 0px 12px rgba(0, 0, 0, 0.12)',
        lighter: '0px 0px 6px rgba(0, 0, 0, 0.12)',
        dark: '0px 16px 48px 16px rgba(0, 0, 0, 0.08), 0px 12px 32px rgba(0, 0, 0, 0.12), 0px 8px 16px -8px rgba(0, 0, 0, 0.16),',
      },
    },
  },
  plugins: [tailwindcssTypography, tailwindcssLineClamp, tailwindcssAspectRatio],
  corePlugins: {
    preflight: false,
  },
};
