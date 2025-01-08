/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL: string;
  // Add other env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
