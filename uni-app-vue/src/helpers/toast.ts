export const showToast = (options: UniApp.ShowToastOptions) =>
  uni.showToast({
    ...options,
  });

export const hideToast = () => uni.hideToast();
