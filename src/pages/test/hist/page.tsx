import SideBar from '../../../components/SideBar.tsx';
import TestCard from './components/TestCard.tsx';
import { useEffect, useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import { getLevelTests } from '../../../apis/levelTestAPI';
import type { LevelTestSummaryDto } from '../../../types/levelTest';

export default function TestHistoryPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [data, setData] = useState<LevelTestSummaryDto[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('전체');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadHistory() {
      try {
        const response = await getLevelTests();
        setData(response.data.levelTests);
        console.log('레벨 테스트 목록 조회 완료:', response.data.levelTests);
      } catch (error) {
        console.error('레벨 테스트 목록 조회 실패:', error);
        setErr(error instanceof Error ? error.message : String(error));
      }
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

  const filterOptions = [
    '전체',
    ...data.map((test) => `수준테스트 ${test.levelTestId}`),
  ];
  const filteredData =
    selectedFilter === '전체'
      ? data
      : data.filter(
          (test) => `수준테스트 ${test.levelTestId}` === selectedFilter
        );

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
              <section className="flex flex-col items-start justify-start gap-8 rounded-[20px] bg-white p-10">
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

              <section className="flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-[20px] bg-white p-10">
                <div className="flex min-h-0 w-full flex-1 flex-col gap-4 overflow-y-auto">
                  {filteredData.map((test, index) => {
                    return (
                      <TestCard
                        key={index}
                        testId={test.levelTestId}
                        name={`수준테스트 ${test.levelTestId}`}
                        createdAt={test.finishedAt}
                        score={test.score}
                        totalQuestions={test.totalQuestionCount}
                        correctAnswers={test.correctCount}
                      />
                    );
                  })}
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
