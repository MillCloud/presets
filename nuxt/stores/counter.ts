export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCounter: (state) => state.counter * 2,
  },
  actions: {
    increase() {
      this.counter += 1;
    },
  },
});
