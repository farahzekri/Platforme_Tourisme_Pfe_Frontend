const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

module.exports = {
  purge: {
    enabled: true,
    content: [
      "./public/**/*.html",
      "./public/*.html",
      "./src/**/*.js",
      "./src/*.js",
      "./src/**/*.html",
      "./src/*.html",
      "./public/**/*.js",
      "./public/*.js",
      "./src/views/Frontoffice/composant/cardmaps.js"
    ],
    options: {
      safelist: [],
    },
  },
  theme: {
    colors: {
      primary: '#f15d30',
      red: {
        50: '#ffe5e5', 
        100: '#fdbebe',
        200: '#fc9191',
        300: '#fb6262',
        400: '#fa3333',
        500: '#D46F4D', 
        600: '#5C8143',
        700: '#c10101',
        800: '#a10101',
        900: '#810101',
      },
      green:{
      50:'#f1fcf3',  
      100:'#defae6',
      300:'#8ee7a8',
      700:'#1d7839',
      800:'#1c5f30',
      },
     
      gray: {
        100: '#F3F4F6', // gray-100
        500: '#6B7280', // gray-500
        600: '#4B5563', // gray-600
        700: '#374151', // gray-700
      },
      blue: {
        500: '#3B82F6',
      },
      jaun: '#7AA95C', // Jaune (doré)
      white: '#ffffff',
      lightBlue: {
        50: "#e0f0f7",  // Lightest shade
        100: "#4A919E", 
        200: "#80c2d4",
        300: "#4daab2",  // Slightly lighter than the original
        400: "#26939b",
        450:'#264653',
        500: "#0f7c84",  // Base color
        600: "#0e6b77", 
        700: "#0c5a6a",
        800: "#0a495c", 
        900: "#0c4a6e",  // Original color
      },
      
      palette:{
        greenajou:"#5C8143",
        green:"#7AA95C",
        jaun:"#e9c46a",
        jaunClair: "#f9f2c0",
        jaunFonce: "#b88f3d",
        bleufonce:"#264653",
        bleuclere:"#4A919E",
        bleuClair: "#d0efff",
        orange:"#D46F4D",
        orangefonce:"#A8553B",
        customgreen: '#63E6BE',
        customgreenfonce:"#4BB294",
        
      }
    },
    extend: {
      animation: {
        grow: "grow 0.5s ease-in-out forwards",
        slidein: "slidein 0.5s ease-out forwards",
        fadeIn: 'fadeIn 0.3s ease',
        slideInTop: 'slideInTop 0.5s ease-out',
        slideInBottom: 'slideInBottom 0.5s ease-out',
        slideInLeft: 'slideInLeft 0.5s ease-out',
        slideInRight: 'slideInRight 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInTop: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideInBottom: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        grow: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        slidein: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      minHeight: {
        "screen-75": "75vh",
      },
      fontSize: {
        55: "55rem",
      },
      opacity: {
        80: ".8",
      },
      zIndex: {
        2: 2,
        3: 3,
      },
      inset: {
        "-100": "-100%",
        "-225-px": "-225px",
        "-160-px": "-160px",
        "-150-px": "-150px",
        "-94-px": "-94px",
        "-50-px": "-50px",
        "-29-px": "-29px",
        "-20-px": "-20px",
        "25-px": "25px",
        "40-px": "40px",
        "95-px": "95px",
        "145-px": "145px",
        "195-px": "195px",
        "210-px": "210px",
        "260-px": "260px",
      },
      height: {
        "95-px": "95px",
        "70-px": "70px",
        "350-px": "350px",
        "500-px": "500px",
        "600-px": "600px",
      },
      maxHeight: {
        "860-px": "860px",
      },
      maxWidth: {
        "100-px": "100px",
        "120-px": "120px",
        "150-px": "150px",
        "180-px": "180px",
        "200-px": "200px",
        "210-px": "210px",
        "580-px": "580px",
      },
      minWidth: {
        "140-px": "140px",
        48: "12rem",
      },
      backgroundSize: {
        full: "100%",
      },
    },
  },
  variants: [
    "responsive",
    "group-hover",
    "focus-within",
    "first",
    "last",
    "odd",
    "even",
    "hover",
    "focus",
    "active",
    "visited",
    "disabled",
  ],
  plugins: [
    require("@tailwindcss/forms"),
    plugin(function ({ addComponents, theme }) {
      const screens = theme("screens", {});
      addComponents([
        {
          ".container": { width: "100%" },
        },
        {
          [`@media (min-width: ${screens.sm})`]: {
            ".container": {
              "max-width": "640px",
            },
          },
        },
        {
          [`@media (min-width: ${screens.md})`]: {
            ".container": {
              "max-width": "768px",
            },
          },
        },
        {
          [`@media (min-width: ${screens.lg})`]: {
            ".container": {
              "max-width": "1024px",
            },
          },
        },
        {
          [`@media (min-width: ${screens.xl})`]: {
            ".container": {
              "max-width": "1280px",
            },
          },
        },
        {
          [`@media (min-width: ${screens["2xl"]})`]: {
            ".container": {
              "max-width": "1280px",
            },
          },
        },
      ]);
    }),
  ],
};
