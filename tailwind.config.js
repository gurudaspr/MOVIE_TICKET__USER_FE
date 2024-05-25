
/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import animations from "@midudev/tailwind-animations";


export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      'primary-hover': '#fb7185',
    }
  },
  plugins: [daisyui,animations
  ],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#f43f5e",
          "primary-content": "#f3f4f6",
          "secondary": "#fb7185",
          "secondary-content": "#f3f4f6",
          "accent": "#22c55e",
          "accent-content": "#d2e3db",
          "neutral": "#d1d5db",
          "neutral-content": "#090a0b",
          "base-100": "#f3f4f6",
          "base-200": "#e5e7eb",
          "base-300": "#9ca3af",
          "base-content": "#141415",
          "info": "#00beff",
          "info-content": "#000d16",
          "success": "#22c55e",
          "success-content": "#000a06",
          "warning": "#ffab00",
          "warning-content": "#160b00",
          "error": "#ff183e",
          "error-content": "#160001",
        },
        dark: {
          "primary": "#f43f5e",
          "primary-content": "#f3e8ff",
          "secondary": "#22d3ee",
          "secondary-content": "#000000",
          "accent": "#f43f5e",
          "accent-content": "#ffffff",
          "neutral": "#1f2937",
          "neutral-content": "#ffffff",
          "base-100": "#1f2937",
          "base-200": "#171f26",
          "base-300": "#12191f",
          "base-content": "#cccfd1",
          "info": "#3abff8",
          "info-content": "#000000",
          "success": "#22c55e",
          "success-content": "#000000",
          "warning": "#fbbd23",
          "warning-content": "#160900",
          "error": "#f87272",
          "error-content": "#fed9d6",
        },
      },
    ],
  },
}
