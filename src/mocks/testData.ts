import type { TestDetail } from '../types/test';

export const mockTestData: TestDetail[] = [
  {
    id: 1,
    name: '수준테스트 1',
    createdAt: '2024-06-01',
    score: 70,
    totalQuestions: 20,
    correctAnswers: 14,
    timeTaken: '25:00',
    timeGiven: '30:00',
    questions: [
      {
        question: '문제 1',
        tryCount: 1,
        isCorrect: true,
        isStarred: false,
        createdAt: '2024-06-01',
        difficulty: 'easy',
      },
      {
        question: '문제 2',
        tryCount: 1,
        isCorrect: false,
        isStarred: true,
        createdAt: '2024-06-01',
        difficulty: 'hard',
      },
    ],
  },
  {
    id: 2,
    name: '수준테스트 2',
    createdAt: '2024-06-01',
    score: 40,
    totalQuestions: 10,
    correctAnswers: 4,
    timeTaken: '22:00',
    timeGiven: '30:00',
    questions: [
      {
        question: '문제 1',
        tryCount: 2,
        isCorrect: false,
        isStarred: true,
        createdAt: '2024-06-01',
        difficulty: 'medium',
      },
      {
        question: '문제 2',
        tryCount: 1,
        isCorrect: true,
        isStarred: false,
        createdAt: '2024-06-01',
        difficulty: 'easy',
      },
      {
        question: '문제 3',
        tryCount: 3,
        isCorrect: false,
        isStarred: true,
        createdAt: '2024-06-01',
        difficulty: 'hard',
      },
    ],
  },
];
