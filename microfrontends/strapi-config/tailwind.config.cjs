/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Open Sans", "Helvetica", "Arial", "sans-serif"]
    }
  },
  daisyui: {
    logs: false,
    theme: ["light"]
  },
  plugins: [require("daisyui")]
}
