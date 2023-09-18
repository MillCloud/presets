<script setup lang="tsx">
import { zhCN, dateZhCN, lightTheme, darkTheme, type GlobalTheme } from 'naive-ui';
import { type ParsedTheme } from '@/composables';

const { parsedTheme } = useTheme();
const themeMapping: Record<ParsedTheme, GlobalTheme> = {
  light: lightTheme,
  dark: darkTheme,
};

const NaiveUiConsumer = defineComponent({
  setup() {
    window.$dialog = useDialog();
    window.$message = useMessage();
    window.$notification = useNotification();
    window.$loadingBar = useLoadingBar();
    return () => <router-view></router-view>;
  },
});
</script>

<template>
  <n-config-provider :theme="themeMapping[parsedTheme]" :locale="zhCN" :date-locale="dateZhCN">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-message-provider>
          <n-notification-provider>
            <NaiveUiConsumer></NaiveUiConsumer>
            <n-global-style></n-global-style>
          </n-notification-provider>
        </n-message-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
