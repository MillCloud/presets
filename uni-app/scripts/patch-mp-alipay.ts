import { existsSync, readdirSync, readFileSync, writeFileSync, lstatSync } from 'node:fs';
import { resolve } from 'node:path';
import { logger, root } from './helpers';

const pagesDirPath = resolve(root, 'dist', 'mp-alipay', 'pages');

logger.info('开始更新 dist/mp-alipay/pages/**/*.axml。');

const handleAddPageMeta = (dirPath = pagesDirPath) => {
  if (!existsSync(dirPath)) {
    logger.info(`文件夹 ${dirPath} 不存在，跳过更新。`);
    return;
  }
  const paths = readdirSync(dirPath).map((p) => resolve(dirPath, p));
  const axmls = paths.filter((p) => p.endsWith('.axml') && lstatSync(p).isFile());
  for (const axml of axmls) {
    const content = readFileSync(axml, {
      encoding: 'utf8',
    });
    if (!content.startsWith('<page-meta root-font-size="16px"></page-meta>')) {
      writeFileSync(axml, `<page-meta root-font-size="16px"></page-meta>${content}`);
    }
  }
  logger.info(`已更新 ${dirPath} 文件夹下 ${axmls.length} 个 .axml 文件。`);
  const dirs = paths.filter((p) => lstatSync(p).isDirectory());
  for (const dir of dirs) {
    handleAddPageMeta(resolve(dirPath, dir));
  }
};

handleAddPageMeta(resolve(root, 'dist', 'mp-alipay', 'pages'));
