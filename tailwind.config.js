/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  // Focus on the `app/` directory used by the Expo Router file layout.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
       colors: {
              "primary": "#4A90E2",
              "background-light": "#F7F8FA",
              "background-dark": "#101c22",
              "text-light": "#4A4A4A",
            "text-dark": "#E0E0E0",
            "card-light": "#FFFFFF",
            "card-dark": "#192730",
            "success": "#7ED321"
            },
    },
  },
  plugins: [],
}