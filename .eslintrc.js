module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint','unused-imports'],
  rules: {
    semi: "off",
    'no-extra-semi': "error",
    "react-hooks/exhaustive-deps": "warn",
  },
  env: {
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
