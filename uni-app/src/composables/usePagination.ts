import { useStorageAsync } from '@uni-helper/uni-use';
import { DefaultPageSize, PageSizeKey, DefaultPageSizes } from '@/constants';

export const usePagination = (
  initialCurrentPage = 1,
  initialPageSize = DefaultPageSize,
  initialTotal = 0,
) => {
  const currentPage = ref(initialCurrentPage);
  const pageSize = useStorageAsync(PageSizeKey, initialPageSize);
  const total = ref(initialTotal);
  watch(pageSize, () => {
    currentPage.value = 1;
  });
  return {
    currentPage,
    page: currentPage,
    pageSize,
    pageSizes: DefaultPageSizes,
    total,
  };
};
