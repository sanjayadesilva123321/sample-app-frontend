module.exports = {
  plugins: ['commitlint-plugin-jira-rules'],
  extends: ['jira'],
  rules: {
    'references-empty': [2, 'never'],
  },
  parserPreset: {
    parserOpts: {
      referenceActions: null, // https://github.com/conventional-changelog/commitlint/issues/372#issuecomment-555086997
      issuePrefixes: ['TP-'],
    },
  },
};
