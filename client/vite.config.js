import { defineConfig } from 'vite'
import { API_URL } from './src/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': API_URL
    }
  }
})
