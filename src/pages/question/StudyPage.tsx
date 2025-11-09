import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionBar from './component/QuestionBar.tsx';
import HintBar from './component/HintBar.tsx';
import WarningBox from './component/WarningBox.tsx';
import AnswerInput from './component/InputBox.tsx';
import QuestionPageButton from './component/QuestionPageButton.tsx';
import QuestionDisplay from './component/QuestionDisplay.tsx';
import EssayAnswerBox from './component/EssayAnswerBox.tsx';
import MultipleChoiceBox from './component/MultipleChoiceBox.tsx';
import OptionList from './component/OptionList.tsx';
import type { Option } from './component/OptionList.tsx';
import HintModal from './component/HintModal.tsx';
import { fetchQuestionById } from '../../apis/questionAPI.tsx';
import type { QuestionData } from '../../apis/questionAPI.tsx';

const TOTAL_QUESTIONS = 2; // mockQuestions 개수

export default function StudyPage() {
  const [current, setCurrent] = useState(1);
  const [question, setQuestion] = useState<QuestionData | null>(null);
  const [solved, setSolved] = useState<number[]>([]);
  const [isHintModalOpen, setIsHintModalOpen] = useState(false);
  const navigate = useNavigate();

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, Option | null>
  >({});
  const [starred, setStarred] = useState<Record<number, boolean>>({});

  const answerValue = answers[current] ?? '';
  const selectedOption = selectedOptions[current] ?? null;

  const hints = [
    '이 문제는 유리수 단원의 문제입니다. 화이팅!',
    '두 번째 힌트입니다.',
    '마지막 힌트!',
  ];

  // 문제 불러오기
  useEffect(() => {
    const loadQuestion = async () => {
      try {
        const q = await fetchQuestionById(current);
        setQuestion(q);
      } catch (e) {
        console.error('문제 로드 중 오류:', e);
        setQuestion(null);
      }
    };
    loadQuestion();
  }, [current]);

  // 풀이 여부 확인
  useEffect(() => {
    const newSolved: number[] = [];
    for (let q = 1; q <= TOTAL_QUESTIONS; q++) {
      const hasEssay = (answers[q]?.trim().length ?? 0) > 0;
      const hasObjective = !!selectedOptions[q];
      if (hasEssay || hasObjective) newSolved.push(q);
    }
    setSolved(newSolved);
  }, [answers, selectedOptions]);

  const handleSelect = (qNum: number) => {
    if (qNum >= 1 && qNum <= TOTAL_QUESTIONS) setCurrent(qNum);
  };

  const handleOptionSelect = (option: Option | null) => {
    setSelectedOptions((prev) => ({ ...prev, [current]: option }));
  };

  const handleToggleStar = () => {
    setStarred((prev) => ({ ...prev, [current]: !prev[current] }));
  };

  const handleHintModal = () => setIsHintModalOpen((prev) => !prev);

  // 학습모드에서는 제출 없음 → 다음 문제로만 이동
  const handleFinish = () => {
    alert('학습을 모두 완료했습니다!');
    navigate('/result');
  };

  const isAllSolved = solved.length === TOTAL_QUESTIONS;

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-start bg-primary-bg">
      {/* 타이머 제거된 상단 바 */}
      <QuestionBar
        totalQuestions={TOTAL_QUESTIONS}
        current={current}
        solved={solved}
        onSelect={handleSelect}
        showTimer={false}
      />

      {/* 메인 영역 */}
      <div className="relative flex h-[calc(100vh-80px)] w-full flex-1 flex-row items-start justify-start gap-5 p-10">
        {/* 힌트 바 */}
        <div className="absolute bottom-10 left-8 z-50">
          <HintBar
            hints={hints}
            onOpenHintModal={handleHintModal}
            isHintModalOpen={isHintModalOpen}
            isStarred={!!starred[current]}
            onToggleStar={handleToggleStar}
          />
        </div>

        {/* 문제 및 풀이 영역 */}
        <div className="ml-20 flex h-full flex-1 flex-col items-center justify-start gap-6">
          {/* 문제 표시 */}
          <div className="w-full flex-[0.4]">
            {question ? (
              <QuestionDisplay
                imageUrl={
                  question.contents?.endsWith('.png') ? question.contents : null
                }
                textContent={
                  !question.contents?.endsWith('.png')
                    ? question.contents || ''
                    : ''
                }
              />
            ) : (
              <div className="text-center text-lg text-gray-400">
                문제를 불러오는 중...
              </div>
            )}
          </div>

          {/* 풀이 영역 */}
          <div className="h-full w-full flex-1">
            {question?.type === '단답형' ? (
              <EssayAnswerBox questionId={current} />
            ) : (
              <MultipleChoiceBox questionId={current} />
            )}
          </div>
        </div>

        {/* 우측 보기 + 버튼 */}
        <div className="relative ml-5 flex h-full flex-col items-center gap-5">
          {/* 힌트 모달 */}
          {isHintModalOpen && (
            <div className="pointer-events-auto absolute top-0 left-0 z-[9999]">
              <HintModal
                isOpen={isHintModalOpen}
                onClose={() => setIsHintModalOpen(false)}
                hints={hints}
              />
            </div>
          )}

          {/* 객관식 보기 */}
          {question?.type === '객관식' && (
            <OptionList
              options={[
                { id: 1, text: '①  4' },
                { id: 2, text: '②  6' },
                { id: 3, text: '③  7' },
                { id: 4, text: '④  8' },
                { id: 5, text: '⑤  9' },
              ]}
              selectedOption={selectedOption}
              onSelect={handleOptionSelect}
              isHintOpen={isHintModalOpen}
            />
          )}
          {/*
          <OptionList
            options={question.options || []}
            selectedOption={selectedOptions[current] ?? null}
            onSelect={handleOptionSelect}
            isHintOpen={isHintModalOpen}
          />
          */}

          {/* 하단 버튼 */}
          <div className="mt-auto flex w-full flex-col items-end gap-10">
            {question?.type === '단답형' && (
              <>
                <WarningBox>
                  학습을 위해 답안을 <br /> 자유롭게 작성해 보세요.
                </WarningBox>
                <AnswerInput
                  value={answerValue}
                  onAnswerChange={(val) =>
                    setAnswers((prev) => ({ ...prev, [current]: val }))
                  }
                />
              </>
            )}

            <div className="flex w-full flex-row items-center gap-7">
              <QuestionPageButton
                direction="prev"
                label="이전"
                variant="secondary"
                onClick={() => handleSelect(current - 1)}
                disabled={current === 1}
              />
              {current === TOTAL_QUESTIONS ? (
                <QuestionPageButton
                  direction="next"
                  label="완료"
                  variant="primary"
                  onClick={handleFinish}
                  disabled={!isAllSolved}
                />
              ) : (
                <QuestionPageButton
                  direction="next"
                  label="다음"
                  variant="primary"
                  onClick={() => handleSelect(current + 1)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
