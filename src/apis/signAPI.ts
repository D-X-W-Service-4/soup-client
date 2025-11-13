import axiosInstance from './axiosInstance.ts';

export interface SignUpRequest {
  grade: string; // "M1" | "M2" | "M3"
  term: number; // 0 (1학기), 1 (2학기)
  lastSubjectUnitId: number; // 단원 ID
  studyHours: number; // 하루 공부 시간
  workbooks: string[]; // 선택한 문제집 제목 배열
}

export const signUp = async (data: SignUpRequest) => {
  const res = await axiosInstance.post('/v1/users/sign-up', data);
  return res.data;
};
