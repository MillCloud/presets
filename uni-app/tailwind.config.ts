import type { Config } from 'tailwindcss';
import { basePreset, elementPlusPreset, miniprogramBasePreset } from 'tailwind-extensions';
import { iconsPlugin, getIconCollections } from '@egoist/tailwindcss-icons';

const config: Config = {
  presets: [
    basePreset,
    elementPlusPreset({
      baseSelectors: [':root', 'page'],
    }),
    miniprogramBasePreset,
  ],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [iconsPlugin({ collections: getIconCollections('all') })],
  theme: {
    screens: {},
  },
};

export default config;
