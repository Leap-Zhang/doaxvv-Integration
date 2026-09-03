import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const BASE = process.env.BASE_URL || '/';

export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:4321',
  base: BASE,
  vite: {
    plugins: [tailwindcss()]
  }
});