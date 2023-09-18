<script setup lang="ts">
defineOptions({
  name: 'AuthReset',
});
import type { FormRules, FormInst } from 'naive-ui';
import { SafetyOutlined, LockOutlined, MailOutlined } from '@vicons/antd';

const emit = defineEmits<{
  (event: 'toggle'): void;
}>();

const message = useMessage();

const formRef = ref<FormInst>();
const formModel = ref({
  email: '',
  captcha: '',
  password: '',
});
const formRules: FormRules = {
  email: {
    required: true,
    trigger: 'blur',
    validator: (rule, value: string) => {
      if (!value) return new Error(EmailRequireErrorMessage);
      if (!validateEmail(value)) return new Error(EmailRegExpErrorMessage);
      return true;
    },
  },
  captcha: {
    required: true,
    trigger: 'blur',
    message: CaptchaRequireErrorMessage,
  },
  password: {
    required: true,
    trigger: 'blur',
    validator: (rule, value: string) => {
      if (!value) return new Error(PasswordRequireErrorMessage);
      if (!validatePassword(value)) return new Error(PasswordRegExpErrorMessage);
      return true;
    },
  },
};

const captchaCounter = ref(false);
const isRequestCaptchaButtonDisabled = computed(() => captchaCounter.value);
const handleRequestCaptcha = () => {
  if (!formRef.value) return;
  formRef.value
    .validate(undefined, (rule) => rule.key === 'email')
    .then(() => {
      message.success('发送验证码成功，请查看邮箱');
      captchaCounter.value = true;
    })
    .catch((error) => {
      console.error('validate error', error);
    });
};
const handleRemoveCaptchaCounter = () => {
  captchaCounter.value = false;
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
const handleSignIn = () => {
  emit('toggle');
};
</script>

<template>
  <n-card class="mx-auto max-w-320px">
    <n-tabs justify-content="center">
      <n-tab-pane name="sign-in" tab="重置密码"></n-tab-pane>
    </n-tabs>
    <n-form ref="formRef" label-placement="left" :model="formModel" :rules="formRules">
      <n-form-item path="email">
        <n-input
          v-model:value="formModel.email"
          placeholder="邮箱"
          clearable
          @keyup.enter="handleSubmit"
        >
          <template #prefix>
            <n-icon><MailOutlined /></n-icon>
          </template>
        </n-input>
      </n-form-item>
      <n-form-item path="captcha">
        <n-space :wrap="false">
          <n-input
            v-model:value="formModel.captcha"
            placeholder="验证码"
            clearable
            @keyup.enter="handleSubmit"
          >
            <template #prefix>
              <n-icon><SafetyOutlined /></n-icon>
            </template>
          </n-input>
          <n-button :disabled="isRequestCaptchaButtonDisabled" @click="handleRequestCaptcha">
            <n-countdown
              v-if="captchaCounter"
              active
              :duration="60000"
              :render="({ minutes, seconds }) => `${minutes * 60 + seconds} 秒后重试`"
              @finish="handleRemoveCaptchaCounter"
            ></n-countdown>
            <template v-else>获取验证码</template>
          </n-button>
        </n-space>
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
        <v-spacer></v-spacer>
        <n-button quaternary @click="handleSignIn">登录</n-button>
      </n-form-item>
      <n-form-item>
        <n-button class="w-full" type="primary" @click="handleSubmit">重置密码</n-button>
      </n-form-item>
    </n-form>
  </n-card>
</template>
