import { useEffect, useState } from 'react';
import SelectButton from './components/SelectButton.tsx';
import SelectBox from './components/SelectBox.tsx';
import SideBar from '../../components/SideBar.tsx';
import QuestionCard from '../test/result/components/QuestionCard.tsx';
import type { QuestionItem } from '../../types/test.ts';
import Button from '../../components/Button.tsx';
import { Icon } from '@iconify/react';
import {
  getReviewQuestions,
  createQuestionSet,
} from '../../apis/questionSetAPI.ts';
import type {
  UserQuestionDto,
  GetQuestionsParams,
} from '../../types/question.ts';
import { useAuthStore } from '../../stores/UseAuthorStore.ts';
import { useNavigate } from 'react-router-dom';

const GRADE_OPTIONS = [
  { label: '전체', value: 'all' },
  { label: '1학년', value: '1' },
  { label: '2학년', value: '2' },
  { label: '3학년', value: '3' },
];

const SEMESTER_OPTIONS = [
  { label: '전체', value: 'all' },
  { label: '1학기', value: '1' },
  { label: '2학기', value: '2' },
];

// API 응답을 QuestionItem으로 변환
function convertToQuestionItem(userQuestion: UserQuestionDto): QuestionItem {
  return {
    questionId: userQuestion.question.questionId,
    question: userQuestion.question.questionId, // API에서 question 내용이 없으면 questionId를 사용
    tryCount: userQuestion.tryCount,
    isCorrect: !userQuestion.answeredWrongBefore,
    isStarred: userQuestion.isStarred,
    difficulty: 'medium', // API 응답에 difficulty가 없으면 기본값
    testName: undefined,
  };
}

export default function ReviewPage() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [filter, setFilter] = useState<'all' | 'incorrect' | 'isStarred'>(
    'all'
  );
  const [grade, setGrade] = useState('all');
  const [semester, setSemester] = useState('all');
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    (async () => {
      // 인증 토큰 확인
      if (!accessToken) {
        setErr('로그인이 필요합니다. 로그인 후 다시 시도해주세요.');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setErr(null);
      try {
        const params: GetQuestionsParams = {};

        // filter 파라미터 설정
        if (filter === 'incorrect') {
          params.filter = 'INCORRECT';
        } else if (filter === 'isStarred') {
          params.filter = 'STARRED';
        } else {
          params.filter = 'ALL';
        }

        // grade 파라미터 설정
        if (grade !== 'all') {
          if (grade === '1') params.grade = 'M1';
          else if (grade === '2') params.grade = 'M2';
          else if (grade === '3') params.grade = 'M3';
        }

        // term 파라미터 설정
        if (semester !== 'all') {
          params.term = parseInt(semester, 10);
        }

        const response = await getReviewQuestions(params);
        const convertedQuestions = response.data.questions.map(
          convertToQuestionItem
        );
        setQuestions(convertedQuestions);
      } catch (err: unknown) {
        console.error('문제 조회 실패:', err);

        let errorMessage = '문제를 불러오는 중 오류가 발생했습니다.';

        if (err && typeof err === 'object' && 'response' in err) {
          const axiosError = err as {
            response?: {
              status?: number;
              data?: {
                message?: string;
                code?: string;
              };
            };
          };

          if (axiosError.response?.status === 500) {
            errorMessage =
              '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
          } else if (axiosError.response?.status === 401) {
            errorMessage = '로그인이 필요합니다.';
          } else if (axiosError.response?.data?.message) {
            errorMessage = axiosError.response.data.message;
          }

          console.error('에러 상세:', {
            status: axiosError.response?.status,
            data: axiosError.response?.data,
          });
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }

        setErr(errorMessage);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [grade, semester, filter, accessToken]);

  if (err) {
    return <div className="p-6 text-warning">오류가 발생했습니다: {err}</div>;
  }

  // API에서 이미 필터링된 데이터를 받으므로 추가 필터링 불필요
  const filteredQuestions = questions;

  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    setSelectedQuestions([]);
  };

  const toggleQuestionSelection = (index: number) => {
    setSelectedQuestions((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleSelectAll = () => {
    if (selectedQuestions.length === filteredQuestions.length) {
      setSelectedQuestions([]);
    } else {
      setSelectedQuestions(filteredQuestions.map((_, index) => index));
    }
  };

  const handleStartSelectedQuestions = async () => {
    if (selectedQuestions.length === 0) {
      return;
    }

    // 선택된 문제들의 questionId 수집
    const selectedQuestionIds = selectedQuestions.map(
      (index) => filteredQuestions[index].questionId
    );

    setIsCreating(true);
    setErr(null);

    try {
      // 문제풀이 세트 생성
      const response = await createQuestionSet(selectedQuestionIds);
      const questionSetId = response.data.questionSetId;

      // 문제 풀이 페이지로 이동 (questionSetId 전달)
      navigate('/question/test', {
        state: {
          questionSetId,
          questionSetItems: response.data.questionSetItems,
          totalQuestionCount: response.data.totalQuestionCount,
        },
      });
    } catch (err: unknown) {
      console.error('문제풀이 세트 생성 실패:', err);
      let errorMessage = '문제풀이 세트를 생성하는 중 오류가 발생했습니다.';

      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as {
          response?: {
            status?: number;
            data?: {
              message?: string;
            };
          };
        };

        if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message;
        }
      }

      setErr(errorMessage);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="flex h-dvh w-full bg-primary-bg p-5">
      <div className="flex w-full gap-6">
        <SideBar isOpen={isOpen} onToggle={() => setIsOpen((v) => !v)} />

        <main className="flex min-h-0 flex-1 flex-col gap-6">
          <section className="flex flex-col items-start justify-start gap-6 rounded-[20px] bg-white p-10 shadow-base">
            <div className="flex items-center justify-start gap-2 px-2">
              <Icon icon="feather:bookmark" className="h-5 w-5 text-primary" />
              <span className="text-xl font-semibold">문제 다시보기</span>
            </div>
            <div className="flex w-full items-center justify-center gap-8">
              <div className="flex w-full flex-col gap-2.5">
                <span className="text-base font-medium">학년</span>
                <SelectBox
                  placeholder="학년"
                  options={GRADE_OPTIONS}
                  value={grade}
                  onChange={setGrade}
                />
              </div>
              <div className="flex w-full flex-col gap-2.5">
                <span className="text-base font-medium">학기</span>
                <SelectBox
                  placeholder="학기"
                  options={SEMESTER_OPTIONS}
                  value={semester}
                  onChange={setSemester}
                />
              </div>
            </div>
          </section>

          <section className="flex h-full min-h-0 flex-1 flex-col items-center justify-start gap-6 rounded-[20px] bg-white p-10 shadow-base">
            <SelectButton filter={filter} onFilterChange={setFilter} />
            <div className="flex items-center justify-end self-stretch">
              {!isSelectionMode ? (
                <Button
                  size="small"
                  variant="primary"
                  onClick={toggleSelectionMode}
                >
                  다시 풀 문제 선택하기
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    size="small"
                    variant="white"
                    onClick={handleSelectAll}
                  >
                    {selectedQuestions.length === filteredQuestions.length
                      ? '전체 해제'
                      : '전체 선택'}
                  </Button>
                  <Button
                    size="small"
                    variant="white"
                    onClick={toggleSelectionMode}
                  >
                    취소
                  </Button>
                  <Button
                    size="small"
                    variant="primary"
                    onClick={handleStartSelectedQuestions}
                    disabled={selectedQuestions.length === 0 || isCreating}
                  >
                    {isCreating
                      ? '생성 중...'
                      : `${selectedQuestions.length}개 문제 풀기`}
                  </Button>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-5 self-stretch overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center py-10 text-secondary">
                  문제를 불러오는 중...
                </div>
              ) : filteredQuestions.length === 0 ? (
                <div className="flex items-center justify-center py-10 text-secondary">
                  풀었던 문제가 없습니다.
                </div>
              ) : (
                filteredQuestions.map((q, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {isSelectionMode && (
                      <input
                        type="checkbox"
                        checked={selectedQuestions.includes(index)}
                        onChange={() => toggleQuestionSelection(index)}
                        className="h-4 w-4 cursor-pointer rounded border-neutral-100"
                      />
                    )}
                    <div className="flex-1">
                      <QuestionCard
                        questionId={q.questionId}
                        question={q.question}
                        tryCount={q.tryCount}
                        isCorrect={q.isCorrect}
                        isStarred={q.isStarred}
                        createdAt={q.createdAt}
                        difficulty={q.difficulty}
                        testName={q.testName}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
