import config from '@pengzhanbo/eslint-config'

export default config({
  type: 'lib',
  ignores: [
    'tests/fixtures',
  ],
}, {
  files: ['examples/**/*.mjs'],
  rules: {
    'no-console': 'off',
  },
})
