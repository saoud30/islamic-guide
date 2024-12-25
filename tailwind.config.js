/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        gold: {
          50: '#fff7e6',
          100: '#ffe5b4',
          200: '#ffd700',
          300: '#ffc107',
          400: '#daa520',
          500: '#b8860b',
          600: '#966909',
          700: '#744d07',
          800: '#523405',
          900: '#301c03',
        }
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        arabic: ['Amiri', 'serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-gradient': 'linear-gradient(to right, #daa520, #ffd700)',
        'dark-gold-gradient': 'linear-gradient(to right, #744d07, #b8860b)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(218, 165, 32, 0.1), 0 10px 20px -2px rgba(218, 165, 32, 0.06)',
        'glow': '0 0 15px rgba(218, 165, 32, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};