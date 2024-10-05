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
        authbg: "url('https://static.vecteezy.com/system/resources/previews/033/862/892/non_2x/time-concept-with-vintage-clock-and-space-background-3d-rendering-passage-of-time-with-clock-in-space-ai-generated-free-photo.jpg')",        
      },
    },
  },
  plugins: [
    daisyui,
    typography,
  ],
  daisyui:{
    themes:["light"],
  }
};
