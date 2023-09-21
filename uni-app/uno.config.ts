import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
  type Preset,
  type SourceCodeTransformer,
} from 'unocss';
import presetRemToPx from '@unocss/preset-rem-to-px';
// import { presetAntd } from 'unocss-preset-antd';
// import { presetElementPlus } from 'unocss-preset-element-plus';
// import { presetNaiveUi } from 'unocss-preset-naive-ui';
import { transformerApplet, transformerAttributify } from 'unocss-applet';
import { isMp, isQuickapp } from '@uni-helper/uni-env';

const presets: Preset[] = [
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
if (isMp || isQuickapp) {
  presets.push(presetRemToPx());
}

const transformers: SourceCodeTransformer[] = [transformerDirectives(), transformerVariantGroup()];
if (isMp || isQuickapp) {
  transformers.push(transformerApplet(), transformerAttributify({ enable: isMp }));
}

const config = defineConfig({
  presets,
  transformers,
});

export default config;
