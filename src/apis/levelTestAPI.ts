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
        unitNumber: '1-1',
        name: '정수와 유리수의 덧셈과 뺄셈',
      },
    ],
    levelTestQuestions: [
      {
        levelTestQuestionId: 101,
        questionNumber: 3,
        question: {
          questionId: 'M1_1_01_00041_42236',
          filename: 'string',
          subjectUnit: {
            subjectUnitId: 5,
            name: '정수와 유리수 - 정수와 유리수의 덧셈과 뺄셈',
            grade: 'M2',
            unitNumber: '1-1',
          },
          difficulty: 0,
          topic: 'string',
          questionType: 'string',
          questionFormat: 'string',
          text: 'string',
          answer: 'string',
          answerText: 'string',
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
  try {
    const response =
      await axiosInstance.get<GetLevelTestsResponse>('/v1/level-tests');
    return response.data;
  } catch (error: any) {
    console.warn('레벨 테스트 목록 조회 API 오류로 목 데이터를 사용합니다.');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 200,
          code: 'SUCCESS',
          message: '요청에 성공했습니다.',
          data: {
            levelTests: [
              createMockLevelTestSummary(),
              {
                ...createMockLevelTestSummary(),
                levelTestId: 16,
                score: 90,
                correctCount: 9,
              },
              {
                ...createMockLevelTestSummary(),
                levelTestId: 17,
                score: 70,
                correctCount: 7,
              },
            ],
          },
        });
      }, 500);
    });
  }
};

// POST /v1/level-tests
export const createLevelTest = async (
  request: CreateLevelTestRequest
): Promise<CreateLevelTestResponse> => {
  const response = await axiosInstance.post<CreateLevelTestResponse>(
    '/v1/level-tests',
    request
  );
  return response.data;
};

// POST /v1/level-tests/{levelTestId}/grade
export const gradeLevelTest = async (
  levelTestId: number,
  request: GradeLevelTestRequest
): Promise<GradeLevelTestResponse> => {
  const response = await axiosInstance.post<GradeLevelTestResponse>(
    `/v1/level-tests/${levelTestId}/grade`,
    request
  );
  return response.data;
};

// GET /v1/level-tests/{levelTestId}
export const getLevelTestDetail = async (
  levelTestId: number
): Promise<GetLevelTestDetailResponse> => {
  try {
    const response = await axiosInstance.get<GetLevelTestDetailResponse>(
      `/v1/level-tests/${levelTestId}`
    );
    return response.data;
  } catch (error: any) {
    console.warn('레벨 테스트 상세 조회 API 오류로 목 데이터를 사용합니다.');
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
  }
};
