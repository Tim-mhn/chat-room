/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  safelist: [
    {
      pattern:
        /bg-(red|blue|green|yellow|pink|cyan)-(100|200|300|400|500|600|700|800|900)/,
    },
  ],
  theme: {
    extend: {
      fontSize: {
        "3xs": [".58rem"],
        "2xs": [".68rem", "1rem"],
      },
    },
  },
  plugins: [],
};
