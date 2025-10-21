/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BASE_URL: string;
  // add other env vars if you use them later (e.g. MODE, PROD)
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
