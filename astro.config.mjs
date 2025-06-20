// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: 'server',
  adapter: netlify(),
  i18n: {
    defaultLocale: 'ar',
    locales: ['ar', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  build: {
    // Enable asset optimization
    assets: '_astro',
    // Inline small assets
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Optimize chunks
      rollupOptions: {
        output: {
          // Separate vendor chunks for better caching
          manualChunks: {
            vendor: ['@supabase/supabase-js'],
          },
        },
      },
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ['@supabase/supabase-js'],
    },
  }
});