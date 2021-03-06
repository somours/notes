module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "space-infix-ops": ["warn", {"int32Hint": false}]
    // "no-multiple-empty-lines": ["warn", { "max": 2, "maxBOF": 1}
  }
}
