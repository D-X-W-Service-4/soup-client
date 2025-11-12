import axiosInstance from './axiosInstance';
import type {
  GetQuestionSetsResponse,
  CreateQuestionSetRequest,
  CreateQuestionSetResponse,
  GradeQuestionSetRequest,
  GradeQuestionSetResponse,
  GetQuestionSetDetailResponse,
  QuestionSetDetailDto,
  QuestionSetSummaryDto,
} from '../types/questionSet';

// 목 데이터 - 문제 세트 요약
const createMockQuestionSetSummary = (): QuestionSetSummaryDto => {
  return {
    questionSetId: 15,
    totalQuestionCount: 10,
    correctCount: 8,
    finishedAt: '2025-11-10T10:30:00',
  };
};

// 목 데이터 - 문제 세트 상세
const createMockQuestionSetDetail = (): QuestionSetDetailDto => {
  return {
    questionSetId: 42,
    totalQuestionCount: 10,
    correctCount: 8,
    finishedAt: '2025-11-10T10:30:00',
    questionSetItems: [
      {
        questionSetItemId: 501,
        question: { questionId: 'M1_1_01_00041_42236' },
        isCorrect: true,
        userAnswer: 'F = ma',
        descriptiveImagePath: 'https://example.com/uploads/answers/answer1.png',
        isTimeout: false,
        essayTypeScore: 4,
        essayTypeScoreText:
          '핵심 개념은 이해했지만 일부 계산 과정이 부족합니다.',
      },
    ],
    createdAt: '2025-11-10T09:00:00',
    updatedAt: '2025-11-10T09:15:00',
  };
};

// GET /v1/question-sets
export const getQuestionSets = async (): Promise<GetQuestionSetsResponse> => {
  try {
    const response =
      await axiosInstance.get<GetQuestionSetsResponse>('/v1/question-sets');
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.warn('⚠️ API 엔드포인트가 준비되지 않아 목 데이터를 사용합니다.');
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            status: 200,
            code: 'SUCCESS',
            message: '요청에 성공했습니다.',
            data: {
              questionSets: [createMockQuestionSetSummary()],
            },
          });
        }, 300);
      });
    }
    throw error;
  }
};

// POST /v1/question-sets
export const createQuestionSet = async (
  request: CreateQuestionSetRequest
): Promise<CreateQuestionSetResponse> => {
  const response = await axiosInstance.post<CreateQuestionSetResponse>(
    '/v1/question-sets',
    request
  );
  return response.data;
};

// POST /v1/question-sets/{questionSetId}/grade
export const gradeQuestionSet = async (
  questionSetId: number,
  request: GradeQuestionSetRequest
): Promise<GradeQuestionSetResponse> => {
  const response = await axiosInstance.post<GradeQuestionSetResponse>(
    `/v1/question-sets/${questionSetId}/grade`,
    request
  );
  return response.data;
};

// GET /v1/question-sets/{questionSetId}
export const getQuestionSetDetail = async (
  questionSetId: number
): Promise<GetQuestionSetDetailResponse> => {
  const response = await axiosInstance.get<GetQuestionSetDetailResponse>(
    `/v1/question-sets/${questionSetId}`
  );
  return response.data;
};
