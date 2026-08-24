import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'cassette-riptide-passable.ngrok-free.dev',
      '.ngrok-free.dev',
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-framework': ['react', 'react-dom'],
          'vendor-gsap': ['gsap', 'lenis'],
          'vendor-icons': ['lucide-react', 'roughjs', 'clsx', 'tailwind-merge'],
        },
      },
    },
  },
})
