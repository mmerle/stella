import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_BASE_URL,
  output: 'server',
  vite: {
    ssr: {
      external: ['node:async_hooks'],
    },
  },
  prefetch: {
    defaultStrategy: 'viewport',
  },
  adapter: cloudflare({
    imageService: 'passthrough',
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [react(), sitemap()],
});
