module.exports = {
  scripts: {
    prerelease: "pnpm install && conc \"pnpm:lint\" \"pnpm:check:types\" \"pnpm:test:unit\"",
    postbump: "pnpm run build:mp-weixin && git add . -A",
    posttag: "git push --follow-tags"
  },
};
