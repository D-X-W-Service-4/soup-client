export interface SubjectUnit {
  subjectUnitId: number;
  name: string;
  grade: 'M1' | 'M2' | 'M3';
  unitNumber: string;
}

export const gradeStoreToDisplay: Record<SubjectUnit['grade'], string> = {
  M1: '1학년',
  M2: '2학년',
  M3: '3학년',
};

export const subjectUnits: SubjectUnit[] = [
  {
    subjectUnitId: 1,
    name: '소인수분해 - 소인수분해',
    grade: 'M1',
    unitNumber: '1-1',
  },
  {
    subjectUnitId: 2,
    name: '소인수분해 - 최대공약수와 최소공배수',
    grade: 'M1',
    unitNumber: '1-2',
  },
  {
    subjectUnitId: 3,
    name: '정수와 유리수 - 정수와 유리수',
    grade: 'M1',
    unitNumber: '2-1',
  },
  {
    subjectUnitId: 4,
    name: '정수와 유리수 - 정수와 유리수의 덧셈과 뺄셈',
    grade: 'M1',
    unitNumber: '2-2',
  },
  {
    subjectUnitId: 5,
    name: '정수와 유리수 - 정수와 유리수의 곱셈과 나눗셈',
    grade: 'M1',
    unitNumber: '2-3',
  },
  {
    subjectUnitId: 6,
    name: '문자와 식 - 문자와 식',
    grade: 'M1',
    unitNumber: '3-1',
  },
  {
    subjectUnitId: 7,
    name: '문자와 식 - 일차식과 그 계산',
    grade: 'M1',
    unitNumber: '3-2',
  },
  {
    subjectUnitId: 8,
    name: '문자와 식 - 일차방정식',
    grade: 'M1',
    unitNumber: '3-3',
  },
  {
    subjectUnitId: 9,
    name: '문자와 식 - 일차방정식의 활용',
    grade: 'M1',
    unitNumber: '3-4',
  },
  {
    subjectUnitId: 10,
    name: '좌표평면과 그래프 - 좌표평면과 그래프',
    grade: 'M1',
    unitNumber: '4-1',
  },
  {
    subjectUnitId: 11,
    name: '좌표평면과 그래프 - 정비례와 반비례',
    grade: 'M1',
    unitNumber: '4-2',
  },
  {
    subjectUnitId: 12,
    name: '기본 도형 - 기본 도형',
    grade: 'M1',
    unitNumber: '5-1',
  },
  {
    subjectUnitId: 13,
    name: '기본 도형 - 위치 관계',
    grade: 'M1',
    unitNumber: '5-2',
  },
  {
    subjectUnitId: 14,
    name: '기본 도형 - 평행선',
    grade: 'M1',
    unitNumber: '5-3',
  },
  {
    subjectUnitId: 15,
    name: '기본 도형 - 작도와 합동',
    grade: 'M1',
    unitNumber: '5-4',
  },
  {
    subjectUnitId: 16,
    name: '평면도형 - 다각형',
    grade: 'M1',
    unitNumber: '6-1',
  },
  {
    subjectUnitId: 17,
    name: '평면도형 - 원과 부채꼴',
    grade: 'M1',
    unitNumber: '6-2',
  },
  {
    subjectUnitId: 18,
    name: '입체도형 - 다면체와 회전체',
    grade: 'M1',
    unitNumber: '7-1',
  },
  {
    subjectUnitId: 19,
    name: '입체도형 - 입체도형의 겉넓이와 부피',
    grade: 'M1',
    unitNumber: '7-2',
  },
  {
    subjectUnitId: 20,
    name: '통계 - 도수분포표',
    grade: 'M1',
    unitNumber: '8-1',
  },
  {
    subjectUnitId: 21,
    name: '통계 - 상대도수',
    grade: 'M1',
    unitNumber: '8-2',
  },

  // --- 2학년 (M2) ---
  {
    subjectUnitId: 22,
    name: '수와 연산 - 유리수와 소수',
    grade: 'M2',
    unitNumber: '1-1',
  },
  {
    subjectUnitId: 23,
    name: '수와 연산 - 순환소수',
    grade: 'M2',
    unitNumber: '1-2',
  },
  {
    subjectUnitId: 24,
    name: '식의 계산 - 단항식의 계산',
    grade: 'M2',
    unitNumber: '2-1',
  },
  {
    subjectUnitId: 25,
    name: '식의 계산 - 다항식의 계산',
    grade: 'M2',
    unitNumber: '2-2',
  },
  {
    subjectUnitId: 26,
    name: '부등식 - 일차부등식',
    grade: 'M2',
    unitNumber: '3-1',
  },
  {
    subjectUnitId: 27,
    name: '부등식 - 일차부등식의 활용',
    grade: 'M2',
    unitNumber: '3-2',
  },
  {
    subjectUnitId: 28,
    name: '방정식 - 연립일차방정식',
    grade: 'M2',
    unitNumber: '4-1',
  },
  {
    subjectUnitId: 29,
    name: '방정식 - 연립일차방정식의 풀이',
    grade: 'M2',
    unitNumber: '4-2',
  },
  {
    subjectUnitId: 30,
    name: '방정식 - 연립일차방정식의 활용',
    grade: 'M2',
    unitNumber: '4-3',
  },
  {
    subjectUnitId: 31,
    name: '함수 - 일차함수와 그래프',
    grade: 'M2',
    unitNumber: '5-1',
  },
  {
    subjectUnitId: 32,
    name: '함수 - 일차함수와 일차방정식의 관계',
    grade: 'M2',
    unitNumber: '5-2',
  },
  {
    subjectUnitId: 33,
    name: '도형의 성질 - 삼각형의 성질',
    grade: 'M2',
    unitNumber: '6-1',
  },
  {
    subjectUnitId: 34,
    name: '도형의 성질 - 사각형의 성질',
    grade: 'M2',
    unitNumber: '6-2',
  },
  {
    subjectUnitId: 35,
    name: '도형의 닮음 - 도형의 닮음',
    grade: 'M2',
    unitNumber: '7-1',
  },
  {
    subjectUnitId: 36,
    name: '도형의 닮음 - 평행선 사이의 선분의 길이 비',
    grade: 'M2',
    unitNumber: '7-2',
  },
  {
    subjectUnitId: 37,
    name: '도형의 닮음 - 닮음의 활용',
    grade: 'M2',
    unitNumber: '7-3',
  },
  {
    subjectUnitId: 38,
    name: '피타고라스 정리 - 피타고라스 정리',
    grade: 'M2',
    unitNumber: '8-1',
  },
  {
    subjectUnitId: 39,
    name: '확률 - 경우의 수',
    grade: 'M2',
    unitNumber: '9-1',
  },
  { subjectUnitId: 40, name: '확률 - 확률', grade: 'M2', unitNumber: '9-2' },

  // --- 3학년 (M3) ---
  {
    subjectUnitId: 41,
    name: '수와 연산 - 제곱근과 실수',
    grade: 'M3',
    unitNumber: '1-1',
  },
  {
    subjectUnitId: 42,
    name: '수와 연산 - 근호를 포함한 식의 계산',
    grade: 'M3',
    unitNumber: '1-2',
  },
  {
    subjectUnitId: 43,
    name: '식의 계산 - 다항식의 곱셈 공식',
    grade: 'M3',
    unitNumber: '2-1',
  },
  {
    subjectUnitId: 44,
    name: '식의 계산 - 다항식의 인수분해 공식',
    grade: 'M3',
    unitNumber: '2-2',
  },
  {
    subjectUnitId: 45,
    name: '이차방정식 - 이차방정식의 풀이',
    grade: 'M3',
    unitNumber: '3-1',
  },
  {
    subjectUnitId: 46,
    name: '이차방정식 - 이차방정식의 활용',
    grade: 'M3',
    unitNumber: '3-2',
  },
  {
    subjectUnitId: 47,
    name: '이차함수 - 이차함수와 그래프',
    grade: 'M3',
    unitNumber: '4-1',
  },
  {
    subjectUnitId: 48,
    name: '삼각비 - 삼각비',
    grade: 'M3',
    unitNumber: '5-1',
  },
  {
    subjectUnitId: 49,
    name: '삼각비 - 삼각비의 활용',
    grade: 'M3',
    unitNumber: '5-2',
  },
  {
    subjectUnitId: 50,
    name: '원의 성질 - 원과 직선',
    grade: 'M3',
    unitNumber: '6-1',
  },
  {
    subjectUnitId: 51,
    name: '원의 성질 - 원주각',
    grade: 'M3',
    unitNumber: '6-2',
  },
  { subjectUnitId: 52, name: '통계 - 대푯값', grade: 'M3', unitNumber: '7-1' },
  { subjectUnitId: 53, name: '통계 - 산포도', grade: 'M3', unitNumber: '7-2' },
];

export default subjectUnits;
