/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'oled-black': '#000000',
        'dark-gray': '#111111',
        'medium-gray': '#222222',
        'light-gray': '#333333',
        'accent-red': '#ff4545',
        'accent-red-hover': '#ff6969',
        'text-primary': '#ffffff',
        'text-secondary': '#e0e0e0',
        'text-muted': '#b0b0b0',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
};