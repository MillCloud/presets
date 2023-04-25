module.exports = {
  scripts: {
    prerelease: "conc \"npm:lint\" \"npm:check:types\" \"npm:test\"",
    posttag: "git push --follow-tags"
  },
};
