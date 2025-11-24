import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,      // <--- allows access from other devices
    port: 5173,      // <--- optional: set fixed port
  },
  plugins: [react()],
})
