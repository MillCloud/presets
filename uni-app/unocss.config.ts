import { defineConfig, presetIcons } from 'unocss';

export default defineConfig({
  presets: [presetIcons()],
  safelist: ['dark'],
});
