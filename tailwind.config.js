/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        magical: {
          purple: '#8a2be2',
          indigo: '#4b0082',
          gold: '#ffd700',
          silver: '#c0c0c0',
          mystic: '#9370db'
        }
      },
      fontFamily: {
        'magical': ['Cinzel', 'serif'],
        'modern': ['Inter', 'sans-serif']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite'
      },
      backdropBlur: {
        'magical': '20px'
      },
      boxShadow: {
        'magical': '0 0 20px rgba(138, 43, 226, 0.4), 0 0 40px rgba(138, 43, 226, 0.2)',
        'golden': '0 0 20px rgba(255, 215, 0, 0.4), 0 0 40px rgba(255, 215, 0, 0.2)'
      }
    },
  },
  plugins: [],
}