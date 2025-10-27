import Button from '../../../components/Button.tsx';
import IconArrowRight from '../../../assets/IconArrowRight.tsx';

type QuestionPageButtonProps = {
  direction: 'prev' | 'next';
  label: string;
  variant?: 'primary' | 'secondary';
  textColor?: string;
  bgColor?: string;
};

const QuestionPageButton = ({
  direction,
  label,
  variant = 'secondary',
  textColor,
  bgColor,
}: QuestionPageButtonProps) => {
  return (
    <Button
      size="large"
      variant={variant}
      className={`
                flex flex-1 items-center justify-between gap-1 rounded-lg px-5 py-3 text-base font-medium
                ${bgColor ? bgColor : variant === 'primary' ? 'bg-primary' : 'bg-secondary-bg'}
                ${textColor ? textColor : variant === 'primary' ? 'text-white' : 'text-secondary'}
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
    </Button>
  );
};

export default QuestionPageButton;
