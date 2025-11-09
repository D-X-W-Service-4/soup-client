import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AnswerStore {
  answers: Record<number, string>;
  setAnswer: (id: number, data: string | null) => void;
  clearAnswer: (id: number) => void;
  clearAll: () => void;
}

export const useAnswerStore = create<AnswerStore>()(
  persist(
    (set) => ({
      answers: {},

      setAnswer: (id, data) =>
        set((state) => {
          const updated = { ...state.answers };
          if (
            data === null ||
            data.trim() === '' ||
            data === '[]' ||
            data === '{}'
          ) {
            delete updated[id];
          } else {
            updated[id] = data;
          }
          return { answers: updated };
        }),

      clearAnswer: (id) =>
        set((state) => {
          const updated = { ...state.answers };
          delete updated[id];
          return { answers: updated };
        }),

      clearAll: () => set({ answers: {} }),
    }),
    {
      name: 'answers-storage',
      partialize: (state) => ({
        answers: state.answers,
      }),
    }
  )
);
