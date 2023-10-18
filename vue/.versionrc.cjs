module.exports = {
  scripts: {
    prerelease: "pnpm install && conc \"pnpm:lint\" \"pnpm:check:types\" \"pnpm:test:unit\"",
    posttag: "git push --follow-tags"
  },
};
