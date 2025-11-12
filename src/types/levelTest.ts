import type { SoupLevel } from './soup';

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

// 레벨 테스트 문제
export interface LevelTestQuestionDto {
  levelTestQuestionId: number;
  questionNumber: number;
  question: QuestionDto;
  isCorrect: boolean;
  userAnswer: string;
  descriptiveImagePath: string;
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
export interface GradeLevelTestQuestionRequest {
  levelTestQuestionId: number;
  userAnswer: string;
  descriptiveImagePath: string;
  isTimeout: boolean;
}

export interface GradeLevelTestRequest {
  questions: GradeLevelTestQuestionRequest[];
}

// POST /v1/level-tests/{levelTestId}/grade 응답
export type GradeLevelTestResponse = ApiResponse<string>;

// GET /v1/level-tests/{levelTestId} 응답
export type GetLevelTestDetailResponse = ApiResponse<LevelTestDetailDto>;
