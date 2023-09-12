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
// import { presetAntd } from 'unocss-preset-antd';
// import { presetElementPlus } from 'unocss-preset-element-plus';
// import { presetNaiveUi } from 'unocss-preset-naive-ui';
import { transformerAttributify } from 'unocss-applet';

const isMiniprogram = (process.env.UNI_PLATFORM || 'h5')?.toLowerCase().startsWith('mp') || false;

const presets = [
  presetUno(),
  presetAttributify(),
  presetIcons(),
  presetTypography(),
  presetWebFonts(),
  // presetAntd(),
  // presetElementPlus({
  //   preferCssVariables: false,
  //   selectors: {
  //     light: ':root,page,.root,page',
  //     dark: '.dark,.root.dark',
  //   },
  // }),
  // presetNaiveUi({
  //   preferCssVariables: false,
  //   selectors: {
  //     light: ':root,page,.root,page',
  //     dark: '.dark,.root.dark',
  //   },
  // }),
];
if (isMiniprogram) presets.push(presetRemToPx());

const transformers = [
  transformerDirectives(),
  transformerVariantGroup(),
  transformerAttributify({ enable: isMiniprogram }),
];

const config = defineConfig({
  presets,
  transformers,
});

export default config;
