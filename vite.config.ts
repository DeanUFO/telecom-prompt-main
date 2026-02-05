import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/telecom-prompt-main/', // GitHub Pages 子路徑 (倉庫部署)
});