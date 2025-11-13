import axiosInstance from './axiosInstance';

export const registerNickname = async (nickname: string) => {
  const res = await axiosInstance.patch('/v1/users/me/nickname', { nickname });
  return res.data;
};
