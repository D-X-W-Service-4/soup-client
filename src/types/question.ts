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
  name: string;
  grade: 'M1' | 'M2' | 'M3';
  unitNumber: string;
}

// 문제 정보
export interface QuestionDto {
  questionId: string;
}

// 사용자별 문제 정보
export interface UserQuestionDto {
  userQuestionId: number;
  question: QuestionDto;
  answeredWrongBefore: boolean;
  isStarred: boolean;
  tryCount: number;
}

// GET /v1/questions 쿼리 파라미터
export interface GetQuestionsParams {
  filter?: 'ALL' | 'INCORRECT' | 'STARRED';
  grade?: 'M1' | 'M2' | 'M3';
  term?: number;
  subjectUnitId?: number;
}

// GET /v1/questions 응답
export interface GetQuestionsData {
  questions: UserQuestionDto[];
}
export type GetQuestionsResponse = ApiResponse<GetQuestionsData>;
