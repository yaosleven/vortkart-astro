import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://vortkart.com',
  compressHTML: true,
  devToolbar: { enabled: false },
  vite: {
    optimizeDeps: {
      exclude: ['aria-query', 'axobject-query'],
    },
  },
});
