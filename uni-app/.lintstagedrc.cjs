module.exports = {
  'package.json': 'sort-package-json',
  '*.md': 'markdownlint --fix --ignore-path=.gitignore',
  '*.{css,scss,vue}': 'stylelint --fix --cache --ignore-path=.gitignore',
  '*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,vue}': 'eslint --fix --cache --ignore-path=.gitignore',
  '*.{ts,cts,mts,tsx,vue}': () => 'vue-tsc -p tsconfig.json --noEmit'
};
