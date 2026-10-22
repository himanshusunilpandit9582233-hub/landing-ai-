/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    fontFamily: { sans: ['DM Sans', 'sans-serif'], display: ['Space Grotesk', 'sans-serif'] },
    colors: { ink: '#080808', paper: '#f5f5f2' },
    boxShadow: { soft: '0 20px 80px rgba(0,0,0,.32)' }
  }},
  plugins: []
}
