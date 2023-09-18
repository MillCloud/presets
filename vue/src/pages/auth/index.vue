<script setup lang="ts">
import { AuthSignIn, AuthReset } from './components';

defineOptions({
  name: 'AuthIndex',
});
definePage({
  name: 'AuthIndex',
});

const mode = ref<'sign-in' | 'reset'>('sign-in');
const componentMapping = {
  'sign-in': AuthSignIn,
  reset: AuthReset,
};
const handleToggleMode = () => {
  mode.value = mode.value === 'reset' ? 'sign-in' : 'reset';
};
</script>

<template>
  <n-grid x-gap="8" y-gap="8" cols="1">
    <n-gi class="text-center">
      <n-h6>登录页 SignIn</n-h6>
      <n-p>你可以在这里做账号密码登录、第三方登录、忘记密码等操作</n-p>
      <n-button @click="$router.push('/dashboard')">点击前往控制台页面 Dashboard</n-button>
    </n-gi>
    <n-gi class="mt-8">
      <v-transition>
        <keep-alive>
          <component :is="componentMapping[mode]" @toggle="handleToggleMode"></component>
        </keep-alive>
      </v-transition>
    </n-gi>
  </n-grid>
</template>
