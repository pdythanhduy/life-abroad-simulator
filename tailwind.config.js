/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', '"Noto Sans JP"', "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#0b0d12",
        panel: "#11141b",
        line: "#1c2230",
        soft: "#9aa3b2",
        accent: "#7aa2ff",
      },
    },
  },
  plugins: [],
};
