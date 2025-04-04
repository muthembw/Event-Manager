/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,jsx,ts,tsx}",      // Include both JSX and TSX files in src
    "./pages/**/*.{js,jsx,tsx}",       // Include JSX and TSX files in pages
    "./components/**/*.{js,jsx,tsx}",  // Include JSX and TSX files in components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
