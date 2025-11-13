import type { SoupLevel } from './soup';
import type { ApiResponse, QuestionDto, SubjectUnitDto } from './question';

// 레벨 테스트 문제
export interface LevelTestQuestionDto {
  levelTestQuestionId: number;
  questionNumber: number;
  question: QuestionDto;
  isCorrect: boolean;
  userAnswer: string;
  descriptiveImageUrl: string;
  isTimeout: boolean;
  essayTypeScore: number;
  essayTypeScoreText: string;
}

// 레벨 테스트 요약 정보
export interface LevelTestSummaryDto {
  levelTestId: number;
  timeLimit: number;
  totalQuestionCount: number;
  correctCount: number;
  score: number;
  resultSoup: SoupLevel;
  finishedAt: string;
  createdAt?: string;
}

// 레벨 테스트 상세 정보
export interface LevelTestDetailDto {
  levelTestId: number;
  timeLimit: number;
  totalQuestionCount: number;
  correctCount: number;
  score: number;
  resultSoup: SoupLevel;
  finishedAt: string;
  subjectUnits: SubjectUnitDto[];
  levelTestQuestions: LevelTestQuestionDto[];
  createdAt: string;
  updatedAt: string;
}

// GET /v1/level-tests 응답
export interface GetLevelTestsData {
  levelTests: LevelTestSummaryDto[];
}
export type GetLevelTestsResponse = ApiResponse<GetLevelTestsData>;

// POST /v1/level-tests 요청
export interface CreateLevelTestRequest {
  isInitialTest: boolean;
  subjectUnitIds: number[];
}

// POST /v1/level-tests 응답
export type CreateLevelTestResponse = ApiResponse<LevelTestDetailDto>;

// POST /v1/level-tests/{levelTestId}/grade 요청
export interface QuestionUserAnswer {
  questionId: string;
  userAnswer: string;
  descriptiveImageUrl?: string;
}

export interface GradeLevelTestRequest {
  answers: QuestionUserAnswer[];
}

// POST /v1/level-tests/{levelTestId}/grade 응답
export type GradeLevelTestResponse = ApiResponse<object>;

// GET /v1/level-tests/{levelTestId} 응답
export type GetLevelTestDetailResponse = ApiResponse<LevelTestDetailDto>;
