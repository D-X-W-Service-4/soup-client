// App.tsx
import { useState } from 'react';
import QuestionBar from './pages/Question/component/QuestionBar.tsx';
import HintBar from './pages/Question/component/HintBar.tsx';
import WarningBox from './pages/Question/component/WarningBox.tsx';
import AnswerInput from './pages/Question/component/InputBox.tsx';
import HintModal from './pages/Question/component/HintModal.tsx';
import QuestionPageButton from './pages/Question/component/QuestionPageButton.tsx';
import QuestionDisplay from './pages/Question/component/QuestionDisplay.tsx';
import EssayAnswerBox from './pages/Question/component/EssayAnswerBox.tsx';
import MultipleChoiceBox from './pages/Question/component/MultipleChoiceBox.tsx';
import OptionList from './pages/Question/component/OptionList.tsx';

const App = () => {
  const [answer, setAnswer] = useState('');
  const [isHintModalOpen, setIsHintModalOpen] = useState(false);
  const [questionType, setQuestionType] = useState<'essay' | 'objective'>(
    'objective'
  ); // 기본은 객관식

  const handleHintModal = () => {
    setIsHintModalOpen((prev) => !prev);
  };

  const hints = [
    '이 문제는 유리수 단원의 문제입니다. 화이팅',
    '두 번째 힌트입니다.',
    '마지막 힌트!',
  ];

  const mockQuestion = {
    imageUrl: null,
    textContent: '여기에 문제 내용이 표시됩니다.',
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-start bg-primary-bg">
      <QuestionBar />

      {/* 메인 컨테이너 */}
      <div className="relative flex h-[calc(100vh-80px)] w-full flex-1 flex-row items-start justify-start gap-5 p-10">
        {/* 힌트 바 (절대 위치) */}
        <div className="absolute bottom-10 left-8 z-50">
          <HintBar
            hints={hints}
            onOpenHintModal={handleHintModal}
            isHintModalOpen={isHintModalOpen}
            onSwitchEssay={() =>
              setQuestionType((prev) =>
                prev === 'essay' ? 'objective' : 'essay'
              )
            }
            isEssaySelected={questionType === 'essay'}
          />
        </div>

        {/* 문제 + 답 영역 */}
        <div className="ml-20 flex h-full flex-1 flex-col items-center justify-start gap-6">
          {/* 문제 표시 영역 */}
          <div className="w-full flex-[0.4]">
            <QuestionDisplay
              imageUrl={mockQuestion.imageUrl}
              textContent={mockQuestion.textContent}
              className="h-full w-full"
            />
          </div>

          {/* 답안 영역 */}
          <div className="h-full w-full flex-1">
            {questionType === 'essay' ? (
              <EssayAnswerBox />
            ) : (
              <MultipleChoiceBox />
            )}
          </div>
        </div>

        {/* 오른쪽 영역 */}
        <div className="ml-5 flex h-full flex-col items-center gap-5">
          {isHintModalOpen && (
            <div>
              <HintModal
                isOpen={isHintModalOpen}
                onClose={() => setIsHintModalOpen(false)}
                hints={hints}
              />
            </div>
          )}

          {questionType === 'objective' && (
            <OptionList
              options={['보기 1', '보기 2', '보기 3', '보기 4', '보기 5']}
              isHintOpen={isHintModalOpen}
            />
          )}

          {/* mt-auto를 줘서 버튼과 경고박스를 아래로 밀기 */}
          <div className="mt-auto flex w-full flex-col items-end gap-10">
            {questionType === 'essay' && (
              <>
                <WarningBox>
                  원활한 채점을 위해 답안을 <br />
                  정확히 작성해 주세요.
                </WarningBox>

                <AnswerInput
                  value={answer}
                  onAnswerChange={(val) => setAnswer(val)}
                />
              </>
            )}

            <div className="flex w-full flex-row items-center gap-7">
              <QuestionPageButton
                direction="prev"
                label="이전"
                variant="secondary"
              />
              <QuestionPageButton
                direction="next"
                label="다음"
                variant="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
