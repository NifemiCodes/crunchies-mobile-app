/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{tsx, jsx, ts, js}", "./components/**/*.{tsx, jsx, ts, js}"],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        whiteT: "rgba(255, 255, 255, 0.3)",
        red: "#e90c31",
        redT: "rgba(239, 34, 6, 0.08)",
        veryTRed: "rgba(233, 12, 49, 0.3)",
        grey: "#6b6b6b",
        lightGrey: "#f6f6f6",
        veryLightGrey: "#dedee0",
        darkBlue: "#191D31",
        detailsBg: "rgba(31, 39, 45, 0.4)",
        pink: "#E5667C",
        green: "#34C759",
        darkGreen: "#12B289",
        PODbg: "rgba(18, 178, 137, 0.1)",
        blue: "#3E73E2",
        softYellow: "#fe83594d",
      },
      fontFamily: {
        dm: "DM-reg",
        dmb: "DM-bold",
        dmMed: "DM-med",
      },
      dropShadow: {
        checkout: "0px 3px 8px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
