// API 응답 공통 타입
export interface ApiResponse<T> {
  status: number;
  code: string;
  message: string;
  data: T;
}

// 교과 단원 정보
export interface SubjectUnitDto {
  subjectUnitId: number;
  grade: 'M1' | 'M2' | 'M3';
  term: number;
  unitName: string;
}

// 문제 정보
export interface QuestionDto {
  questionId: number;
  subjectUnit: SubjectUnitDto;
  questionImagePath: string;
  solutionImagePath: string;
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
  userQuestionIds: number[];
}

// POST /v1/question-sets 응답
export type CreateQuestionSetResponse = ApiResponse<QuestionSetDetailDto>;

// POST /v1/question-sets/{questionSetId}/grade 요청
export interface GradeQuestionSetItemRequest {
  questionSetItemId: number;
  userAnswer: string;
  descriptiveImagePath: string;
  isTimeout: boolean;
}

export interface GradeQuestionSetRequest {
  items: GradeQuestionSetItemRequest[];
}

// POST /v1/question-sets/{questionSetId}/grade 응답
export type GradeQuestionSetResponse = ApiResponse<string>;

// GET /v1/question-sets/{questionSetId} 응답
export type GetQuestionSetDetailResponse = ApiResponse<QuestionSetDetailDto>;
