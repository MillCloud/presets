module.exports = {
  "*.md": "markdownlint --fix",
  "*.{css,less,scss,sass}": "stylelint --fix",
  "*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}": "eslint --fix",
};
