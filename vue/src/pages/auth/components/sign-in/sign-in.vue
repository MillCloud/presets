<script setup lang="ts">
import type { FormRules, FormInst } from 'naive-ui';
import { UserOutlined, LockOutlined } from '@vicons/antd';

defineOptions({
  name: 'AuthSignIn',
});

const emit = defineEmits<{
  (event: 'toggle'): void;
}>();

const message = useMessage();

const formRef = ref<FormInst>();
const formModel = ref({
  username: '',
  password: '',
  autoSignIn: false,
});
const formRules: FormRules = {
  username: {
    required: true,
    trigger: 'blur',
    message: UsernameRequireErrorMessage,
  },
  password: {
    required: true,
    trigger: 'blur',
    message: PasswordRequireErrorMessage,
  },
};

const handleSubmit = () => {
  if (!formRef.value) return;
  formRef.value
    .validate()
    .then(() => {
      message.success('校验通过');
    })
    .catch((error) => {
      console.error('validate error', error);
    });
};

const handleForgetPassword = () => {
  emit('toggle');
};
</script>

<template>
  <n-card class="mx-auto max-w-320px">
    <n-tabs justify-content="center">
      <n-tab-pane name="sign-in" tab="登录"></n-tab-pane>
    </n-tabs>
    <n-form ref="formRef" label-placement="left" :model="formModel" :rules="formRules">
      <n-form-item path="username">
        <n-input
          v-model:value="formModel.username"
          placeholder="账号"
          clearable
          @keyup.enter="handleSubmit"
        >
          <template #prefix>
            <n-icon><UserOutlined /></n-icon>
          </template>
        </n-input>
      </n-form-item>
      <n-form-item path="password">
        <n-input
          v-model:value="formModel.password"
          placeholder="密码"
          type="password"
          clearable
          show-password-on="click"
          @keyup.enter="handleSubmit"
        >
          <template #prefix>
            <n-icon><LockOutlined /></n-icon>
          </template>
        </n-input>
      </n-form-item>
      <n-form-item>
        <n-checkbox v-model:checked="formModel.autoSignIn">下次自动登录</n-checkbox>
        <v-spacer></v-spacer>
        <n-button quaternary @click="handleForgetPassword">忘记密码</n-button>
      </n-form-item>
      <n-form-item>
        <n-button class="w-full" type="primary" @click="handleSubmit">登录</n-button>
      </n-form-item>
    </n-form>
  </n-card>
</template>
