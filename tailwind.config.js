/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,cjs,mjs,ts}"],
  theme: {
    extend: {
      screens: {
        // Mobile
        mb: "500px",
        // Smaller Desktops
        smdt: "700px",
        // Desktop
        dt: "1230px",
      },
      colors: {
        grey: "#f3f4f6",
        coral: "#ef4444",
      },
    },
  },
  plugins: [],
};
