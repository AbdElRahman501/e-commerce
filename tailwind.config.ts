import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary_bg: "var(--background)",
        primary_color: "var(--primary-color)",
        dark_bg: "var(--dark-background)",
      },
      fontFamily: {
        golos: ["var(--font-golos-ui)"],
      },
      minWidth: {
        "8xl": "1446px",
      },
      maxWidth: {
        "8xl": "3000px",
      },
      dropShadow: {
        white: "0 0 5px rgba(255, 255, 255, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
