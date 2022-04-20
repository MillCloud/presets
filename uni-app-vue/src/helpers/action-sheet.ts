export const showActionSheet = (options: UniApp.ShowActionSheetOptions) =>
  uni.showActionSheet({
    itemColor: '#303133',
    ...options,
  });
