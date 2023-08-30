<script setup lang="ts">
/** 分页组件 */
import { DefaultPageSizes } from '@/constants';

defineOptions({
  name: 'VPagination',
});

const props = withDefaults(
  defineProps<{
    /** 每页数据条数 */
    pageSize: number;
    /** 页数 */
    page: number;
    /** 合计数据条数 */
    total: number;
    /** 每页数据条数选项数据 */
    pageSizes?: number[];
  }>(),
  {
    pageSizes: () => DefaultPageSizes,
  },
);

const emit = defineEmits<{
  (event: 'update:pageSize', pageSize: number): void;
  (event: 'update:page', page: number): void;
}>();

const pageSize = computed({
  get: () => props.pageSize,
  set: (newValue) => emit('update:pageSize', newValue),
});

const page = computed({
  get: () => props.page,
  set: (newValue) => emit('update:page', newValue),
});
</script>

<template>
  <n-row>
    <n-col :span="24" class="mt-4 text-right">
      <n-pagination
        v-model:page-size="pageSize"
        v-model:page="page"
        :item-count="total"
        :page-sizes="pageSizes"
      >
        <template #suffix="{ itemCount }"> 共 {{ itemCount }} 条 </template>
      </n-pagination>
    </n-col>
  </n-row>
</template>
