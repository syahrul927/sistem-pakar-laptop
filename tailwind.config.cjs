/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    daisyui: {
        themes: ["light", "dark"],
    },
    theme: {
        extend: {
            fontFamily: {
                mplus: ["'M PLUS Rounded 1c'", "Verdana", "sans-serif"],
            },
        },
    },
    plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
