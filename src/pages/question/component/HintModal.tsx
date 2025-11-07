import { useState, useEffect } from 'react';
import IconRightArrow from '../../../assets/svgs/IconRightArrow.tsx';
import IconHint_sm from '../../../assets/svgs/IconHint_sm.tsx';
import Button from '../../../components/Button.tsx';
import IconX_Red from '../../../assets/svgs/IconX_Red.tsx';

type HintModalProps = {
  isOpen: boolean;
  onClose: () => void;
  hints: string[];
};

const HintModal = ({ isOpen, onClose, hints }: HintModalProps) => {
  const [currentHintIndex, setCurrentHintIndex] = useState(0);

  useEffect(() => {
    if (isOpen) setCurrentHintIndex(0);
  }, [isOpen]);

  if (!isOpen) return null;

  const hintCount = Array.isArray(hints) ? hints.length : 0;
  const currentHint =
    hintCount > 0 ? hints[currentHintIndex] : '등록된 힌트가 없습니다.';
  const isLastHint = currentHintIndex === Math.max(0, hintCount - 1);
  const isFirstHint = currentHintIndex === 0;

  const handleNextHint = () => {
    if (currentHintIndex < hintCount - 1) setCurrentHintIndex((p) => p + 1);
    else onClose();
  };

  const handlePreviousHint = () => {
    if (!isFirstHint) setCurrentHintIndex((p) => p - 1);
  };

  return (
    <div className="inline-flex h-60 w-60 flex-col justify-between overflow-hidden rounded-[20px] bg-white px-5 py-6 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.05)]">
      {/* 상단 헤더 */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-neutral-50">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-400">
            <IconHint_sm className="text-white" />
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 transition-colors hover:bg-gray-100"
        >
          <IconX_Red className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      {/* 힌트 내용 */}
      <div className="mb-4 flex flex-col gap-3">
        <div className="text-xs font-bold text-black">
          힌트 {currentHintIndex + 1}
        </div>
        <div
          className="text-sm leading-tight font-medium text-black"
          dangerouslySetInnerHTML={{ __html: currentHint }}
        />
      </div>

      {/* 하단 버튼 영역 */}
      <div className="flex w-full items-center justify-end gap-4">
        {!isFirstHint && (
          <Button
            type="button"
            onClick={handlePreviousHint}
            size="medium"
            variant="primary_bg"
          >
            <div className="flex items-center gap-2">
              <IconRightArrow className="h-3.5 w-3.5 rotate-180 text-secondary" />
              <span className="text-xs font-medium text-secondary">이전</span>
            </div>
          </Button>
        )}
        <Button
          type="button"
          onClick={handleNextHint}
          size="medium"
          variant="primary_bg"
          disabled={hintCount === 0}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-secondary">
              {isLastHint ? '닫기' : '다음'}
            </span>
            {!isLastHint && (
              <IconRightArrow className="h-3.5 w-3.5 text-secondary" />
            )}
          </div>
        </Button>
      </div>
    </div>
  );
};

export default HintModal;
