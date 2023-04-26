module.exports = {
  'package.json': 'sort-package-json',
  '*.md': 'markdownlint --fix --ignore-path=.gitignore',
  '*.{js,cjs,mjs,ts,cts,mts}': 'eslint --fix --cache --ignore-path=.gitignore',
  '*.{ts,cts,mts,tsx}': () => 'tsc -p tsconfig.json --noEmit'
};
