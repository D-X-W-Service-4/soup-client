import IconArrowRight from '../../../assets/svgs/IconArrowRight.tsx';

type QuestionPageButtonProps = {
  direction: 'prev' | 'next';
  label: string;
  variant?: 'primary' | 'secondary';
  textColor?: string;
  bgColor?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function QuestionPageButton({
  direction,
  label,
  variant = 'secondary',
  textColor,
  bgColor,
  onClick,
  disabled = false,
}: QuestionPageButtonProps) {
  const baseBg =
    bgColor ?? (variant === 'primary' ? 'bg-red-400' : 'bg-neutral-100');
  const baseText =
    textColor ?? (variant === 'primary' ? 'text-white' : 'text-neutral-700');
  const disabledStyle = 'opacity-50 cursor-not-allowed';

  return (
    <button
      type="button"
      onClick={() => {
        if (!disabled) {
          console.log(`✅ Prev/Next 클릭됨 → direction: ${direction}`);
          onClick?.();
        }
      }}
      disabled={disabled}
      className={`
        flex flex-1 items-center justify-between gap-1 rounded-lg px-5 py-3 text-base font-medium
        ${baseBg} ${baseText} ${disabled ? disabledStyle : ''}
      `}
    >
      {direction === 'prev' && (
        <>
          <IconArrowRight className="h-5 w-5 rotate-180" />
          <span>{label}</span>
        </>
      )}
      {direction === 'next' && (
        <>
          <span>{label}</span>
          <IconArrowRight className="h-5 w-5" />
        </>
      )}
    </button>
  );
}
