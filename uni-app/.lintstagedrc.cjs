module.exports = {
  '*.md': 'markdownlint --fix',
  '*.{css,less,scss,sass,vue,svelte}': 'stylelint --fix',
  '*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,vue,svelte,yaml,yml,json,jsonc,json5}': 'eslint --fix',
};
