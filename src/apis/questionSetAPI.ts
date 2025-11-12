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
        question: {
          questionId: 1,
          subjectUnit: {
            subjectUnitId: 1,
            grade: 'M1',
            term: 1,
            unitName: '자연수의 혼합 계산',
          },
          questionImagePath: '/images/questions/q1.png',
          solutionImagePath: '/images/solutions/s1.png',
        },
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

/**
 * 문제 세트 목록 조회
 * GET /v1/question-sets
 */
export const getQuestionSets = async (): Promise<GetQuestionSetsResponse> => {
  // 목 데이터
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
    }, 500);
  });

  // 실제 API 연결 시
  // const response = await axiosInstance.get<GetQuestionSetsResponse>(
  //   '/v1/question-sets'
  // );
  // return response.data;
};

/**
 * 문제 세트 생성
 * POST /v1/question-sets
 */
export const createQuestionSet = async (
  request: CreateQuestionSetRequest
): Promise<CreateQuestionSetResponse> => {
  // 목 데이터
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('문제 세트 생성:', request);
      resolve({
        status: 200,
        code: 'SUCCESS',
        message: '요청에 성공했습니다.',
        data: createMockQuestionSetDetail(),
      });
    }, 500);
  });

  // 실제 API 연결 시
  // const response = await axiosInstance.post<CreateQuestionSetResponse>(
  //   '/v1/question-sets',
  //   request
  // );
  // return response.data;
};

/**
 * 문제 세트 채점
 * POST /v1/question-sets/{questionSetId}/grade
 */
export const gradeQuestionSet = async (
  questionSetId: number,
  request: GradeQuestionSetRequest
): Promise<GradeQuestionSetResponse> => {
  // 목 데이터
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('문제 세트 채점:', questionSetId, request);
      resolve({
        status: 200,
        code: 'SUCCESS',
        message: '요청에 성공했습니다.',
        data: 'string',
      });
    }, 500);
  });

  // 실제 API 연결 시
  // const response = await axiosInstance.post<GradeQuestionSetResponse>(
  //   `/v1/question-sets/${questionSetId}/grade`,
  //   request
  // );
  // return response.data;
};

/**
 * 문제 세트 상세 조회
 * GET /v1/question-sets/{questionSetId}
 */
export const getQuestionSetDetail = async (
  questionSetId: number
): Promise<GetQuestionSetDetailResponse> => {
  // 목 데이터
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        code: 'SUCCESS',
        message: '요청에 성공했습니다.',
        data: createMockQuestionSetDetail(),
      });
    }, 500);
  });

  // 실제 API 연결 시
  // const response = await axiosInstance.get<GetQuestionSetDetailResponse>(
  //   `/v1/question-sets/${questionSetId}`
  // );
  // return response.data;
};
