/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#40495A",
        "semi-dark": "#535f75",
        "dark-gray": "#828D8F",
        "light-gray": "#A6B1A9",
        "dark-yellow": "#DCB665",
        "red-yellow": "#C63D2F",
        "light-yellow": "#E4CF8C",
      },
    },
  },
  plugins: [],
};
