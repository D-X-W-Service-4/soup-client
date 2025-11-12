import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AnswerStore {
  answers: Record<string, string>;
  images: Record<string, string>;

  setAnswer: (id: number | string, data: string | null) => void;
  setImage: (id: number | string, base64: string | null) => void;

  clearAnswer: (id: number | string) => void;
  clearImage: (id: number | string) => void;
  clearAll: () => void;
}

export const useAnswerStore = create<AnswerStore>()(
  persist(
    (set) => ({
      answers: {},
      images: {},

      setAnswer: (id, data) =>
        set((state) => {
          const key = String(id);
          const updated = { ...state.answers };
          if (!data || data.trim() === '' || data === '[]' || data === '{}') {
            delete updated[key];
          } else {
            updated[key] = data;
          }
          return { answers: updated };
        }),

      setImage: (id, base64) =>
        set((state) => {
          const key = String(id);
          const updated = { ...state.images };
          if (!base64) delete updated[key];
          else updated[key] = base64;
          return { images: updated };
        }),

      clearAnswer: (id) =>
        set((state) => {
          const key = String(id);
          const updated = { ...state.answers };
          delete updated[key];
          return { answers: updated };
        }),

      clearImage: (id) =>
        set((state) => {
          const key = String(id);
          const updated = { ...state.images };
          delete updated[key];
          return { images: updated };
        }),

      clearAll: () => set({ answers: {}, images: {} }),
    }),
    {
      name: 'answers-storage',
      partialize: (state) => ({
        answers: state.answers,
        images: state.images,
      }),
    }
  )
);
