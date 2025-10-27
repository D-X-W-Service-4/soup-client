import { useState, useEffect } from 'react';
import IconRightArrow from '../../../assets/IconRightArrow.tsx';
import IconHint_sm from '../../../assets/IconHint_sm.tsx';
import Button from '../../../components/Button.tsx';
import IconX_Red from '../../../assets/IconX_Red.tsx';

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
    if (!isFirstHint) {
      setCurrentHintIndex((p) => p - 1);
    }
  };

  return (
    <div className="inline-flex h-60 w-60 flex-col items-end justify-between rounded-[20px] bg-white px-5 py-6 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.05)]">
      <div className="flex flex-col items-center justify-start gap-5 self-stretch">
        <div className="flex items-center justify-between self-stretch">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-neutral-50">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-400">
              <IconHint_sm className="text-white" />
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition-colors hover:bg-gray-100"
          >
            <IconX_Red className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="flex flex-col items-start justify-start gap-3 self-stretch">
          <div className="self-stretch font-['Pretendard_Variable'] text-xs leading-none font-bold text-black">
            힌트 {currentHintIndex + 1}
          </div>
          <div
            className="self-stretch font-['Pretendard_Variable'] text-sm leading-tight font-medium text-black"
            dangerouslySetInnerHTML={{ __html: currentHint }}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-12.5 self-stretch">
        {!isFirstHint && (
          <Button
            onClick={handlePreviousHint}
            size={'medium'}
            variant="primary_bg"
          >
            <div className="flex items-center gap-2">
              {!isFirstHint && (
                <IconRightArrow className="h-3.5 w-3.5 rotate-180 text-secondary" />
              )}

              <span className="text-xs leading-none font-medium text-secondary">
                {isFirstHint ? '' : '이전'}
              </span>
            </div>
          </Button>
        )}
        <Button
          onClick={handleNextHint}
          size="medium"
          variant="primary_bg"
          disabled={hintCount === 0}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs leading-none font-medium text-secondary">
              {isLastHint ? '닫기' : '다음'}
            </span>
            <IconRightArrow
              className={`h-3.5 w-3.5 text-secondary ${isLastHint ? 'invisible' : ''}`}
            />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default HintModal;
