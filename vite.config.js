import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// On Vercel, assets should load from '/'. On GitHub Pages, use '/itis3135-react/'
const isVercel = !!process.env.VERCEL

export default defineConfig({
  base: isVercel ? '/' : '/itis3135-react/',
  plugins: [react()],
})
