import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),

    // Compressão Brotli (melhor compressão)
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024, // Apenas arquivos > 1KB
      deleteOriginFile: false,
    }),

    // Compressão Gzip (fallback)
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
      deleteOriginFile: false,
    }),
  ],

  build: {
    // Code splitting simples e seguro
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },

    // Otimizações regulares
    chunkSizeWarningLimit: 800,
    sourcemap: false,
    target: 'es2020',
    cssCodeSplit: true,
    reportCompressedSize: true,
  },

  // Otimizar dependências
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },

  // Compressão e performance
  server: {
    hmr: {
      overlay: false, // Menos overhead no dev
    },
  },
})