import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import pkg from '../package.json';
import manifest from '../src/manifest.json';
import { root, logger } from './helpers';

const handleUpdateManifestVersion = () => {
  if (manifest.versionName === pkg.version) {
    logger.warn(
      '检查到 manifest.json versionName 字段和 package.json version 字段一致，只更新 manifest.json versionCode 字段。',
    );
  }
  manifest.versionName = pkg.version;
  manifest.versionCode = (Number.parseInt(manifest.versionCode, 10) + 1).toString();

  if (manifest['quickapp-webview']) {
    if (manifest['quickapp-webview'].versionName === manifest.versionName) {
      logger.warn(
        '检查到 manifest.json quickapp-webview versionName 字段和 package.json version 字段一致，只更新 manifest.json quickapp-webview versionCode 字段。',
      );
    }
    manifest['quickapp-webview'].versionName = manifest.versionName;
    manifest['quickapp-webview'].versionCode = Number.parseInt(manifest.versionCode);
  }

  writeFileSync(resolve(root, 'src', 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);

  logger.info('已更新 manifest.json versionName 和 versionCode。');
};

handleUpdateManifestVersion();
