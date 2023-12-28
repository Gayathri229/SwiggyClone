/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        montserrat: ["Montserrat","sans-serif"],
        spaceGrotesk: ["Space Grotesk", "sans-serif"]
      }, 
      linearGradient: {
        'black-bottom': ['rgba(0,0,0,0), rgba(0,0,0,1)'],
        'bottom-black': ['rgba(27, 30, 36, 0) 0%, rgb(27, 30, 36) 84.21%)']
      }
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
