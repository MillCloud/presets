import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface CounterState {
  counter: number;
  increase: () => void;
}

export const useCounterStore = create<CounterState>()(
  immer((set, get) => ({
    counter: 0,
    increase: () =>
      set((prev) => {
        prev.counter += 1;
      }),
  })),
);
