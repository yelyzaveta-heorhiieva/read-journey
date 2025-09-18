/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      textDecorationSkipInk: {
        none: 'none',
        auto: 'auto',
      },
      screens: {
        xs: '375px',
        retina: {
          raw: 'screen and (-webkit-min-device-pixel-ratio: 2), screen and (min-resolution: 2dppx), screen and (min-resolution: 192dpi)',
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-decoration-skip-none': {
          'text-decoration-skip-ink': 'none',
        },
        '.text-decoration-skip-auto': {
          'text-decoration-skip-ink': 'auto',
        },
      });
    },
  ],
};

