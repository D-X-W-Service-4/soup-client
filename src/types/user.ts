import type { SoupLevel } from './soup';

// API 응답 공통 타입
export interface ApiResponse<T> {
  status: number;
  code: string;
  message: string;
  data: T;
}

// 유저 정보 타입
export interface UserData {
  email: string;
  nickname: string;
  grade: string;
  term: number;
  studyHours: number;
  workbooks: string;
  soup: SoupLevel;
  solvedQuestionCount: number;
  starredQuestionCount: number;
  plannerAchievementRate: number;
  flameRunDateCount: number;
}

// GET /v1/users/me 응답
export type GetUserResponse = ApiResponse<UserData>;

// PUT /v1/users/me 요청
export interface UpdateUserRequest {
  nickname: string;
  grade: string;
  term: number;
}

// PUT /v1/users/me 응답
export type UpdateUserResponse = ApiResponse<string>;

// POST /v1/users/sign-up 요청
export interface SignUpRequest {
  grade: string;
  term: number;
  lastSubjectUnitId: number;
  studyHours: number;
  workbooks: string[];
}

// POST /v1/users/sign-up 응답
export type SignUpResponse = ApiResponse<string>;

// PATCH /v1/users/me/nickname 요청
export interface UpdateNicknameRequest {
  nickname: string;
}

// PATCH /v1/users/me/nickname 응답
export type UpdateNicknameResponse = ApiResponse<string>;
