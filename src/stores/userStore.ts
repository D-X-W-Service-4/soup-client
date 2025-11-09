import { create } from 'zustand/react';

interface UserStoreState {
  nickname: string;
  grade: string;
  term: string;
  lastStudiedUnit: string;
  studyTime: string;

  setNickname: (nickname: string) => void;
  setGrade: (grade: string) => void;
  setTerm: (term: string) => void;
  setLastStudiedUnit: (lastStudiedUnit: string) => void;
  setStudyTime: (studyTime: string) => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
  nickname: '',
  grade: '',
  term: '',
  lastStudiedUnit: '',
  studyTime: '',
  setNickname: (nickname) => set({ nickname }),
  setGrade: (grade) => set({ grade }),
  setTerm: (term) => set({ term }),
  setStudyTime: (studyTime) => set({ studyTime }),
  setLastStudiedUnit: (lastStudiedUnit) => set({ lastStudiedUnit }),
}));
