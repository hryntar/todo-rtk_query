// tailwind.config.js
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      screens: {
         sm: "480px",
         md: "768px",
         lg: "976px",
         xl: "1440px",
      },
      colors: {
         blue: "#00ADB5",
         white: "#EEEEEE",
         gray_primary: "#222831",
         transparent: "transparent",
         secondary: "#393E46",
      },
      fontFamily: {
         montserrat: ["Montserrat", "sans-serif"],
      },
   },
   darkMode: "class",
   plugins: [
      nextui({
         themes: {
            light: {
               colors: { 
                  transparent: "transparent",
                  primary: "#00ADB5",
                  text: "#222831",
                  background: "#EEEEEE",
                  secondary: "#393E46",
                  default: { 
                     100: "#fff",
                     200: "#fff",
                  },
                  focus: "#00ADB5",
               },
            },
            dark: {
               // ...
               colors: {
                  transparent: "transparent",
                  primary: "#00ADB5",
                  background: "#222831",
                  text: "#EEEEEE",
                  secondary: "#393E46",
                  default: { 
                     100: "#393E46",
                     200: "#393E46",
                  },
                  focus: "#00ADB5",
               },
            },
            // ... custom themes
         },
      }),
   ],
};
