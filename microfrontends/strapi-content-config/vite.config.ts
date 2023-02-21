import * as path from 'node:path'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: 'STRAPI_CONNECTOR',
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/main.tsx'),
      name: 'strapi-content-config',
      formats: ['umd'],
      fileName: format => `strapi-content-config.${format}.js`
    },
    outDir: path.resolve(__dirname, './build')
  },
  test: {
    environment: "jsdom",
    setupFiles: "./config/testSetup.ts",
  }
})
