import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6', // Custom primary color
        secondary: '#020B27', // Custom secondary color
        lightPrimary: '#93c5fd', // Light shade of primary blue
        darkPrimary: '#1e40af', // Dark shade of primary blue
        lightSecondary: '#323b4b', // Light shade of secondary blue
        darkSecondary: '#010514', // Dark shade of secondary blue
        white: '#ffffff', // White color
        lightGray: '#f3f4f6', // Light gray color
        mediumGray: '#9ca3af', // Medium gray color
        darkGray: '#4b5563', // Dark gray color
        black: '#000000', // Black color
      },
      backgroundImage: {
        'gradient-to-b': 'linear-gradient(to bottom, #020B27, #3b82f6)',
      },
      boxShadow: {
        'outline-blue': '0 0 0 3px rgba(59, 130, 246, 0.5)',
      },
    },
  },
  plugins: [],
};
export default config;
