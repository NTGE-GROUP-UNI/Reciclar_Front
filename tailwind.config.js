/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        openSans: ["Open Sans, sans-serif"],
        inter: ["Inter, sans-serif"],
        roboto: ["Roboto, sans-serif"]
      },
      keyframes: {
        moveRight: {
          '0%': { transform: 'scale(0%)' },
          '50%': { transform: 'scale(100%)' },
          '100%': { transform: 'scale(0%)' },
        },
        moveLeft: {
          '0%': { transform: 'scale(100%)' },
          '50%': { transform: 'scale(0%)' },
          '100%': { transform: 'scale(100%)' },
        },
      },
      animation: {
        moveRight: 'moveRight 1.5s ease-in-out infinite',
        moveLeft: 'moveLeft 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

