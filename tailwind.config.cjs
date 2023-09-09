/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            boxShadow: {
                'all': '0 0 4px 1px #9999',
              }
        },
    },
    plugins: [
        //
        require('@tailwindcss/line-clamp'),
    ],
});
