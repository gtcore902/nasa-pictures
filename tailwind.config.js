/** @type {import('tailwindcss').Config} */

const withMT = require('@material-tailwind/react/utils/withMT');
const plugin = require('tailwindcss/plugin');

module.exports = withMT({
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out .15s forwards',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.box-custom': {
          boxShadow:
            '0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0)',
        },
        '.flex-custom': {
          flex: '0 0 auto',
        },
        '.bcc-footer': {
          backgroundColor: '#c0c0aa',
        },
      };
      addUtilities(newUtilities);
    }),
  ],
});

// module.exports = {
//   content: [
//     './src/**/*.{js,jsx,ts,tsx}',
//     'node_modules/flowbite-react/lib/esm/**/*.js',
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [require('flowbite/plugin')],
// };
