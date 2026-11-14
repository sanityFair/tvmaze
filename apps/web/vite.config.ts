import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

const apiProxy = {
  '/api': process.env.API_URL ?? 'http://localhost:3000',
};

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '~': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: { proxy: apiProxy },
  preview: { proxy: apiProxy },
});
