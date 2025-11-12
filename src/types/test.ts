export type Difficulty = 'easy' | 'medium' | 'hard' | number;

export interface TestSummary {
  id: number;
  name: string;
  questionCount: number;
  createdAt: string;
}

export interface QuestionItem {
  question: string;
  tryCount?: number;
  isCorrect: boolean;
  isStarred: boolean;
  createdAt: string;
  difficulty: Difficulty;
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
