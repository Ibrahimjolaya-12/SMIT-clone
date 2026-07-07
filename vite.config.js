import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Node native path module

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Maps '@' to the absolute path of your 'src' directory
      '@': path.resolve(__dirname, './src'), 
    },
  },
})
