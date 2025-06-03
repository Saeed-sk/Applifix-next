/** @type {import('tailwindcss').Config} */
module.exports = {
    corePlugins: {
        preflight: true,
    },
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                xl1440: '1400px'
            },
            spacing: {
                '1440': '1440px'
            },
            colors: {
                'dark-900': '#0E0C1A',
                'dark-500': '#1B1B1B',
                'dark-100': '#29244D',
                'gray-900': '#1A1A1D',
                'gray-700': '#303036',
                'gray-600': '#5E5E69',
                'gray-300': '#8B8B9C',
                'gray-200': '#D0D0E8',
                'gray-100': '#F0F0FF',
                'primary-900': '#3B1940',
                'primary-500': '#522258',
                'primary-100': '#6B2C73',
                'secondary-900': '#78303E',
                'secondary-500': '#AB4459',
                'secondary-100': '#DE5873',
                'danger': '#CC460A',
                'warning-900': '#FF570C',
                'warning-100': '#FF7F46',
                'light-900': '#CCC0B0',
                'light-500': '#FFF0DC',
                'light-100': '#FDFBFB',

                'main-dark': '#F0F0F3',
                'main-light': '#FFFFFF',
            },
            fontSize: {
                '10': '10px',
                '12': '12px',
                '14': '14px',
                '16': '16px',
                '20': '20px',
                '24': '24px',
                '36': '36px',
                '40': '40px',
                '48': '48px'
            },
            borderRadius: {
                '5': '5px',
                '10': '10px',
                '12': '12px',
                '15': '15px',
                '20': '20px',
            }
        }
    },
    plugins: [require("tailwindcss-animate"), require('tailwind-scrollbar')],
};
