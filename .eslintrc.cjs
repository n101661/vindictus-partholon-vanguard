module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/stylistic",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "no-trailing-spaces": 1,
    "no-extra-parens": 1,
    quotes: ["warn", "double", { allowTemplateLiterals: true }],
    semi: ["warn", "never"],
    "eol-last": ["error", "always"],
  },
  root: true,
}
