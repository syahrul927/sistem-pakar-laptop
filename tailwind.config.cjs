/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/tw-elements/dist/js/**/*.js",
    ],
    theme: {
        extend: {
            fontFamily: {
                mplus: ["'M PLUS Rounded 1c'", "Verdana", "sans-serif"],
            },
        },
    },
    plugins: [require("tw-elements/dist/plugin")],
};
