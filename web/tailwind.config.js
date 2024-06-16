/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#43A047",
        secondary: "#43A047",
        "text-muted": "#6c757d",
      },
    },
  },
  plugins: [],
};
