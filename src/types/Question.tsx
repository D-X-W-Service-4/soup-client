// src/types/problem.ts

export type SubjectUnitDto = {
  id: string;
  name: string;
};

export type Question = {
  questionId: string;
  grade: string;
  term: number;
  subjectUnit: SubjectUnitDto;
  topic: string;
  topicName: string;
  type: string;
  stemType: number;
  condition: number;
  step: string;
  sector1: string;
  sector2: string;
  difficulty: number;
  contents: string;
  answerFileUrl: string | null;
  answerText: string | null;
  // --- 힌트/정답 기능을 위해 추가한 필드 ---
  hints: string[];
  correctAnswer: string;
};
