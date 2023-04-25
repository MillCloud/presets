import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import presetRemToPx from '@unocss/preset-rem-to-px';
import { presetElementPlus } from 'unocss-preset-element-plus';
import { transformerAttributify } from 'unocss-applet';

const isMiniprogram = (process.env.UNI_PLATFORM || 'h5')?.toLowerCase().startsWith('mp') || false;

const presets = [
  presetUno(),
  presetAttributify(),
  presetIcons(),
  presetTypography(),
  presetWebFonts(),
  presetElementPlus({
    selectors: {
      light: ':root,.root,page',
      dark: '.dark,.root.dark',
    },
  }),
];
if (isMiniprogram) presets.push(presetRemToPx());

const transformers = [
  transformerDirectives(),
  transformerVariantGroup(),
  transformerAttributify({ enable: isMiniprogram }),
];

export default defineConfig({
  presets,
  transformers,
});
