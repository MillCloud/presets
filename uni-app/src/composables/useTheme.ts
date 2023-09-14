import { useStorageAsync } from '@uni-helper/uni-use';
import { ThemeKey } from '@/constants';

export const useTheme = () => {
  const theme = useStorageAsync<'auto' | 'light' | 'dark'>(ThemeKey, 'auto');

  const parsedTheme = computed(() => {
    if (theme.value !== 'auto') return theme.value;
    return usePreferredDark().value ? 'dark' : 'light';
  });

  const toggleTheme = () => {
    if (theme.value === 'auto') {
      theme.value = 'light';
      return;
    }
    if (theme.value === 'light') {
      theme.value = 'dark';
      return;
    }
    theme.value = 'auto';
    return;
  };

  return { theme, parsedTheme, toggleTheme };
};
