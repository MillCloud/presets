module.exports = {
  '*.md': 'markdownlint --fix',
  '*.{css,less,scss,sass,vue}':
    'stylelint --fix --cache --allow-empty-input --ignore-path=.gitignore',
  '*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,vue}':
    'eslint --fix --cache --no-error-on-unmatched-pattern --ignore-path=.gitignore',
};
