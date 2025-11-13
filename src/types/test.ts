export type Difficulty = 'easy' | 'medium' | 'hard';

export interface TestSummary {
  id: number;
  name: string;
  questionCount: number;
  createdAt: string;
}

export interface QuestionItem {
  questionId: string; // ◀︎ [필수] API 연동을 위해
  question: string;
  tryCount: number;
  isCorrect: boolean;
  isStarred: boolean;
  createdAt?: string; // ◀︎ [필수] ? (Optional)로 변경
  difficulty: Difficulty; // ◀︎ 'easy' | 'medium' | 'hard'
  testName?: string;
}

export interface TestDetail {
  id: number;
  name: string;
  createdAt: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: string;
  timeGiven: string;
  questions: QuestionItem[];
}
