export const showModal = (options: UniApp.ShowModalOptions) =>
  uni.showModal({
    title: '提示',
    showCancel: false,
    ...options,
  });
