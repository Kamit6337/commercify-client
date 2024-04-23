/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        black950: "#020617",
        black900: "#0f172a",
        grap50: "#f9fafb",
        product_addToCart: "#ff9f00",
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      laptop: { max: "1280px" },
      // => @media (max-width: 1279px) { ... }

      sm_lap: { max: "1024px" },
      // => @media (max-width: 1023px) { ... }

      tablet: { max: "768px" },
      // => @media (max-width: 767px) { ... }

      mobile: { max: "640px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
};
