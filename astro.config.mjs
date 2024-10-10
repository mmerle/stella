import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';
import postcssMediaMinMax from 'postcss-media-minmax';
import cssnano from 'cssnano';

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_BASE_URL,
  output: 'hybrid',
  vite: {
    ssr: {
      external: [
        'node:buffer',
        'node:path',
        'node:fs',
        'node:os',
        'node:crypto',
        'node:async_hooks',
      ],
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer({ flexbox: 'no-2009' }),
          postcssNested(),
          postcssMediaMinMax(),
          cssnano(),
        ],
      },
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
  devToolbar: {
    enabled: false,
  },
});
