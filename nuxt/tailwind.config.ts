import type { Config } from 'tailwindcss';
import { basePreset, elementPlusPreset } from 'tailwind-extensions';
import { iconsPlugin, getIconCollections } from '@egoist/tailwindcss-icons';

const config: Config = {
  content: [
    `{components,layouts,pages,styles}/**/*.{vue,js,jsx,ts,tsx}`,
    `[Aa]pp.{vue,js,jsx,ts,tsx}`,
    `[Ee]rror.{vue,js,jsx,ts,tsx}`,
  ],
  presets: [basePreset, elementPlusPreset()],
  plugins: [iconsPlugin({ collections: getIconCollections('all') })],
};

export default config;
