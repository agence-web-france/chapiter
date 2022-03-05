module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Source Sans Pro']
      },
      width: {
        '3/8': '37.5%',
      }
    },
  },
  plugins: ["@tailwindcss/forms"],
}
