export const showLoading = (options: UniApp.ShowLoadingOptions) => {
  uni.showLoading({
    title: '加载中',
    mask: true,
    ...options,
  });
  return () => uni.hideLoading();
};

export const hideLoading = () => uni.hideLoading();
