import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#171717",
        graphite: "#2c2c2c",
        paper: "#fbfbf8",
        mint: "#2f8f83",
        coral: "#d85f45",
        amber: "#d39b2a",
        plum: "#6f4e7c"
      },
      boxShadow: {
        panel: "0 18px 50px rgba(23, 23, 23, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
