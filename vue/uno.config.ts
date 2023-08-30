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
import { presetNaiveUi } from 'unocss-preset-naive-ui';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts(),
    presetNaiveUi(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
