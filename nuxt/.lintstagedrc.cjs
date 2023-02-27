module.exports = {
  '*.md': 'markdownlint --fix',
  '*.{css,scss,vue}': 'stylelint --fix --cache --ignore-path=.gitignore',
  '*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,vue}': 'eslint --fix --cache',
};
