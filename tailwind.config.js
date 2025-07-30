/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",          // caso tenha um index.html na raiz
    "./src/**/*.{js,ts,jsx,tsx}"  // seu código fonte React TS
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
