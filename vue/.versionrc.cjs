module.exports = {
  scripts: {
    prerelease: "conc \"pnpm:lint\" \"pnpm:check:types\" \"pnpm:test:unit\"",
    posttag: "git push --follow-tags"
  },
};
