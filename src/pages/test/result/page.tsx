import SideBar from '../../../components/SideBar.tsx';
import Progress from './components/Progress.tsx';
import QuestionCard from './components/QuestionCard.tsx';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import type { TestDetail } from '../../../types/test.ts';
import { useParams } from 'react-router-dom';
import { mockTestData } from '../../../mocks/testData.ts';
import { timeStringToSeconds } from '../../../utils/time.ts';

async function fetchTestResult(testId: number): Promise<TestDetail> {
  // TODO: 실제 API 호출로 수정
  const result = mockTestData.find((test) => test.id === testId);
  if (!result) {
    throw new Error(`테스트 결과를 찾을 수 없습니다. (ID: ${testId})`);
  }
  return result;
}

export default function TestResultPage() {
  const { testId } = useParams<{ testId: string }>();
  const [isOpen, setIsOpen] = useState(true);
  const [data, setData] = useState<TestDetail | null>(null);
  const [filter, setFilter] = useState<'all' | 'incorrect'>('all');
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        if (!testId) {
          setErr('테스트 ID가 없습니다.');
          return;
        }
        const result = await fetchTestResult(Number(testId));
        setData(result);
      } catch (err) {
        setErr(err instanceof Error ? err.message : String(err));
      }
    })();
  }, [testId]);

  if (err) {
    return <div className="p-6 text-warning">오류가 발생했습니다: {err}</div>;
  }

  return (
    <div className="flex h-dvh w-full bg-primary-bg p-5">
      <div className="flex h-full w-full gap-6">
        <SideBar isOpen={isOpen} onToggle={() => setIsOpen((v) => !v)} />

        <main className="flex min-h-0 flex-1 flex-col gap-6">
          {data && (
            <>
              <section className="flex flex-col items-start justify-start gap-11 rounded-[20px] bg-white p-10 shadow-base">
                <div className="flex items-center justify-start gap-2 px-2">
                  <Icon
                    icon="pepicons-pop:pen"
                    className="h-5 w-5 text-primary"
                  />
                  <span className="text-xl font-semibold">{data.name}</span>
                </div>
                <div className="grid grid-cols-3 gap-10">
                  <Progress
                    label="점수"
                    value={`${data.score}`}
                    sub={`/100 점`}
                    progress={data.score / 100}
                  />
                  <Progress
                    label="맞은 문제 수"
                    value={`${data.correctAnswers}`}
                    sub={`/${data.totalQuestions} 개`}
                    progress={data.correctAnswers / data.totalQuestions}
                  />
                  <Progress
                    label="풀이 시간"
                    value={data.timeTaken}
                    sub={`/${data.timeGiven} 분`}
                    progress={
                      timeStringToSeconds(data.timeTaken) /
                      timeStringToSeconds(data.timeGiven)
                    }
                  />
                </div>
              </section>

              <section className="flex h-full min-h-0 flex-1 flex-col items-center justify-start gap-8 rounded-[20px] bg-white p-10 shadow-base">
                <div className="flex h-10 items-center justify-between self-stretch rounded-md bg-neutral-50 px-[3px]">
                  <button
                    type="button"
                    onClick={() => setFilter('all')}
                    className={`flex h-9 flex-1 items-center justify-center gap-2.5 rounded-md ${
                      filter === 'all'
                        ? 'bg-primary text-white'
                        : 'bg-primary-bg text-secondary'
                    }`}
                  >
                    <Icon icon="akar-icons:book" className="h-4 w-4" />
                    <span className="justify-start text-center text-sm font-normal">
                      풀었던 문제 전체
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilter('incorrect')}
                    className={`flex h-9 flex-1 items-center justify-center gap-2 rounded-lg ${
                      filter === 'incorrect'
                        ? 'bg-primary text-white'
                        : 'bg-primary-bg text-secondary'
                    }`}
                  >
                    <Icon icon="lets-icons:close-ring" className="h-4 w-4" />
                    <div className="justify-start text-center text-sm font-semibold">
                      틀린 문제
                    </div>
                  </button>
                </div>
                <div className="flex flex-col gap-4 self-stretch overflow-y-auto">
                  {data.questions
                    .filter((q) =>
                      filter === 'incorrect' ? !q.isCorrect : true
                    )
                    .map((q, index) => (
                      <QuestionCard
                        key={index}
                        question={q.question}
                        tryCount={q.tryCount}
                        isCorrect={q.isCorrect}
                        isStarred={q.isStarred}
                        createdAt={q.createdAt}
                        difficulty={q.difficulty}
                      />
                    ))}
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
