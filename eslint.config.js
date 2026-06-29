import vuetify from 'eslint-config-vuetify'

export default [
  ...(await vuetify()),
  {
    rules: {
      'unicorn/no-this-outside-of-class': 'off',
    },
  },
]
