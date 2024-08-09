/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ 
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx,vue}"
  ],
  theme: {
    extend: {
      screens:{
        'x12': '1500px'
      }
    },
  },
  plugins: [],
}

