import { create } from 'zustand/react';

interface UserStoreState {
  nickname: string;
  grade: string;
  semester: string;
  studyTime: string;
  setNickname: (nickname: string) => void;
  setGrade: (grade: string) => void;
  setSemester: (semester: string) => void;
  setStudyTime: (studyTime: string) => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
  nickname: '',
  grade: '',
  semester: '',
  studyTime: '',
  setNickname: (nickname) => set({ nickname }),
  setGrade: (grade) => set({ grade }),
  setSemester: (semester) => set({ semester }),
  setStudyTime: (studyTime) => set({ studyTime }),
}));
