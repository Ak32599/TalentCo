import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Use a relative base so assets are referenced relative to the HTML file.
  // This avoids some GitHub Pages 404 issues when the app runs at a subpath.
  base: './',
  plugins: [react()],
})