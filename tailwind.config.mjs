export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./app/components/**/*.{js,ts,jsx,tsx}",
    "./app/dashboard/**/*.{js,ts,jsx,tsx}",
    "./app/login/**/*.{js,ts,jsx,tsx}",
    "./app/signup/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2A7AE2",
        secondary: "#F5A623",
        invariant: "#F9FAFC",
        text: "#212529",
        glass: "rgba(0, 0, 0, 0.06)"
      },
      spacing: {
        xl: "48px",
        "2xl": "64px"
      },
      screens: {
        huge: "1200px"
      }
    }
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")]
};