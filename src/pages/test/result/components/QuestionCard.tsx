import { Icon } from '@iconify/react';
import DifficultyBadge from './DifficultyBadge.tsx';

interface QuestionCardProps {
  question: string;
  tryCount: number;
  isCorrect: boolean;
  isStarred: boolean;
  createdAt: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export default function QuestionCard({
  question,
  tryCount,
  isCorrect,
  isStarred,
  createdAt,
  difficulty,
}: QuestionCardProps) {
  const statusIcon = isCorrect
    ? 'lets-icons:check-ring'
    : 'lets-icons:close-ring';
  const statusColor = isCorrect ? 'text-lime-500' : 'text-danger';

  return (
    <div className="flex items-center justify-between rounded-md px-6 py-5 outline outline-1 outline-offset-[-1px] outline-neutral-100">
      <div className="flex items-center justify-start gap-5">
        <Icon icon={statusIcon} className={`h-5 w-5 ${statusColor}`} />
        <div className="flex flex-col">
          <div className="flex gap-5">
            <span className="text-base font-semibold">{question}</span>
            {isStarred && (
              <Icon
                icon="material-symbols:star-rounded"
                className="h-6 w-6 text-yellow-200"
              />
            )}
          </div>
          <span className="text-xs font-normal text-neutral-500">
            {tryCount}번 시도
          </span>
        </div>
      </div>
      <div className="flex items-center gap-[14px]">
        <DifficultyBadge variant={difficulty} />
        <span className="text-sm font-medium text-neutral-600">
          {createdAt}
        </span>
        <button
          type="button"
          onClick={() => {}}
          className="flex items-center gap-2 rounded-lg bg-neutral-300 px-3 py-2 text-xs font-medium text-white
                 hover:bg-secondary active:bg-secondary-bg"
          aria-label="다시 풀기"
        >
          <Icon icon="mingcute:play-fill" className="h-3.5 w-3.5" />
          다시 풀기
        </button>
      </div>
    </div>
  );
}
