/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        98: "25.5rem", // Define a custom margin size
      },
    },
  },
  plugins: [],
};
