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
    'before:init': 'pnpm install && pnpm run lint',
  },
};
