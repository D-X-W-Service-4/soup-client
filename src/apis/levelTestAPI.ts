import axiosInstance from './axiosInstance';
import type {
  GetLevelTestsResponse,
  CreateLevelTestRequest,
  CreateLevelTestResponse,
  GradeLevelTestRequest,
  GradeLevelTestResponse,
  GetLevelTestDetailResponse,
  LevelTestSummary,
  LevelTestDetail,
} from '../types/levelTest';

// 목 데이터 - 레벨 테스트 요약
const createMockLevelTestSummary = (): LevelTestSummary => {
  return {
    levelTestId: 15,
    timeLimit: 30,
    totalQuestionCount: 10,
    correctCount: 8,
    score: 80,
    resultSoup: 'TOMATO',
    finishedAt: '2025-11-10T10:30:00',
  };
};

// 목 데이터 - 레벨 테스트 상세
const createMockLevelTestDetail = (): LevelTestDetail => {
  return {
    levelTestId: 42,
    timeLimit: 30,
    totalQuestionCount: 10,
    correctCount: 8,
    finishedAt: '2025-11-10T10:30:00',
    score: 80,
    resultSoup: 'TOMATO',
    subjectUnits: [
      {
        subjectUnitId: 5,
        name: '정수와 유리수 - 정수와 유리수의 덧셈과 뺄셈',
        grade: 'M2',
        unitNumber: '1-1',
      },
    ],
    levelTestQuestions: [
      {
        levelTestQuestionId: 101,
        questionNumber: 3,
        question: {
          questionId: 'M1_1_01_00041_42236',
        },
        isCorrect: true,
        userAnswer: 'F = ma',
        descriptiveImageUrl: 'https://example.com/uploads/answers/12345.png',
        isTimeout: true,
        essayTypeScore: 5,
        essayTypeScoreText: '핵심 개념을 잘 설명했습니다.',
      },
    ],
    createdAt: '2025-11-10T09:00:00',
    updatedAt: '2025-11-10T09:15:00',
  };
};

// GET /v1/level-tests
export const getLevelTests = async (): Promise<GetLevelTestsResponse> => {
  // 목 데이터
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        code: 'SUCCESS',
        message: '요청에 성공했습니다.',
        data: {
          levelTests: [createMockLevelTestSummary()],
        },
      });
    }, 500);
  });

  // 실제 API 연결 시
  // const response = await axiosInstance.get<GetLevelTestsResponse>(
  //   '/v1/level-tests'
  // );
  // return response.data;
};

// POST /v1/level-tests
export const createLevelTest = async (
  request: CreateLevelTestRequest
): Promise<CreateLevelTestResponse> => {
  // 목 데이터
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('레벨 테스트 생성:', request);
      resolve({
        status: 200,
        code: 'SUCCESS',
        message: '요청에 성공했습니다.',
        data: createMockLevelTestDetail(),
      });
    }, 500);
  });

  // 실제 API 연결 시
  // const response = await axiosInstance.post<CreateLevelTestResponse>(
  //   '/v1/level-tests',
  //   request
  // );
  // return response.data;
};

// POST /v1/level-tests/{levelTestId}/grade
export const gradeLevelTest = async (
  levelTestId: number,
  request: GradeLevelTestRequest
): Promise<GradeLevelTestResponse> => {
  // 목 데이터
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('레벨 테스트 채점:', levelTestId, request);
      resolve({
        status: 200,
        code: 'SUCCESS',
        message: '요청에 성공했습니다.',
        data: 'string',
      });
    }, 500);
  });

  // 실제 API 연결 시
  // const response = await axiosInstance.post<GradeLevelTestResponse>(
  //   `/v1/level-tests/${levelTestId}/grade`,
  //   request
  // );
  // return response.data;
};

// GET /v1/level-tests/{levelTestId}
export const getLevelTestDetail = async (
  levelTestId: number
): Promise<GetLevelTestDetailResponse> => {
  // 목 데이터
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        code: 'SUCCESS',
        message: '요청에 성공했습니다.',
        data: createMockLevelTestDetail(),
      });
    }, 500);
  });

  // 실제 API 연결 시
  // const response = await axiosInstance.get<GetLevelTestDetailResponse>(
  //   `/v1/level-tests/${levelTestId}`
  // );
  // return response.data;
};
