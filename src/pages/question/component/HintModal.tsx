import IconHint_sm from '../../../assets/svgs/IconHint_sm.tsx';
import IconX_Red from '../../../assets/svgs/IconX_Red.tsx';

type HintModalProps = {
  isOpen: boolean;
  onClose: () => void;
  hints: string[];
};

const HintModal = ({ isOpen, onClose, hints }: HintModalProps) => {
  if (!isOpen) return null;

  const currentHint =
    Array.isArray(hints) && hints.length > 0
      ? hints[0]
      : '등록된 힌트가 없습니다.';

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
        <div className="text-xs font-bold text-black">힌트</div>
        <div
          className="text-sm leading-tight font-medium text-black"
          dangerouslySetInnerHTML={{ __html: currentHint }}
        />
      </div>

      {/* 닫기 버튼 */}
      <button
        type="button"
        onClick={onClose}
        className="flex w-full items-center justify-center rounded-lg bg-gray-100 py-2 text-xs font-medium text-secondary transition hover:bg-gray-200"
      >
        닫기
      </button>
    </div>
  );
};

export default HintModal;
