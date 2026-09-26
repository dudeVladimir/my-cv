module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    semi: ['error', 'always'],
    'no-extra-semi': 'off',
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'],

    // region typescript-rules
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: true }],
    // endregion

    // region vue-rules
    'vue/no-unused-vars': 'error',
    'vue/no-mutating-props': 'error',
    'vue/custom-event-name-casing': ['error', 'kebab-case'],
    'vue/no-v-text-v-html-on-component': 'error',
    'vue/max-attributes-per-line': ['error', {
          singleline: {
              max: 2,
          },
          multiline: {
              max: 1,
          },
      }],
    // endregion
  },
};
