// 小程序更新见 https://uniapp.dcloud.io/api/other/update?id=getupdatemanager
// 整包更新见 https://ask.dcloud.net.cn/article/34972
// 热更新见 https://ask.dcloud.net.cn/article/35667
import { hideLoading, showLoading } from './loading';
import { showModal } from './modal';
import { unInstance } from './network';
import manifest from '@/manifest.json';

/* #ifdef APP-PLUS */
const removeInstalledResources = () => {
  plus.io.requestFileSystem(plus.io.PUBLIC_DOWNLOADS, (fs) => {
    const directoryReader = fs.root?.createReader();
    if (directoryReader) {
      // @ts-expect-error wrong types
      directoryReader.readEntries((entries: (PlusIoDirectoryEntry | PlusIoFileEntry)[]) => {
        const apkFiles = entries.filter(
          (entry) =>
            entry?.isFile &&
            (entry?.name?.toUpperCase()?.endsWith('.APK') ||
              entry?.name?.toUpperCase()?.endsWith('.WGT') ||
              entry?.name?.toUpperCase()?.endsWith('.WGTU')) &&
            entry?.name?.toUpperCase()?.includes('ECARD'),
        ) as PlusIoFileEntry[];
        for (const apkFile of apkFiles) apkFile.remove();
      });
    }
  });
};
/* #endif */

// eslint-disable-next-line sonarjs/cognitive-complexity
export const getUpdate = ({ hasLoading = false } = {}) => {
  /* #ifdef MP */
  const updater = uni.getUpdateManager();
  updater.onCheckForUpdate(({ hasUpdate }) => {
    if (!hasUpdate) {
      if (hasLoading) {
        showModal({
          content: '已经是最新版本。',
        });
      }
      return;
    }
    updater.onUpdateReady(() => {
      showModal({
        content: '新版本应用已经准备完毕，请重启应用。',
        success: ({ confirm }) => {
          if (confirm) {
            updater.applyUpdate();
          }
        },
      });
    });
  });
  /* #endif */
  /* #ifdef APP-PLUS */
  removeInstalledResources();
  if (hasLoading) {
    showLoading({
      title: '更新中，请稍候',
    });
  }
  const { platform } = uni.getSystemInfoSync();
  plus.runtime.getProperty(plus.runtime.appid || '', (widgetInfo) => {
    unInstance<IUnResponseData, IUnRequestData>({
      // TODO 补充链接
      url: '',
      data: {
        platform,
        app_id:
          widgetInfo.appid && widgetInfo.appid.includes('HBuilder')
            ? manifest.appid
            : widgetInfo.appid,
        version: widgetInfo.version,
      },
    }).then((response) => {
      if (response.data?.success) {
        // 请求成功
        if (response.data?.update) {
          // 有更新
          if (response.data?.hot_url) {
            // 热更新
            uni.downloadFile({
              url: response.data.hot_url,
              success: ({ tempFilePath, statusCode }) => {
                if (statusCode >= 200 && statusCode < 300) {
                  plus.runtime.install(
                    tempFilePath,
                    { force: false },
                    () => {
                      if (hasLoading) {
                        hideLoading();
                      }
                      showModal({
                        content: `新版本应用 ${response.data?.version} 已经准备完毕，请重启应用。${
                          response.data?.note ? `\r\n更新信息：${response.data.note}` : ''
                        }`,
                        success: ({ confirm }) => {
                          if (confirm) {
                            plus.runtime.restart();
                          }
                        },
                      });
                    },
                    () => {
                      if (hasLoading) {
                        hideLoading();
                        showModal({
                          content: `新版本应用 ${response.data?.version} 安装失败，请稍候再试。`,
                        });
                      }
                    },
                  );
                }
              },
            });
          } else if (platform === 'ios') {
            // iOS 整包更新需要打开 AppStore 引导用户更新
            // TODO 补充链接
            // plus.runtime.openURL();
          } else {
            // Android 整包更新可直接获取并安装
            uni.downloadFile({
              url: response.data.pkg_url,
              success: ({ tempFilePath, statusCode }) => {
                if (statusCode >= 200 && statusCode < 300) {
                  if (hasLoading) {
                    hideLoading();
                  }
                  showModal({
                    content: `新版本应用 ${response.data?.version} 已经下载完毕，请安装更新应用。${
                      response.data?.note ? `\r\n更新信息：${response.data?.note}` : ''
                    }`,
                    success: ({ confirm }) => {
                      if (confirm) {
                        plus.runtime.install(tempFilePath, { force: true });
                      }
                    },
                  });
                }
              },
            });
          }
        } else if (hasLoading) {
          // 没有更新
          hideLoading();
          showModal({
            content: '已经是最新版本。',
          });
        }
      } else if (hasLoading) {
        // 请求失败
        hideLoading();
        showModal({
          content: `无法检查更新，是否重试？`,
          showCancel: true,
          success: ({ confirm }) => {
            if (confirm) {
              getUpdate();
            }
          },
        });
      }
    });
  });
  /* #endif */
};
