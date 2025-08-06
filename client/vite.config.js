import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lightningcss']
  },
  build: {
    rollupOptions: {
      external: ['lightningcss']
    }
  }
})