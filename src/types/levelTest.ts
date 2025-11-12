import type { SoupLevel } from './soup';

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

// 단원 정보
export interface SubjectUnit {
  subjectUnitId: number;
  name: string;
  grade: string;
  unitNumber: string;
}

// 레벨 테스트 문제
export interface LevelTestQuestion {
  levelTestQuestionId: number;
  questionNumber: number;
  question: Question;
  isCorrect: boolean;
  userAnswer: string;
  descriptiveImageUrl: string;
  isTimeout: boolean;
  essayTypeScore: number;
  essayTypeScoreText: string;
}

// 레벨 테스트 요약 정보
export interface LevelTestSummary {
  levelTestId: number;
  timeLimit: number;
  totalQuestionCount: number;
  correctCount: number;
  score: number;
  resultSoup: SoupLevel;
  finishedAt: string;
}

// 레벨 테스트 상세 정보
export interface LevelTestDetail extends LevelTestSummary {
  subjectUnits: SubjectUnit[];
  levelTestQuestions: LevelTestQuestion[];
  createdAt: string;
  updatedAt: string;
}

// GET /v1/level-tests 응답
export interface GetLevelTestsData {
  levelTests: LevelTestSummary[];
}
export type GetLevelTestsResponse = ApiResponse<GetLevelTestsData>;

// POST /v1/level-tests 요청
export interface CreateLevelTestRequest {
  isInitialTest: boolean;
  subjectUnitIds: number[];
}

// POST /v1/level-tests 응답
export type CreateLevelTestResponse = ApiResponse<LevelTestDetail>;

// POST /v1/level-tests/{levelTestId}/grade 요청
export interface GradeLevelTestAnswer {
  questionId: string;
  userAnswer: string;
  descriptiveImageUrl: string;
}

export interface GradeLevelTestRequest {
  answers: GradeLevelTestAnswer[];
}

// POST /v1/level-tests/{levelTestId}/grade 응답
export type GradeLevelTestResponse = ApiResponse<string>;

// GET /v1/level-tests/{levelTestId} 응답
export type GetLevelTestDetailResponse = ApiResponse<LevelTestDetail>;
