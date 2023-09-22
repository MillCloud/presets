<script setup lang="ts">
import { focusManager, onlineManager } from '@tanstack/vue-query';

onLaunch(() => {
  console.log('App Launch');
});
onShow(() => {
  console.log('App Show');
});
onHide(() => {
  console.log('App Hide');
});

const isOnline = useOnline();
watchEffect(() => {
  onlineManager.setOnline(isOnline.value);
});

onShow(() => {
  focusManager.setFocused(true);
});
onHide(() => {
  focusManager.setFocused(false);
});
</script>
