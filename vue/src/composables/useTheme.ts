import { useOsTheme } from 'naive-ui';

export type Theme = 'auto' | 'light' | 'dark';
export type ParsedTheme = 'light' | 'dark';

export const useTheme = () => {
  const osTheme = useOsTheme();
  const theme = useStorage<Theme>('theme', 'auto');
  const parsedTheme = computed<ParsedTheme>(() => {
    if (theme.value === 'auto') return osTheme.value ?? 'light';
    return theme.value;
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
  };
  return { theme, parsedTheme, toggleTheme };
};
