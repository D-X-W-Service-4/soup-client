import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AnswerStore {
  answers: Record<number, string>;
  setAnswer: (id: number, data: string) => void;
}

export const useAnswerStore = create<AnswerStore>()(
  persist(
    (set) => ({
      answers: {},
      setAnswer: (id, data) =>
        set((state) => ({
          answers: { ...state.answers, [id]: data },
        })),
    }),
    { name: 'answers-storage' }
  )
);
