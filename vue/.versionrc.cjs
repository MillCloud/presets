module.exports = {
  scripts: {
    prerelease: "conc \"pnpm:lint\" \"pnpm:check:types\" \"pnpm:test:unit\"",
    postbump: "pnpm run build && git add . -A",
    posttag: "git push --follow-tags"
  },
};
