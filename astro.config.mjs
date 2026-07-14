import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://vortkart.com',
  compressHTML: true,
  trailingSlash: 'ignore',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  build: {
    inlineStylesheets: 'auto',
  },
  devToolbar: { enabled: false },
  vite: {
    optimizeDeps: {
      exclude: ['aria-query', 'axobject-query'],
    },
  },
});
