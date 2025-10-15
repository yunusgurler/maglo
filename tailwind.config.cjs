module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#C5F20B", dark: "#A3D20A" },
        ink: "#0F172A",
        muted: "#94A3B8",
      },
      boxShadow: { card: "0 4px 20px rgba(0,0,0,0.06)" },
    },
    fontFamily: {
      sans: [
        "Inter",
        "system-ui",
        "Avenir",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
    },
  },
  plugins: [],
};
