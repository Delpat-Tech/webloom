/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../../src/**/*.{js,ts,jsx,tsx}",
    "../../app/**/*.{js,ts,jsx,tsx}",
    "../../components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#125E8A', // Main sections, backgrounds
        secondary: '#197BBD', // Highlights, cards
        text: '#252627', // Body text
        accent: '#10B981', // CTAs, links, key highlights
        negative: '#FFF9FB', // Page background
      },
      fontFamily: {
        headline: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
// Icon Style: Use Feather Icons (simple linear, consistent) 