module.exports = {
  scripts: {
    prerelease: "conc \"npm:lint\" \"npm:check:types\" \"npm:test:unit\"",
    posttag: "git push --follow-tags"
  },
};
