/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        aevona: { 50:'#ffffff',100:'#f3f6f9',200:'#e6eef8',300:'#dbe2e9',400:'#3a78bd',500:'#0b4f9c',600:'#083b75',700:'#4a5a6a',800:'#2a3a4c',900:'#12202f',950:'#0c1824' },
        cream: { DEFAULT:'#ffffff', light:'#ffffff', dark:'#f3f6f9' },
        gold: { light:'#6ea8dc', DEFAULT:'#0b4f9c', dark:'#083b75' },
        bronze: { DEFAULT:'#0b4f9c', dark:'#083b75' },
        brown: { light:'#6b7b8c', DEFAULT:'#4a5a6a', dark:'#2a3a4c', coffee:'#12202f' },
        darkbg: { base:'#0c1824', surface:'#12202f', card:'#1b2b3d', border:'#2a3a4c' },
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        serif: ['Schibsted Grotesk', 'IBM Plex Sans', 'system-ui', 'sans-serif'],
        heading: ['Schibsted Grotesk', 'IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      /* corporate look: tighter corners, soft neutral shadows */
      borderRadius: { lg: '4px', xl: '6px', '2xl': '8px', '3xl': '10px' },
      boxShadow: {
        'gold': '0 2px 10px -2px rgba(11, 79, 156, 0.25)',
        'gold-glow': '0 4px 16px rgba(11, 79, 156, 0.18)',
        'brown-soft': '0 2px 14px -4px rgba(18, 32, 47, 0.10)',
        'dark-soft': '0 8px 24px -6px rgba(18, 32, 47, 0.18)',
      },
      animation: { 'fade-in':'fadeIn 0.3s ease-in-out', 'slide-up':'slideUp 0.4s ease-out', 'pulse-subtle':'pulseSubtle 3s infinite ease-in-out' },
      keyframes: {
        fadeIn: { '0%':{opacity:'0'}, '100%':{opacity:'1'} },
        slideUp: { '0%':{transform:'translateY(12px)',opacity:'0'}, '100%':{transform:'translateY(0)',opacity:'1'} },
        pulseSubtle: { '0%, 100%':{opacity:'1'}, '50%':{opacity:'0.75'} },
      },
    },
  },
  plugins: [],
}
