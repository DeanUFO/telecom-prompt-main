import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 載入環境變數 (包含 .env 檔案與系統環境變數)
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    base: '/telecom-prompt-main/', // GitHub Pages 子路徑 (倉庫部署)
    define: {
      // 在編譯時期將 process.env.API_KEY 替換為實際的字串值 (由 CI 注入)
      'process.env.API_KEY': JSON.stringify(env.API_KEY || process.env.API_KEY || ''),
    },
  };
});