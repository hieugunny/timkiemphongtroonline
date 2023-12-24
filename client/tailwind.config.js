/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],

  theme: {
    extend: {
      width: {
        '1100': '1100px'
      },
      backgroundColor: {
        primary: '#F5F5F5',
        secondary2: '#f73859',
        secondary1: '#1266dd',
        primary: '#F5F5F5',
        'overlay-30': 'rgb(0,0,0,0.3)',
        'overlay-70': 'rgb(0,0,0,0.7)',
      },
      maxWidth: {
        '600': '600px'
      },
      colors: {
        borderItem: '#dedede',
        secondary2: '#f73859',
        secondary1: '#1266dd',
        'star-5': '#E13427',
        'star-4': '#ea2e9d',
        'star-3': '#FF6600',
        'star-2': '#007BFF',
        'star-1': '#055699'
      }
    },
  },
  plugins: [],
}

