import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }), 
    react(), 
    partytown()
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
    routing: {
      prefixDefaultLocale: false
    }
  },
  vite: {
    ssr: {
      noExternal: ['@astrojs/tailwind']
    },
    resolve: {
      alias: {
        '@icons': '/src/icons'
      }
    }
  }
});
