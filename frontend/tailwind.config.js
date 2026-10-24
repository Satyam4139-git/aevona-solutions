/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        aevona: {
          50: '#FFFFFF',
          100: '#fbf4ee',
          200: '#f6e9de',
          300: '#ebdacd',
          400: '#e08858',
          500: '#c45139',
          600: '#a63d2a',
          700: '#5e4650',
          800: '#3b2a35',
          900: '#1c1019',
          950: '#140a14',
        },
        cream: {
          DEFAULT: '#fbf4ee',
          light: '#FFFFFF',
          dark: '#f6e9de',
        },
        gold: {
          light: '#f3b58f',
          DEFAULT: '#e08858',
          dark: '#a63d2a',
        },
        bronze: {
          DEFAULT: '#c45139',
          dark: '#a63d2a',
        },
        brown: {
          light: '#7a6270',
          DEFAULT: '#5e4650',
          dark: '#4a3340',
          coffee: '#1c1019',
        },
        darkbg: {
          base: '#100810',
          surface: '#1e1220',
          card: '#2a1520',
          border: '#3a2530',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        serif: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'gold': '0 4px 20px -2px rgba(224, 136, 88, 0.25)',
        'gold-glow': '0 0 25px rgba(224, 136, 88, 0.35)',
        'brown-soft': '0 10px 30px -5px rgba(40, 20, 32, 0.08)',
        'dark-soft': '0 10px 30px -5px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.75' },
        },
      }
    },
  },
  plugins: [],
}
