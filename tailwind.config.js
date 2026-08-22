/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAFAF7',
          100: '#F5F5EF',
          200: '#EBEBE0',
        },
        ocean: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          500: '#14B8A6',
          700: '#0F766E', // Primary Teal
          800: '#115E59',
          900: '#134E4A',
        },
        coral: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          500: '#F97316', // Accent Coral
          600: '#EA580C',
          700: '#C2410C',
        },
        slate: {
          850: '#151F32',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        heading: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 118, 110, 0.08)',
        'soft-lg': '0 10px 30px -4px rgba(15, 118, 110, 0.12)',
        'coral-glow': '0 4px 15px rgba(249, 115, 22, 0.3)',
      }
    },
  },
  plugins: [],
}
