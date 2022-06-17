module.exports = {
  git: {
    commitMessage: 'chore(release): v${version}',
    tagName: 'v${version}',
  },
  npm: {
    publish: false,
  },
  plugins: {
    '@release-it/conventional-changelog': {
      header: '# CHANGELOG',
      preset: 'conventionalcommits',
    },
  },
  hooks: {
    'before:init': 'npm install && npm run lint',
    'after:bump': 'tsx ./scripts/update-manifest.mjs',
  },
};
