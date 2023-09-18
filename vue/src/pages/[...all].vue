<template>
  <n-card>
    <n-result status="404" title="我们是怎么来到这里的？">
      <template #footer>
        <n-space justify="center">
          <n-button @click="$router.back()">返回上一页</n-button>
          <n-button @click="$router.replace('/dashboard')">返回控制台</n-button>
        </n-space>
      </template>
    </n-result>
  </n-card>
</template>
