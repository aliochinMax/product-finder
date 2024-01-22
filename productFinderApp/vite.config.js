import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Load environment variables
const env = loadEnv('', process.cwd());

export default defineConfig(({ command, mode }) => ({
  plugins: [react()],
  define: {
    'import.meta.env': JSON.stringify(env),
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.js'],
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3001', 
    },
  },

}));
