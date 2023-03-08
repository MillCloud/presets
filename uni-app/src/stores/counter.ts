import { ref, computed } from 'vue';

export const useCounterStore = defineStore('counter', () => {
  const counter = ref(0);
  const doubleCounter = computed(() => counter.value * 2);
  const increase = () => {
    counter.value += 1;
  };
  return { counter, doubleCounter, increase };
});
