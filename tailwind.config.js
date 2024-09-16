/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{tsx, jsx, ts, js}", "./components/*.{tsx, jsx, ts, js}"],
  theme: {
    colors: {
      white: "#ffffff",
      whiteT: "rgba(255, 255, 255, 0.3)",
      red: "#e90c31",
      redT: "rgba(239, 34, 6, 0.08)",
      grey: "#6b6b6b",
      lightGrey: "#f6f6f6",
      darkBlue: "#191D31",
      detailsBg: "rgba(31, 39, 45, 0.4)",
      pink: "#E5667C",
      green: "#34C759",
    },
    fontFamily: {
      dm: "DM-reg",
      dmb: "DM-bold",
      dmMed: "DM-med",
    },
    extend: {},
  },
  plugins: [],
};
