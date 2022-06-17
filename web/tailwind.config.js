/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
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
