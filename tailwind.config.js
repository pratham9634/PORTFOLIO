/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border, 0 0% 89%))",
        input: "hsl(var(--input, 0 0% 89%))",
        ring: "hsl(var(--ring, 0 0% 3.9%))",
        background: "hsl(var(--background, 0 0% 100%))",
        foreground: "hsl(var(--foreground, 0 0% 3.9%))",
        primary: {
          DEFAULT: "hsl(var(--primary, 0 0% 9%))",
          foreground: "hsl(var(--primary-foreground, 0 0% 98%))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary, 0 0% 96.1%))",
          foreground: "hsl(var(--secondary-foreground, 0 0% 9%))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive, 0 84.2% 60.2%))",
          foreground: "hsl(var(--destructive-foreground, 0 0% 98%))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted, 0 0% 96.1%))",
          foreground: "hsl(var(--muted-foreground, 0 0% 45.1%))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent, 0 0% 96.1%))",
          foreground: "hsl(var(--accent-foreground, 0 0% 9%))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover, 0 0% 100%))",
          foreground: "hsl(var(--popover-foreground, 0 0% 3.9%))",
        },
        card: {
          DEFAULT: "hsl(var(--card, 0 0% 100%))",
          foreground: "hsl(var(--card-foreground, 0 0% 3.9%))",
        },
      },
      fontFamily: {
        spray: ['var(--font-spray)', 'cursive'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      },
      animation: {
        blink: 'blink 1s step-end infinite',
      }
    },
  },
  plugins: [],
}
