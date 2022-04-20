export const showModal = (options: UniApp.ShowModalOptions) =>
  uni.showModal({
    title: '提示',
    cancelColor: '#303133',
    confirmColor: '#409eff',
    ...options,
  });
