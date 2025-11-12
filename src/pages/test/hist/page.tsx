import SideBar from '../../../components/SideBar.tsx';
import TestCard from './components/TestCard.tsx';
import { useEffect, useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import { mockTestData } from '../../../mocks/testData.ts';
import type { TestDetail } from '../../../types/test.ts';

interface TestHistory {
  id: number;
  testName: string;
  createdAt: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: string;
  timeGiven: string;
}

async function fetchTestHistory(): Promise<TestHistory[]> {
  return mockTestData.map((test: TestDetail) => ({
    id: test.id,
    testName: test.name,
    createdAt: test.createdAt,
    score: test.score,
    totalQuestions: test.totalQuestions,
    correctAnswers: test.correctAnswers,
    timeTaken: test.timeTaken,
    timeGiven: test.timeGiven,
  }));
}

export default function TestHistoryPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [data, setData] = useState<TestHistory[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('전체');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadHistory() {
      const history = await fetchTestHistory();
      setData(history);
    }
    loadHistory();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const filterOptions = ['전체', ...data.map((test) => test.testName)];
  const filteredData =
    selectedFilter === '전체'
      ? data
      : data.filter((test) => test.testName === selectedFilter);

  return (
    <div className="flex h-dvh w-full bg-primary-bg p-5">
      <div className="flex h-full w-full gap-6">
        <SideBar isOpen={isOpen} onToggle={() => setIsOpen((v) => !v)} />

        <main className="flex min-h-0 flex-1 flex-col gap-6">
          {data && (
            <>
              <section className="flex flex-col items-start justify-start gap-8 rounded-[20px] bg-white p-10 shadow-base">
                <div className="flex items-center justify-start gap-2 px-2">
                  <Icon
                    icon="pepicons-pop:pen"
                    className="h-5 w-5 text-primary"
                  />
                  <span className="text-xl font-semibold">기록 조회하기</span>
                </div>
                <div className="relative w-full" ref={dropdownRef}>
                  <div
                    className="flex h-9 w-full cursor-pointer items-center justify-between rounded-md px-5 py-3 outline outline-[0.80px] outline-neutral-200"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span className="justify-start text-center text-sm font-normal text-secondary">
                      {selectedFilter}
                    </span>
                    <Icon
                      icon="iconamoon:arrow-down-2-duotone"
                      className="h-5 w-5 text-secondary"
                    />
                  </div>
                  {isDropdownOpen && (
                    <div className="absolute top-10 left-0 z-20 w-full animate-[fadeIn_120ms_ease-out] overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg">
                      {filterOptions.map((option) => {
                        const selected = selectedFilter === option;
                        return (
                          <div
                            key={option}
                            className={`flex cursor-pointer items-center justify-between px-5 py-3 text-sm transition-colors ${
                              selected
                                ? 'bg-primary-bg text-primary'
                                : 'text-secondary hover:bg-neutral-50'
                            }`}
                            onClick={() => {
                              setSelectedFilter(option);
                              setIsDropdownOpen(false);
                            }}
                          >
                            {option}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </section>

              <section className="flex h-full min-h-0 flex-1 flex-col items-center justify-start gap-8 rounded-[20px] bg-white p-10 shadow-base">
                <div className="flex w-full flex-col gap-4">
                  {filteredData.map((test, index) => (
                    <TestCard
                      key={index}
                      testId={test.id}
                      name={test.testName}
                      createdAt={test.createdAt}
                      score={test.score}
                      totalQuestions={test.totalQuestions}
                      correctAnswers={test.correctAnswers}
                      timeTaken={test.timeTaken}
                      timeGiven={test.timeGiven}
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
