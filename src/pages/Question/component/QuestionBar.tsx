import { useState } from 'react';
import QuestionSelect from './QuestionSelect.tsx';
import Timer from './Timer.tsx';
import Logotype from '../../../assets/Logotype.png';

function QuestionBar() {
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const handleSelectQuestion = (q: number) => {
    setCurrentQuestion(q);
  };

  return (
    <div className="flex w-full items-center justify-between gap-x-6 gap-y-4 border-b-[0.50px] border-neutral-200 bg-white px-10 py-5">
      <div className="flex-shrink-0">
        <img src={Logotype} alt="App Logo" className="h-8 w-18" />
      </div>

      <div className="flex min-w-[400px] flex-grow justify-center">
        <QuestionSelect
          totalQuestions={20}
          current={currentQuestion}
          solved={[]}
          onSelect={handleSelectQuestion}
        />
      </div>

      <div className="flex-shrink-0">
        <Timer initialMinutes={30} />
      </div>
    </div>
  );
}

export default QuestionBar;
