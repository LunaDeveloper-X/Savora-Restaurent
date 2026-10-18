/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Warm neutral base
        cream: {
          50: '#FBF8F3',
          100: '#F5EFE6',
          200: '#EBE0D0',
          300: '#DDD0BB',
        },
        // Primary — deep warm charcoal/espresso
        espresso: {
          50: '#F6F4F2',
          100: '#E8E3DE',
          200: '#C9BFB6',
          300: '#A89889',
          400: '#7A6B5D',
          500: '#5C4F44',
          600: '#473E36',
          700: '#332C27',
          800: '#231E1B',
          900: '#171311',
        },
        // Accent — warm terracotta/amber
        amber: {
          50: '#FDF6EC',
          100: '#FBE6CC',
          200: '#F5CC97',
          300: '#EDB063',
          400: '#E29538',
          500: '#C97A20',
          600: '#A5621A',
          700: '#814E16',
          800: '#5E3A12',
          900: '#3C250B',
        },
        sage: {
          50: '#F2F5F0',
          100: '#DCE5D6',
          200: '#B9C9AF',
          300: '#94A887',
          400: '#728D64',
          500: '#567249',
        },
        wine: {
          500: '#8B2D3B',
          600: '#72232F',
          700: '#5A1B25',
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      fontSize: {
        'hero': ['clamp(2.1rem, 8vw, 7rem)', { lineHeight: '1.05', letterSpacing: '0.02em' }],
        'display': ['clamp(1.75rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '0.01em' }],
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slow-zoom': 'slowZoom 20s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1.0)' },
          '100%': { transform: 'scale(1.12)' },
        },
      },
    },
  },
  plugins: [],
};