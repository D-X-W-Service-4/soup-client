import { Icon } from '@iconify/react';
import { timeStringToSeconds } from '../../../../utils/time.ts';
import { useNavigate } from 'react-router-dom';

const clampPct = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

interface TestCardProps {
  testId: number;
  name: string;
  createdAt: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: string;
  timeGiven: string;
}

export default function TestCard({
  testId,
  name,
  createdAt,
  score,
  totalQuestions,
  correctAnswers,
  timeTaken,
  timeGiven,
}: TestCardProps) {
  const navigate = useNavigate();

  const scorePct = clampPct(score);
  const correctPct = clampPct(
    totalQuestions ? (correctAnswers / totalQuestions) * 100 : 0
  );

  const taken = timeStringToSeconds(timeTaken);
  const given = timeStringToSeconds(timeGiven);
  const timePct = clampPct(given ? (taken / given) * 100 : 0);
  const formattedDate = createdAt ? createdAt.split('T')[0] : '';

  return (
    <div
      onClick={() => navigate(`/test/result/${testId}`)}
      className="flex cursor-pointer items-center justify-between gap-8 rounded-[10px] bg-white p-5 outline outline-1 outline-offset-[-1px] outline-neutral-100 hover:bg-neutral-50"
    >
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => navigate(`/test/result/${testId}`)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-bg text-primary hover:opacity-80 active:opacity-70"
          aria-label="다시 풀기"
        >
          <Icon icon="mingcute:play-fill" className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-3">
          <span className="truncate text-base font-semibold text-secondary">
            {name}
          </span>
          <span className="text-sm font-medium text-neutral-400">
            {formattedDate}
          </span>
        </div>
      </div>

      <div className="grid grid-rows-3 gap-2">
        <div className="flex items-center justify-end gap-5">
          <span className="text-xs font-normal text-neutral-400">점수</span>
          <div
            className="relative h-4 w-60 overflow-hidden rounded-[10px] bg-gray-100"
            role="progressbar"
            aria-label="점수"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={scorePct}
          >
            <div
              className="h-full bg-primary transition-[width]"
              style={{ width: `${scorePct}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <span className="text-xs font-normal text-neutral-400">
            맞은 문제 수
          </span>
          <div
            className="relative h-4 w-60 overflow-hidden rounded-[10px] bg-gray-100"
            role="progressbar"
            aria-label="맞은 문제 수"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={correctPct}
          >
            <div
              className="h-full bg-primary transition-[width]"
              style={{ width: `${correctPct}%` }}
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-5">
          <span className="text-xs font-normal text-neutral-400">
            풀이 시간
          </span>
          <div
            className="relative h-4 w-60 overflow-hidden rounded-[10px] bg-gray-100"
            role="progressbar"
            aria-label="풀이 시간"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={timePct}
          >
            <div
              className="h-full bg-primary transition-[width]"
              style={{ width: `${timePct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
