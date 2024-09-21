/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
import  typography from '@tailwindcss/typography';
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        authgray: "#999",
        bgprymary:"bg-base-200"
      },
      backgroundImage: {
        authbg: "url('assets/images/authbg.jpg')",        
      },
    },
  },
  plugins: [
    daisyui,
    typography,
  ],
};
