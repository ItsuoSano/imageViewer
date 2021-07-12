module.exports = {
  plugins: ['stylelint-scss'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order'
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'max-empty-lines': 2,
    'at-rule-no-unknown': [true,
      { ignoreAtRules: ['include', 'mixin', 'each'] }]
  },
  ignoreFiles: [
    'dist/**/*',
    'docs/**/*'
  ]
}
