import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
  test: {
    environmentMatchGlobs: [
      ['**/{constants,helpers,utils}/**', 'node'],
      ['!**/{constants,helpers,utils}/**', 'happy-dom'],
    ],
  },
});
