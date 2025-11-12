import axiosInstance from './axiosInstance';
import type {
  GetLevelTestsResponse,
  CreateLevelTestRequest,
  CreateLevelTestResponse,
  GradeLevelTestRequest,
  GradeLevelTestResponse,
  GetLevelTestDetailResponse,
  LevelTestSummaryDto,
  LevelTestDetailDto,
} from '../types/levelTest';

// 목 데이터 - 레벨 테스트 요약
const createMockLevelTestSummary = (): LevelTestSummaryDto => {
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
const createMockLevelTestDetail = (): LevelTestDetailDto => {
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
        grade: 'M2',
        term: 1,
        unitName: '정수와 유리수의 덧셈과 뺄셈',
      },
    ],
    levelTestQuestions: [
      {
        levelTestQuestionId: 101,
        questionNumber: 3,
        question: {
          questionId: 1,
          subjectUnit: {
            subjectUnitId: 5,
            grade: 'M2',
            term: 1,
            unitName: '정수와 유리수의 덧셈과 뺄셈',
          },
          questionImagePath: '/images/questions/q1.png',
          solutionImagePath: '/images/solutions/s1.png',
        },
        isCorrect: true,
        userAnswer: 'F = ma',
        descriptiveImagePath: 'https://example.com/uploads/answers/12345.png',
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
