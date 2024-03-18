module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 2020,
    },
    env: {
        browser: true,
        node: true,
    },
    extends: [
        "@nuxt",
        "plugin:prettier/recommended",
        "prettier",
        "@vue/eslint-config-prettier/skip-formatting",
    ],
    rules: {
        "prettier/prettier": "error",
        "no-debugger": "off",
    },
    plugins: ["editorconfig"],
};
