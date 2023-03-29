import type { Config } from 'tailwindcss';
import { basePreset, elementPlusPreset } from 'tailwind-extensions';
import { iconsPlugin, getIconCollections } from '@egoist/tailwindcss-icons';

const config: Config = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  presets: [basePreset, elementPlusPreset()],
  plugins: [iconsPlugin({ collections: getIconCollections('all') })],
};

export default config;
