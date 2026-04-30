import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  publicDir: false,
  build: {
    emptyDirOutDir: true,
    outDir: 'dist-lib',
    lib: {
      entry: resolve(__dirname, 'src/embed.ts'),
      name: 'PreverbDiagram',
      fileName: (format) => (format === 'es' ? 'acha-mimo.js' : 'acha-mimo.iife.js'),
      formats: ['es', 'iife'],
    },
    rollupOptions: {
      output: {
        assetFileNames: 'acha-mimo[extname]',
      },
    },
  },
})
