import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
  type Preset,
  type SourceCodeTransformer,
} from 'unocss';
import presetRemToPx from '@unocss/preset-rem-to-px';
import { presetUni } from '@uni-helper/unocss-preset-uni';
// import { presetAntd } from 'unocss-preset-antd';
// import { presetElementPlus } from 'unocss-preset-element-plus';
// import { presetNaiveUi } from 'unocss-preset-naive-ui';
import { isMp } from '@uni-helper/uni-env';

const presets: Preset[] = [
  presetUni({ remRpx: false }),
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
if (isMp) {
  presets.push(presetRemToPx());
}

const transformers: SourceCodeTransformer[] = [transformerDirectives(), transformerVariantGroup()];

const config = defineConfig({
  presets,
  transformers,
});

export default config;
