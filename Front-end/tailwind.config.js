/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        authgray: "#999",
      },
      backgroundImage: {
        "authbg": "url('assets/images/authbg.jpg')",
      },
    },
  },
  plugins: [],
};
