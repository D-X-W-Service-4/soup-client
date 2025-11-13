import axiosInstance from './axiosInstance';
import type {
  GetUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  SignUpRequest,
  SignUpResponse,
  UpdateNicknameRequest,
  UpdateNicknameResponse,
} from '../types/user';

// GET /v1/users/me
export const getUser = async (): Promise<GetUserResponse> => {
  const response = await axiosInstance.get<GetUserResponse>('/v1/users/me');
  return response.data;
};

// PUT /v1/users/me
export const updateUser = async (
  userData: UpdateUserRequest
): Promise<UpdateUserResponse> => {
  const response = await axiosInstance.put<UpdateUserResponse>(
    '/v1/users/me',
    userData
  );
  return response.data;
};

// POST /v1/users/sign-up
export const signUp = async (
  signUpData: SignUpRequest
): Promise<SignUpResponse> => {
  const response = await axiosInstance.post<SignUpResponse>(
    '/v1/users/sign-up',
    signUpData
  );
  return response.data;
};

// PATCH /v1/users/me/nickname
export const updateNickname = async (
  nicknameData: UpdateNicknameRequest
): Promise<UpdateNicknameResponse> => {
  const response = await axiosInstance.patch<UpdateNicknameResponse>(
    '/v1/users/me/nickname',
    nicknameData
  );
  return response.data;
};
