import type { ApiResponse, QuestionDto } from './question';

// 사용자 답변 정보 (채점 요청용)
export interface QuestionUserAnswer {
  questionId: string;
  userAnswer: string;
  descriptiveImageUrl?: string;
}

// 문제 세트 아이템
export interface QuestionSetItemDto {
  questionSetItemId: number;
  question: QuestionDto;
  isCorrect: boolean;
  userAnswer: string;
  descriptiveImagePath: string;
  isTimeout: boolean;
  essayTypeScore: number;
  essayTypeScoreText: string;
}

// 문제 세트 요약 정보
export interface QuestionSetSummaryDto {
  questionSetId: number;
  totalQuestionCount: number;
  correctCount: number;
  finishedAt: string;
}

// 문제 세트 상세 정보
export interface QuestionSetDetailDto {
  questionSetId: number;
  totalQuestionCount: number;
  correctCount: number;
  finishedAt: string;
  questionSetItems: QuestionSetItemDto[];
  createdAt: string;
  updatedAt: string;
}

// GET /v1/question-sets 응답
export interface GetQuestionSetsData {
  questionSets: QuestionSetSummaryDto[];
}
export type GetQuestionSetsResponse = ApiResponse<GetQuestionSetsData>;

// POST /v1/question-sets 요청
export interface CreateQuestionSetRequest {
  questionIds: string[];
}

// POST /v1/question-sets 응답
export type CreateQuestionSetResponse = ApiResponse<QuestionSetDetailDto>;

// POST /v1/question-sets/{questionSetId}/grade 요청
export interface GradeQuestionSetRequest {
  answers: QuestionUserAnswer[];
}

// POST /v1/question-sets/{questionSetId}/grade 응답
export type GradeQuestionSetResponse = ApiResponse<object>;

// GET /v1/question-sets/{questionSetId} 응답
export type GetQuestionSetDetailResponse = ApiResponse<QuestionSetDetailDto>;
