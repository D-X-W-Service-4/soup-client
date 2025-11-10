import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
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

const TOTAL_QUESTIONS = 2;

export default function QuestionPage() {
  const [current, setCurrent] = useState(1);
  const [question, setQuestion] = useState<QuestionData | null>(null);
  const [solved, setSolved] = useState<number[]>([]);
  const [isHintModalOpen, setIsHintModalOpen] = useState(false);
  const [testInfo, setTestInfo] = useState<{ timeLimit: number } | null>(null);
  const navigate = useNavigate();

  const location = useLocation();
  const hideToolbar = location.state?.hideToolbar ?? false;

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, Option | null>
  >({});
  const [starred, setStarred] = useState<Record<number, boolean>>({});

  const answerValue = answers[current] ?? '';
  const selectedOption = selectedOptions[current] ?? null;

  const isLast = current === TOTAL_QUESTIONS;

  const hints = [
    '이 문제는 유리수 단원의 문제입니다. 화이팅!',
    '두 번째 힌트입니다.',
    '마지막 힌트!',
  ];

  useEffect(() => {
    const loadTestInfo = async () => {
      try {
        const res = await axios.get(
          'http://13.125.158.205:8080/api/leveltest/info' // API 연결시 리뷰 반영해서 수정예정
        );
        setTestInfo(res.data);
      } catch (e) {
        console.error('시험 정보 로드 실패:', e);
        setTestInfo({ timeLimit: 30 });
      }
    };
    loadTestInfo();
  }, []);

  const handleTimeUp = () => {
    alert('시간이 종료되어 자동 제출됩니다.');
    handleSubmit();
  };

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

  const handleSubmit = () => {
    const submissionData = [];

    for (let qNum = 1; qNum <= TOTAL_QUESTIONS; qNum++) {
      const essayAnswer = answers[qNum];
      const selected = selectedOptions[qNum];

      if (essayAnswer) {
        submissionData.push({
          questionId: qNum,
          type: 'answer',
          text: essayAnswer,
        });
      } else if (selected) {
        submissionData.push({
          questionId: qNum,
          type: 'answer',
          text: selected.text,
        });
      }
    }

    console.log('제출 데이터:', submissionData);
    alert('모든 문제를 제출했습니다!');
    navigate('/result');
  };

  const isAllSolved = solved.length === TOTAL_QUESTIONS;
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-start bg-primary-bg">
      <QuestionBar
        totalQuestions={TOTAL_QUESTIONS}
        current={current}
        solved={solved}
        onSelect={handleSelect}
        showTimer={true}
        timeLimit={testInfo?.timeLimit ?? 30}
        onTimeUp={handleTimeUp}
      />

      <div className="relative flex h-[calc(100vh-80px)] w-full flex-1 flex-row items-start justify-start gap-5 p-10">
        {!hideToolbar && (
          <div className="absolute bottom-10 left-8 z-50">
            <HintBar
              hints={hints}
              onOpenHintModal={handleHintModal}
              isHintModalOpen={isHintModalOpen}
              isStarred={!!starred[current]}
              onToggleStar={handleToggleStar}
            />
          </div>
        )}

        <div className="ml-20 flex h-full flex-1 flex-col items-center justify-start gap-6">
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

          <div className="h-full w-full flex-1">
            {question?.type === '단답형' ? (
              <EssayAnswerBox questionId={current} />
            ) : (
              <MultipleChoiceBox questionId={current} />
            )}
          </div>
        </div>

        <div className="relative ml-5 flex h-full flex-col items-center gap-5">
          {isHintModalOpen && (
            <div className="pointer-events-auto absolute top-0 left-0 z-[9999]">
              <HintModal
                isOpen={isHintModalOpen}
                onClose={() => setIsHintModalOpen(false)}
                hints={hints}
              />
            </div>
          )}

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

          <div className="mt-auto flex w-full flex-col items-end gap-10">
            {question?.type === '단답형' && (
              <>
                <WarningBox>
                  원활한 채점을 위해 답안을 <br /> 정확히 작성해 주세요.
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

              <QuestionPageButton
                direction="next"
                label={isLast ? '제출' : '다음'}
                variant="primary"
                onClick={
                  isLast ? handleSubmit : () => handleSelect(current + 1)
                }
                disabled={isLast && !isAllSolved}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
