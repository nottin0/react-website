import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//import { VitePluginEnvironment } from 'vite-plugin-environment'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  plugins: [
    react()
  ],
  define: {
    'process.env': process.env
  }
})
