// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',     // para que Codespaces sirva en todas las IPs
    port: 3000,          // el que use tu frontend
    proxy: {
      // redirige llamadas a /signup, /login, /protected… hacia tu Flask
      '/signup': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '/login': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '/protected': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
      // si tienes más endpoints, añádelos aquí
    }
  }
});
