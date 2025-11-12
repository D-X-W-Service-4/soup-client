import { create } from 'zustand/react';

interface UserStoreState {
  nickname: string;
  grade: string;
  term: string;
  lastStudiedUnit: string;
  studyHours: string;

  setNickname: (nickname: string) => void;
  setGrade: (grade: string) => void;
  setTerm: (term: string) => void;
  setLastStudiedUnit: (lastStudiedUnit: string) => void;
  setStudyHours: (studyTime: string) => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
  nickname: '',
  grade: '',
  term: '',
  lastStudiedUnit: '',
  studyHours: '',
  setNickname: (nickname) => set({ nickname }),
  setGrade: (grade) => set({ grade }),
  setTerm: (term) => set({ term }),
  setStudyHours: (studyHours) => set({ studyHours }),
  setLastStudiedUnit: (lastStudiedUnit) => set({ lastStudiedUnit }),
}));
