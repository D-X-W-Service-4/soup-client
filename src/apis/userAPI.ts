import axiosInstance from './axiosInstance';
import type {
  GetUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  SignUpRequest,
  SignUpResponse,
  UpdateNicknameRequest,
  UpdateNicknameResponse,
  UserData,
} from '../types/user';

// 목 데이터
const createMockUserData = (): UserData => {
  return {
    email: 'soup@example.com',
    nickname: '황수민',
    grade: 'M2',
    term: 1,
    studyHours: 48.5,
    workbooks: '개념 쎈,개념원리',
    soup: 'TOMATO',
    solvedQuestionCount: 15,
    starredQuestionCount: 12,
    plannerAchievementRate: 80,
    flameRunDateCount: 9,
  };
};

// GET /v1/users/me
export const getUser = async (): Promise<GetUserResponse> => {
  try {
    const response = await axiosInstance.get<GetUserResponse>('/v1/users/me');
    return response.data;
  } catch (error: any) {
    // 모든 에러 시 목 데이터 사용 (개발 중)
    console.warn('⚠️ 사용자 정보 API 오류로 목 데이터를 사용합니다.');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 200,
          code: 'SUCCESS',
          message: '요청에 성공했습니다.',
          data: createMockUserData(),
        });
      }, 300);
    });
  }
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
