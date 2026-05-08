/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'stark-red': '#D32F2F',
        'stark-red-dark': '#B71C1C',
        'stark-cream': '#F5E6D3',
        'stark-cream-light': '#FFFAF5',
        'stark-gray': '#9E9E9E',
        'stark-black': '#1A1A1A',
        'stark-white': '#FDFDFD',
      },
      fontFamily: {
        warrior: ['"Cinzel Decorative"', 'cursive'],
        body: ['"Space Grotesk"', 'sans-serif'],
        quote: ['Lora', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('/images/stark-hero.png')",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
