import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React and React DOM
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Animation library
          'framer-motion': ['framer-motion'],
          // Radix UI components
          'radix-ui': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-select',
            '@radix-ui/react-slot',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
          ],
          // Form libraries
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          // UI utilities
          'ui-utils': ['class-variance-authority', 'clsx', 'tailwind-merge'],
          // Icons
          'lucide-icons': ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
})
