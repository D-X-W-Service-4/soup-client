import { useEffect, useState } from 'react';
import SelectButton from './components/SelectButton.tsx';
import SelectBox from './components/SelectBox.tsx';
import SideBar from '../../components/SideBar.tsx';
import QuestionCard from '../test/result/components/QuestionCard.tsx';
import type { QuestionItem } from '../../types/test.ts';
import { mockTestData } from '../../mocks/testData.ts';
import Button from '../../components/Button.tsx';
import { Icon } from '@iconify/react';

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

async function fetchReviewQuestions(
  _grade: string,
  _semester: string
): Promise<QuestionItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allQuestions = mockTestData.flatMap((test) =>
        test.questions.map((q) => ({
          ...q,
          testName: test.name,
        }))
      );
      resolve(allQuestions);
    }, 0);
  });
}

export default function ReviewPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [filter, setFilter] = useState<'all' | 'incorrect' | 'isStarred'>(
    'all'
  );
  const [grade, setGrade] = useState('all');
  const [semester, setSemester] = useState('all');
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await fetchReviewQuestions(grade, semester);
        setQuestions(result);
      } catch (err) {
        setErr(err instanceof Error ? err.message : String(err));
      }
    })();
  }, [grade, semester]);

  if (err) {
    return <div className="p-6 text-warning">오류가 발생했습니다: {err}</div>;
  }

  const filteredQuestions = questions.filter((q) => {
    if (filter === 'incorrect') return !q.isCorrect;
    if (filter === 'isStarred') return q.isStarred;
    return true;
  });

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

  const handleStartSelectedQuestions = () => {
    // TODO: 선택된 문제들로 테스트 시작하는 로직
    console.log('선택된 문제:', selectedQuestions);
    alert(`${selectedQuestions.length}개의 문제를 다시 풀기`);
  };

  return (
    <div className="flex h-dvh w-full bg-primary-bg p-5">
      <div className="flex w-full gap-6">
        <SideBar isOpen={isOpen} onToggle={() => setIsOpen((v) => !v)} />

        <main className="flex min-h-0 flex-1 flex-col gap-6">
          <section className="flex flex-col items-start justify-start gap-6 rounded-[20px] bg-white p-10 shadow-base">
            <div className="flex items-center justify-start gap-2 px-2">
              <Icon icon="pepicons-pop:pen" className="h-5 w-5 text-primary" />
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
                    disabled={selectedQuestions.length === 0}
                  >
                    {selectedQuestions.length}개 문제 풀기
                  </Button>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-5 self-stretch overflow-y-auto">
              {filteredQuestions.map((q, index) => (
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
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
