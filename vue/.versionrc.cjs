module.exports = {
  scripts: {
    prerelease: "conc \"pnpm:lint\" \"pnpm:check:types\" \"pnpm:test\"",
    posttag: "git push --follow-tags"
  },
};
