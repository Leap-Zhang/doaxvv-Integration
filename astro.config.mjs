import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// 本地默认根路径；仅当设置了非 localhost 的 SITE_URL（即部署）时才使用 BASE_URL 作为子路径 base。
const siteUrl = process.env.SITE_URL || '';
const deploy = !!siteUrl && !siteUrl.includes('localhost');
const base = deploy ? (process.env.BASE_URL || '/') : '/';

export default defineConfig({
  site: siteUrl || 'http://localhost:4321',
  base,
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        ignored: [
          '**/bromide_dl/**', '**/tests/**', '**/test-results/**',
          '**/px-fresh/**', '**/deploy/**', '**/docs/**', '**/dist/**',
          '**/.astro/**', '**/.edge*/**', '**/node_modules/**'
        ]
      }
    }
  }
});