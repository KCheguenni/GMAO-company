const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

module.exports = {
  // Changed from 'purge' to 'content' for Tailwind v3+
  content: [
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/*.{js,jsx}",
    "./public/*.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        secondary: colors.gray,
        // Only include colors you actually use
        blue: {
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
      minHeight: {
        "screen-75": "75vh",
      },
      // ... keep your other extensions
    },
  },
  variants: {
    extend: {
      backgroundColor: ['hover', 'active'],
      textColor: ['hover', 'active'],
      borderColor: ['hover', 'focus'],
      // Ensure all variants you need are included
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    plugin(function ({ addComponents, theme }) {
      // ... your existing plugin code
    }),
  ],
  corePlugins: {
    // Ensure container is enabled
    container: false, // You're customizing it in your plugin
  }
};