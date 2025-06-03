/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xl1440': '1400px',
      },
      spacing: {
        '1440': '1440px',
      },
      colors: {
        primary: '#03045E',
        secondary: '#0077B6',
        success: '#22C55E',
        danger: '#FF4B55',
        warning: '#F59E0B',
        info: '#3B82F6',
        darkGray: '#444444',
        dark: '#212121',
        lightGray: '#AAAAAA',
        bgLightGray: '#F5F5F5',
        whiteSmoke: '#DDDDDD',
        splash: '#0038a6',
        bgGreen: '#455A64',
      },
      fontSize: {
        10: '10px',
        12: '12px',
        14: '14px',
        16: '16px',
        20: '20px',
        24: '24px',
        36: '36px',
        48: '48px',
      },
      borderRadius: {
        5: '5px',
        10: '10px',
        15: '15px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
