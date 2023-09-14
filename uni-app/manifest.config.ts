import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest';
import shell from 'shelljs';
import { name, description, version } from './package.json';

const shellResult = shell.exec('git tag | wc -l', { silent: true });
const versionCode = shellResult.code === 0 ? Number.parseInt(shellResult.stdout.trim(), 10) : 0;

export default defineManifestConfig({
  name,
  appid: '',
  description,
  versionName: version,
  versionCode: versionCode.toString(),
  transformPx: false,
  networkTimeout: {
    request: 60_000,
    connectSocket: 600_000,
    uploadFile: 60_000,
    downloadFile: 60_000,
  },
  debug: false,
  uniStatistics: {
    enable: false,
  },
  'app-plus': {
    compatible: {
      ignoreVersion: true,
    },
    usingComponents: true,
    splashscreen: {
      alwaysShowBeforeRender: true,
      autoclose: true,
      waiting: true,
      delay: 0,
    },
    modules: {},
    compilerVersion: 3,
    nvueCompiler: 'uni-app',
    nvueLaunchMode: 'normal',
    nvue: {
      'flex-direction': 'column',
    },
    screenOrientation: ['portrait-primary'],
    distribute: {
      android: {
        abiFilters: ['armeabi-v7a', 'arm64-v8a', 'x86'],
        splashscreen: {
          alwaysShowBeforeRender: true,
          autoclose: true,
          waiting: true,
          delay: 0,
        },
        minSdkVersion: 21,
        targetSdkVersion: 26,
        permissionExternalStorage: {
          request: 'once',
          prompt:
            '应用保存运行状态等信息，需要获取读写手机存储权限，系统可能提示为访问设备上的照片、媒体内容和文件，请允许。',
        },
        permissionPhoneState: {
          request: 'once',
          prompt:
            '为保证正常安全使用，需要获取设备识别码使用权限，系统可能提示为获取手机号码，请允许。',
        },
        permissions: [
          '<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>',
          '<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>',
          '<uses-permission android:name="android.permission.INSTALL_PACKAGES"/>',
          '<uses-permission android:name="android.permission.INTERNET"/>',
          '<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>',
          '<uses-permission android:name="android.permission.READ_PHONE_STATE"/>',
          '<uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES"/>',
          '<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>',
          '<uses-permission android:name="com.asus.msa.SupplementaryDID.ACCESS"/>',
          '<uses-permission android:name="com.huawei.android.launcher.permission.CHANGE_BADGE"/>',
        ],
      },
      ios: {},
      // @ts-expect-error type lost
      splashscreen: {
        useOriginalMsgbox: true,
      },
      sdkConfigs: {
        ad: {},
      },
    },
  },
  h5: {},
  'mp-weixin': {
    appid: 'touristappid',
    usingComponents: true,
    libVersion: '2.16.1',
    permission: {},
    setting: {
      es6: false,
      enhance: false,
      // @ts-expect-error type lost
      nodeModules: false,
      postcss: false,
      minifyWXSS: false,
      minified: false,
      uglifyFileName: false,
      urlCheck: true,
      showShadowRootInWxmlPanel: true,
      preloadBackgroundData: false,
      compileHotReLoad: false,
      bundle: false,
      checkSiteMap: false,
      checkInvalidKey: false,
    },
  },
  'mp-alipay': {
    usingComponents: true,
    component2: true,
    axmlStrictCheck: false,
    enableParallelLoader: true,
    enableAppxNg: true,
  },
  'mp-baidu': {
    appid: '',
    usingComponents: true,
    setting: {
      urlCheck: true,
    },
  },
  'mp-toutiao': {
    appid: '',
    usingComponents: true,
    permission: {},
    setting: {
      es6: false,
      minified: false,
      urlCheck: true,
    },
  },
  'mp-qq': {
    appid: '',
    usingComponents: true,
    permission: {},
  },
  'quickapp-webview': {
    icon: '/static/logo.png',
    package: 'cn.millcloud',
    versionName: version,
    versionCode,
  },
  'quickapp-webview-union': {
    minPlatformVersion: 1063,
  },
  'quickapp-webview-huawei': {
    minPlatformVersion: 1070,
  },
  vueVersion: '3',
});
