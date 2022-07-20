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
      preset: 'conventionalcommits',
      infile: 'CHANGELOG.md',
      header: '# Changelog',
    },
  },
  hooks: {
    'before:init': 'npm install && npm run lint',
    'after:bump': 'tsx ./scripts/update-manifest.ts',
  },
};
