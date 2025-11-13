import axiosInstance from './axiosInstance';

export const questionSets = async (questionIds: string[]) => {
  const res = await axiosInstance.post('/v1/question-sets', { questionIds });
  return res.data;
};
