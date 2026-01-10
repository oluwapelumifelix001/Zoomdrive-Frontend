import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script',
      manifest: {
        name: 'ZoomDrive',
        short_name: 'ZoomDrive',
        description: 'Luxury Car Rental Service',
        theme_color: '#2563eb',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'newlogo.jpg',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'newlogo.jpg',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})   