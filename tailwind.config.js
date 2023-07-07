/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "brand": "#0487FF",
        "body": "#1C1C1D",
        "menus-background": "#161617",
        "menus-foreground": "#F3F3F3",
        "menus-foreground-muted": "#676464",
        "menus-background-light": "#2D2D31",
        "playlist-entry-highlight": "#2D2D3180"
      },
      animation: {
        barOne: 'audiobar 1.5s ease-in infinite',
        barTwo: 'audiobar 1s ease-in-out infinite',
        barThree: 'audiobar 2s ease-out infinite'
      },
      keyframes: {
        audiobar: {
          '0%, 100%': { height: '0%' },
          '20%': { height: '30%' },
          '40%': { height: '20%' },
          '60%': { height: '70%' },
          '80%': { height: '50%' }
        },
      },
      gridTemplateColumns: {
        'table-row': '1fr 4fr 3fr 2fr'
      }
    },
  },
  plugins: [],
}
