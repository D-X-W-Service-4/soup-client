// src/stores/useAnswerStore.ts
import { create } from 'zustand';

interface AnswerStore {
  //캔버스 paths (JSON 문자열) -> 복원용
  answers: Record<string, string>;
  //캡처된 이미지(base64) -> 서버 전송용
  images: Record<string, string>;

  setAnswer: (id: number | string, data: string | null) => void;
  setImage: (id: number | string, base64: string | null) => void;

  clearAnswer: (id: number | string) => void;
  clearImage: (id: number | string) => void;
  clearAll: () => void;
}

export const useAnswerStore = create<AnswerStore>()((set) => ({
  answers: {},
  images: {},

  // 캔버스 paths 저장 (복원용)
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

  //캡처 이미지 저장 (제출용)
  setImage: (id, base64) =>
    set((state) => {
      const key = String(id);
      const updated = { ...state.images };
      if (base64 && base64.length > 50) {
        updated[key] = base64;
      } else {
        delete updated[key];
      }
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
}));
