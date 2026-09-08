/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '420px',
      },
      colors: {
        dpc: {
          navy: {
            950: '#060d17',
            900: '#0a192f',
            800: '#112240',
            700: '#1d3557',
            600: '#2a4d69',
          },
          gold: {
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#d4af37', // Covenant gold
            600: '#b8860b',
            700: '#926a08',
          },
          crimson: {
            500: '#8b0000',
            600: '#6b0000',
          },
          cream: {
            50: '#fdfbf7',
            100: '#f8f4eb',
            200: '#eee5d3',
          }
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Georgia', 'serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'radial-gradient(ellipse at top, rgba(212,175,55,0.15) 0%, rgba(10,25,47,0.95) 70%)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.3)',
        'gold-glow-lg': '0 0 40px -5px rgba(212, 175, 55, 0.45)',
        'navy-card': '0 10px 30px -10px rgba(2, 12, 27, 0.7)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        }
      }
    },
  },
  plugins: [],
}
