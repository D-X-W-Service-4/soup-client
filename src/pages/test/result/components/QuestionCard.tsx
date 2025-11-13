import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { QuestionItem } from '../../../../types/test.ts';
import DifficultyBadge from './DifficultyBadge.tsx';
import { createQuestionSet } from '../../../../apis/questionSetAPI.ts';
import { toggleQuestionStar } from '../../../../apis/questionAPI.ts';

interface QuestionCardProps extends QuestionItem {
  onStarToggle?: (questionId: string) => void;
}

export default function QuestionCard({
  questionId,
  tryCount,
  isCorrect,
  isStarred,
  createdAt,
  difficulty,
  testName,
  onStarToggle,
}: QuestionCardProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [starred, setStarred] = useState(isStarred);
  const statusIcon = isCorrect
    ? 'lets-icons:check-ring'
    : 'lets-icons:close-ring';
  const statusColor = isCorrect ? 'text-lime-500' : 'text-danger';
  const formattedDate = createdAt ? createdAt.split('T')[0] : '';

  const handleRetry = async () => {
    if (!questionId) return;

    setIsLoading(true);
    try {
      const response = await createQuestionSet([questionId]);

      navigate('/question/study', {
        state: {
          questionSetId: response.data.questionSetId,
          questionSetItems: response.data.questionSetItems,
          totalQuestionCount: response.data.totalQuestionCount,
        },
      });
    } catch (error) {
      console.error('문제 세트 생성 실패:', error);
      alert('문제를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStarToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!questionId) return;

    try {
      await toggleQuestionStar(questionId);
      setStarred(!starred);
      if (onStarToggle) {
        onStarToggle(questionId);
      }
    } catch (error) {
      console.error('별표 토글 실패:', error);
      alert('별표 표시 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex items-center justify-between rounded-md bg-white px-6 py-5 outline outline-1 outline-offset-[-1px] outline-neutral-100">
      <div className="flex items-center justify-start gap-5">
        <Icon icon={statusIcon} className={`h-5 w-5 ${statusColor}`} />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <span className="text-base font-semibold">
              {testName || questionId}
            </span>
            <Icon
              icon="material-symbols:star-rounded"
              className={`h-6 w-6 cursor-pointer ${starred ? 'text-yellow-200' : 'text-neutral-300'}`}
              onClick={handleStarToggle}
            />
          </div>
          <div className="flex items-center gap-2">
            {questionId && (
              <span className="text-xs font-medium text-secondary">
                {questionId}
              </span>
            )}
            {tryCount !== undefined && tryCount > 0 && (
              <span className="text-xs font-normal text-neutral-500">
                {tryCount}번 시도
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-[14px]">
        <DifficultyBadge variant={difficulty} />
        {formattedDate && (
          <span className="text-sm font-medium text-neutral-600">
            {formattedDate}
          </span>
        )}
        <button
          type="button"
          onClick={handleRetry}
          disabled={isLoading}
          className="flex items-center gap-2 rounded-lg bg-neutral-300 px-3 py-2 text-xs font-medium text-white
                 hover:bg-secondary active:bg-secondary-bg disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="다시 풀기"
        >
          <Icon icon="mingcute:play-fill" className="h-3.5 w-3.5" />
          {isLoading ? '로딩 중...' : '다시 풀기'}
        </button>
      </div>
    </div>
  );
}
