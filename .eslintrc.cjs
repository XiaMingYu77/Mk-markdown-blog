// eslint-disable-next-line
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential"
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        ".eslintrc.{js,cjs}"
      ],
      parserOptions: {
        sourceType: "script"
      }
    }
  ],
  parserOptions: {
    ecmaVersion: "latest",
    requireConfigFile: false,
  },
  plugins: [
    "vue"
  ],
  rules: {
    "indent": ["error", 2],
    'vue/html-indent': ['error', 2],
    // html 需要有结束标签，除了自闭合标签
    'vue/html-end-tags': 2,
    // don't require .vue extension when importing
    "import/extensions": [
      "off",
      "always",
      {
        js: "never",
        vue: "never",
      },
    ],
    'no-constant-condition': 2, // 禁止在条件中使用常量表达式 if(true) if(1)
    'no-trailing-spaces': 1, // 一行结束后面不要有空格
    'no-var': 2, // 禁用var，用let和const代替
  }
}
