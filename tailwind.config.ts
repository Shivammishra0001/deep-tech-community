import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".container-md": {
          "@apply": "max-w-4xl mx-auto px-6 lg:px-8",
        },
        ".container-lg": {
          "@apply": "max-w-7xl mx-auto px-6 lg:px-8",
        },
        ".container-xl": {
          "@apply": "max-w-[1400px] mx-auto px-6 lg:px-8",
        },
        ".section": {
          "@apply": "py-20 md:py-28",
        },
        ".section-sm": {
          "@apply": "py-12 md:py-16",
        },
        ".gradient-text": {
          "@apply": "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent",
        },
        ".glass": {
          "@apply": "backdrop-blur-xl bg-white/80 border border-white/20",
        },
        ".card": {
          "@apply": "rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow",
        },
        ".card-interactive": {
          "@apply": "card cursor-pointer hover:border-slate-300 hover:shadow-lg",
        },
        ".btn": {
          "@apply": "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all cursor-pointer border-0",
        },
        ".btn-primary": {
          "@apply": "btn bg-blue-600 text-white hover:bg-blue-700 active:scale-95",
        },
        ".btn-secondary": {
          "@apply": "btn bg-slate-100 text-slate-900 hover:bg-slate-200",
        },
        ".btn-ghost": {
          "@apply": "btn text-slate-700 hover:bg-slate-100",
        },
        ".btn-sm": {
          "@apply": "px-4 py-2 text-sm",
        },
        ".btn-lg": {
          "@apply": "px-8 py-4 text-lg",
        },
        ".input": {
          "@apply": "px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-950 placeholder-slate-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
        },
        ".badge": {
          "@apply": "inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium",
        },
        ".badge-primary": {
          "@apply": "badge bg-blue-100 text-blue-700",
        },
        ".badge-secondary": {
          "@apply": "badge bg-slate-100 text-slate-700",
        },
        ".badge-success": {
          "@apply": "badge bg-green-100 text-green-700",
        },
        ".badge-warning": {
          "@apply": "badge bg-yellow-100 text-yellow-700",
        },
        ".badge-danger": {
          "@apply": "badge bg-red-100 text-red-700",
        },
        ".badge-ai": {
          "@apply": "badge bg-purple-100 text-purple-700",
        },
        ".badge-quantum": {
          "@apply": "badge bg-cyan-100 text-cyan-700",
        },
        ".badge-cyber": {
          "@apply": "badge bg-red-100 text-red-700",
        },
        ".badge-space": {
          "@apply": "badge bg-sky-100 text-sky-700",
        },
        ".focus-ring": {
          "@apply": "outline-none ring-2 ring-offset-2 ring-blue-500",
        },
      });
    }),
  ],
};

export default config;
