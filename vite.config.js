import { defineConfig } from 'vite';

export default defineConfig({
  base: '/PollRequest/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  server: {
    port: 5173,
    open: true,
  },
});
