import MockupQuestion from '../assets/MockupQuestion.png';
export interface QuestionData {
  questionId: string;
  grade: string;
  term: number;
  topic: string;
  topicName: string;
  type: string;
  stemType: number;
  condition: number;
  step: string;
  sector1: string;
  sector2: string;
  difficulty: number;
  contents: string | null;
  answerFileUrl: string | null;
  answerText: string | null;
}

export const mockQuestions: QuestionData[] = [
  {
    questionId: '00044_44888',
    grade: 'M3',
    term: 2,
    topic: '9206044',
    topicName: '접선과 현이 이루는 각의 활용(1)',
    type: '단답형',
    stemType: 1,
    condition: 0,
    step: '기본',
    sector1: '계산',
    sector2: '수와 연산',
    difficulty: 1,
    contents: MockupQuestion,
    answerFileUrl: null,
    answerText: null,
  },
  {
    questionId: '00045_44889',
    grade: 'M3',
    term: 2,
    topic: '9206045',
    topicName: '원의 접선 길이 문제',
    type: '단답형',
    stemType: 1,
    condition: 0,
    step: '기본',
    sector1: '이해',
    sector2: '기하',
    difficulty: 2,
    contents: '이 문제는 원의 접선 길이를 구하는 문제입니다.',
    answerFileUrl: null,
    answerText: null,
  },
];

export const fetchQuestionById = async (
  id: number
): Promise<QuestionData | null> => {
  // 서버 없을 때는 mock 데이터에서 반환
  return mockQuestions[id - 1] || null;

  // 실제 연결 시:
  // const res = await fetch(`/api/questions/${id}`);
  // if (!res.ok) return null;
  // return await res.json();
};
