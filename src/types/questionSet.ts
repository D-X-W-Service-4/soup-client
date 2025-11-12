// API 응답 공통 타입
export interface ApiResponse<T> {
  status: number;
  code: string;
  message: string;
  data: T;
}

// 문제 정보
export interface Question {
  questionId: string;
}

// 문제 세트 아이템
export interface QuestionSetItem {
  questionSetItemId: number;
  question: Question;
  isCorrect: boolean;
  userAnswer: string;
  descriptiveImageUrl: string;
  isTimeout: boolean;
  essayTypeScore: number;
  essayTypeScoreText: string;
}

// 문제 세트 요약 정보
export interface QuestionSetSummary {
  questionSetId: number;
  totalQuestionCount: number;
  correctCount: number;
  finishedAt: string;
}

// 문제 세트 상세 정보
export interface QuestionSetDetail extends QuestionSetSummary {
  questionSetItems: QuestionSetItem[];
  createdAt: string;
  updatedAt: string;
}

// GET /v1/question-sets 응답
export interface GetQuestionSetsData {
  questionSets: QuestionSetSummary[];
}
export type GetQuestionSetsResponse = ApiResponse<GetQuestionSetsData>;

// POST /v1/question-sets 요청
export interface CreateQuestionSetRequest {
  questionIds: string[];
}

// POST /v1/question-sets 응답
export type CreateQuestionSetResponse = ApiResponse<QuestionSetDetail>;

// POST /v1/question-sets/{questionSetId}/grade 응답
export type GradeQuestionSetResponse = ApiResponse<string>;

// GET /v1/question-sets/{questionSetId} 응답
export type GetQuestionSetDetailResponse = ApiResponse<QuestionSetDetail>;
