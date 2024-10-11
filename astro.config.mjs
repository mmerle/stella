import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';
import postcssMediaMinMax from 'postcss-media-minmax';
import cssnano from 'cssnano';
import { loadEnv } from 'vite';

// Loading environment variables from .env files
// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
const { PUBLIC_SANITY_STUDIO_PROJECT_ID, PUBLIC_SANITY_STUDIO_DATASET } = loadEnv(
  import.meta.env.MODE,
  process.cwd(),
  '',
);
import { defineConfig } from 'astro/config';

const projectId = PUBLIC_SANITY_STUDIO_PROJECT_ID;
const dataset = PUBLIC_SANITY_STUDIO_DATASET;

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
  integrations: [
    react(),
    sitemap(),
    sanity({
      projectId,
      dataset,
      studioBasePath: '/admin',
      useCdn: false,
    }),
  ],
  devToolbar: {
    enabled: false,
  },
});
