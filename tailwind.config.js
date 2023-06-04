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
        "menus-background-light": "#2D2D31"
      },
    },
  },
  plugins: [],
}
