/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#F5F2EA',
          200: '#EBE6DA',
          900: '#3E2723',
        },
        forest: {
          800: '#2A3C32',
          900: '#1B2922',
          950: '#0F1813',
        },
        gold: {
          100: '#FFF8DD',
          400: '#C5A028',
          500: '#B28F20',
          600: '#8F7118',
          900: '#735B13',
        },
        coffee: {
          800: '#4A3B32',
          900: '#2C221C',
        },
        obsidian: {
          50: '#F2F2F2',
          100: '#E0E0E0',
          500: '#1A1A1A',
          900: '#0D0D0D',
          950: '#080808',
        },
        ivory: {
          50: '#FFFFF5',
          100: '#FDFDF0',
          200: '#F7F7E8',
          400: '#E8E8C8',
        },
        ember: {
          400: '#E8341C',
          500: '#C4270E',
          600: '#A01F0B',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'Inter', 'sans-serif'],
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['Inter', '"DM Sans"', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-.05em',
        tighter: '-.025em',
        widest: '.25em',
        ultra: '.35em',
        tracking: '.02em',
      },
      fontSize: {
        '10xl': ['9rem', { lineHeight: '0.95' }],
        '11xl': ['11rem', { lineHeight: '0.9' }],
      },
    },
  },
  plugins: [],
}
