import { useState, useEffect } from 'react';
import IconChevronLeft from '../../../assets/IconChevronLeft.tsx';
import IconChevronRight from '../../../assets/IconChevronRight.tsx';

type QuestionState = 'default' | 'current' | 'solved' | 'disabled';

interface QuestionSelectProps {
  totalQuestions: number;
  current: number;
  solved: number[];
  onSelect: (q: number) => void;
}

function QuestionSelect({
  totalQuestions,
  current,
  solved,
  onSelect,
}: QuestionSelectProps) {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768)
        setPageSize(5); // 아이패드 미니 사이즈
      else if (window.innerWidth <= 1024)
        setPageSize(7); // 아이패드 미니 사이즈
      else setPageSize(10);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(totalQuestions / pageSize);
  const start = currentPage * pageSize;
  const end = Math.min(start + pageSize, totalQuestions);
  const pageQuestions = Array.from(
    { length: end - start },
    (_, i) => start + i + 1
  );

  const getState = (qNum: number): QuestionState => {
    if (qNum === current) return 'current';
    if (solved.includes(qNum)) return 'solved';
    if (qNum > current) return 'disabled';
    return 'default';
  };

  return (
    <div className="inline-flex items-center justify-start gap-4 rounded-[30px] bg-white px-2 py-1 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)] sm:px-4 md:gap-8 lg:gap-16">
      <button
        disabled={currentPage === 0}
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
      >
        <IconChevronLeft
          className={`h-5 w-5 ${currentPage === 0 ? 'text-neutral-300' : 'text-neutral-500'}`}
        />
      </button>

      <div className="relative">
        <div className="visibility-hidden flex items-center justify-center gap-2 md:gap-5">
          {Array.from({ length: pageSize }).map((_, index) => (
            <div
              key={`sizer-${index}`}
              className="h-9 w-9 md:h-11 md:w-11"
              aria-hidden="true"
            />
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center justify-center gap-2 md:gap-5">
            {pageQuestions.map((qNum) => {
              const state = getState(qNum);
              let bgClass = 'bg-neutral-50';
              let textClass = 'text-red-400';

              if (state === 'current') {
                bgClass = 'bg-red-400';
                textClass = 'text-white';
              } else if (state === 'solved') {
                bgClass = 'bg-green-400';
                textClass = 'text-white';
              } else if (state === 'disabled') {
                bgClass = 'bg-neutral-50';
                textClass = 'text-neutral-300';
              }

              return (
                <div
                  key={qNum}
                  data-state={state}
                  className={`inline-flex h-9 w-9 cursor-pointer flex-col items-center justify-center rounded-3xl md:h-11 md:w-11 ${bgClass}`}
                  onClick={() => onSelect(qNum)}
                >
                  <div
                    className={`font-['Pretendard_Variable'] text-base leading-7 font-medium md:text-lg ${textClass}`}
                  >
                    {qNum}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <button
        disabled={currentPage >= totalPages - 1}
        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
      >
        <IconChevronRight
          className={`h-5 w-5 ${currentPage >= totalPages - 1 ? 'text-neutral-300' : 'text-neutral-500'}`}
        />
      </button>
    </div>
  );
}

export default QuestionSelect;
