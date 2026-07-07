/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F4EFE9',
        ink: '#2A2622',
        muted: '#6E6559',
        burgundy: '#7A2331',
        gold: '#B8934C',
        surface: '#EFE7DD',
        divider: '#D8CFC1',
        nightfall: '#211D19',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        eyebrow: '0.22em',
      },
      maxWidth: {
        editorial: '1440px',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};