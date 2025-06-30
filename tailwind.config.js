/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fce7f3',
          100: '#fbcfe8',
          500: '#e91e63',
          600: '#db1c5b',
          700: '#c2185b',
        },
        secondary: {
          50: '#f3e5f5',
          100: '#e1bee7',
          500: '#9c27b0',
          600: '#8e24aa',
          700: '#7b1fa2',
        },
        accent: {
          50: '#fce4ec',
          100: '#f8bbd9',
          500: '#ff4081',
          600: '#f50057',
          700: '#c51162',
        },
        surface: '#ffffff',
        background: '#fafafa',
        success: '#4caf50',
        warning: '#ff9800',
        error: '#f44336',
        info: '#2196f3',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-celebration': 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
        'gradient-soft': 'linear-gradient(135deg, #fce7f3 0%, #f3e5f5 100%)',
        'gradient-accent': 'linear-gradient(135deg, #ff4081 0%, #e91e63 100%)',
      },
      boxShadow: {
        'celebration': '0 10px 25px -5px rgba(233, 30, 99, 0.1), 0 10px 10px -5px rgba(233, 30, 99, 0.04)',
        'card': '0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)',
        'floating': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}