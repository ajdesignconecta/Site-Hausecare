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
    // Minificação agressiva com terser
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs em produção
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2, // Duas passadas de compressão
        unsafe: true, // Otimizações mais agressivas
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_methods: true,
      },
      mangle: {
        safari10: true,
      },
    },

    // Code splitting otimizado
    rollupOptions: {
      output: {
        // Deixando o Vite decidir o chunking automaticamente
        // manualChunks removido para evitar erros de chunks vazios
        // Nomear chunks de forma consistente
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
      // Tree shaking agressivo
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
    },

    // Otimizações de chunk
    chunkSizeWarningLimit: 400, // Mais agressivo

    // Sourcemaps apenas para depuração (desabilitar em produção)
    sourcemap: false,

    // Target modern browsers para código menor
    target: 'es2020', // Mais moderno = menos polyfills

    // CSS code splitting
    cssCodeSplit: true,

    // Reportar tamanhos comprimidos
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