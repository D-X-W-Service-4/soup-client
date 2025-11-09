import QuestionSelect from './QuestionSelect.tsx';
import Timer from './Timer.tsx';
import Logotype from '../../../assets/Logotype.png';

interface QuestionBarProps {
  totalQuestions: number;
  current: number;
  solved: number[];
  onSelect: (q: number) => void;
  showTimer?: boolean;
  timeLimit?: number;
  onTimeUp?: () => void;
}

function QuestionBar({
  totalQuestions,
  current,
  solved,
  onSelect,
  showTimer = true,
  timeLimit = 30,
  onTimeUp,
}: QuestionBarProps) {
  return (
    <div className="flex w-full items-center justify-between gap-x-6 border-b border-neutral-200 bg-white px-10 py-5">
      <div className="flex-shrink-0">
        <img src={Logotype} alt="App Logo" className="h-8 w-18" />
      </div>

      <div className="flex min-w-[400px] flex-grow justify-center">
        <QuestionSelect
          totalQuestions={totalQuestions}
          current={current}
          solved={solved}
          onSelect={onSelect}
        />
      </div>

      {showTimer && (
        <div className="flex-shrink-0">
          <Timer initialMinutes={timeLimit} onTimeUp={onTimeUp} />
        </div>
      )}
    </div>
  );
}

export default QuestionBar;
