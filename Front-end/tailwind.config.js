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
        authbg: "url('https://images.unsplash.com/photo-1594589813631-0c765423744e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",        
      },
    },
  },
  plugins: [
    daisyui,
    typography,
  ],
};
