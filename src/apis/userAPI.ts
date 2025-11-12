import axiosInstance from './axiosInstance';

interface SignUpRequest {
  grade: string;
  term: number;
  lastSubjectUnitId: number;
  studyHours: number;
  workbooks: string[];
}

export const createsignUp = async (data: SignUpRequest) => {
  const res = await axiosInstance.post('/v1/users/sign-up', data);
  return res.data;
};
