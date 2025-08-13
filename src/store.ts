import { create } from 'zustand';
import type { Store } from './types';

export const useStore = create<Store>((set) => ({
  data: '',
  setData: (newData) => set({ data: newData }),
}));
