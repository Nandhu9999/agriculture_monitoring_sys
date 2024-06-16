/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#219ebc",
        secondary: "#8ecae6",
        "text-muted": "#6c757d",
      },
    },
  },
  plugins: [],
};
