const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], theme: {
    extend: {
      colors: {
        'sand': "#c2b27f",
        'text': '#062826',
        'background': '#f6fefd',
        'primary': '#7dbded',
        'secondary': '#B7D6D4',
        'accent': '#1269C7',
        'button-border': '#b0bec5'
      },
    },
  },
  plugins: [],
});