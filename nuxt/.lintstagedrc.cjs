module.exports = {
  '*.md': 'markdownlint --fix',
  '*.{css,less,scss,sass,vue}': 'stylelint --fix',
  '*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,vue}': 'eslint --fix',
};
