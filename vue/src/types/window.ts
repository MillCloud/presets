import { useLoadingBar, useDialog, useMessage, useNotification } from 'naive-ui';

declare global {
  interface Window {
    $loadingBar: ReturnType<typeof useLoadingBar>;
    $dialog: ReturnType<typeof useDialog>;
    $message: ReturnType<typeof useMessage>;
    $notification: ReturnType<typeof useNotification>;
  }
}

export {};
