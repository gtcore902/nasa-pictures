/** @type {import('tailwindcss').Config} */

const withMT = require('@material-tailwind/react/utils/withMT');
const plugin = require('tailwindcss/plugin');

module.exports = withMT({
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {},
  },
  // plugins: [require('flowbite/plugin')],
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
