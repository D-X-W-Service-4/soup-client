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
        <Icon icon={statusIcon} className={`h-4 w-4 ${statusColor}`} />
        <div className="flex flex-col">
          <span className="text-base font-semibold">{question}</span>
          <span className="text-xs font-normal text-neutral-500">
            {tryCount}번 시도
          </span>
        </div>
        {isStarred && (
          <Icon
            icon="material-symbols:star-rounded"
            className="h-4 w-5 border-yellow-200 bg-yellow-200"
          />
        )}
      </div>
      <div className="flex gap-[14px]">
        <DifficultyBadge variant={difficulty} />
        <span className="text-sm font-medium text-neutral-600">
          {createdAt}
        </span>
        <button
          onClick={() => {}}
          className="text-sm font-medium text-primary underline"
        >
          다시 풀기
        </button>
      </div>
    </div>
  );
}
