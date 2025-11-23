import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // פתיחת דפדפן אוטומטית בעת הרצת dev server
    open: true,
    // פורט ברירת מחדל
    port: 5173,
    // הגדרת host
    host: true
  }
})
