<script setup lang="ts">
import { defineComponent, h } from 'vue';
import { zhCN, dateZhCN, useMessage, useDialog, useNotification, useLoadingBar } from 'naive-ui';
import { RouterView } from 'vue-router';

const NaiveUiConsumer = defineComponent({
  setup() {
    window.$dialog = useDialog();
    window.$message = useMessage();
    window.$notification = useNotification();
    window.$loadingBar = useLoadingBar();
  },
  render() {
    return h(RouterView);
  },
});
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-message-provider>
          <n-notification-provider>
            <NaiveUiConsumer></NaiveUiConsumer>
          </n-notification-provider>
        </n-message-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
