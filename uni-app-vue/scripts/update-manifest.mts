import fs from 'node:fs';
import pkg from '../package.json';
import manifest from '../src/manifest.json';

manifest.versionName = pkg.version;
manifest.versionCode = (Number.parseInt(manifest.versionCode, 10) + 1).toString();

if (manifest['quickapp-webview']) {
  manifest['quickapp-webview'].versionName = manifest.versionName;
  manifest['quickapp-webview'].versionCode = manifest.versionCode;
}

fs.writeFileSync('./src/manifest.json', `${JSON.stringify(manifest, null, 2)}\n`);
