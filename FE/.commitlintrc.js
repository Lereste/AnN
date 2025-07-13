module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    {
      rules: {
        'header-match-fe-pattern': (parsed) => {
          const { raw } = parsed;
          if (!raw.includes('[FE]')) {
            return [false, 'commit message should inlucde [FE] <type-enum>: '];
          }
          return [true, ''];
        },
      },
    },
  ],
  rules: {
    'header-match-team-pattern': [2, 'always'],
    'type-enum': [2, 'always', ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test', 'button']],
  },
};
