/** @type {import("eslint").Linter.Config} */
module.exports = {
    overrides: [
        {
            extends: [
                "plugin:@typescript-eslint/recommended-requiring-type-checking",
            ],
            files: ["*.ts", "*.tsx"],
            parserOptions: {
                project: "tsconfig.json",
            },
        },
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
    },
    plugins: ["@typescript-eslint"],
    extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
    rules: {
        "import/no-unresolved": [2, { ignore: ["tw-elements"] }],
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/consistent-type-imports": "off",
    },
};
