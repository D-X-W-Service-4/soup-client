// src/pages/QuestionPage/QuestionPage.tsx
import { useState, useEffect } from 'react';
import axiosInstance from '../../apis/axiosInstance.ts';
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
import HintModal from './component/HintModal.tsx';

import { useAnswerStore } from '../../stores/useAnswerStore.ts';
import { uploadImageToS3_GET } from '../../utils/uploadToS3';
import { toggleQuestionStar } from '../../apis/questionAPI.ts';

declare global {
  interface Window {
    saveEssayAnswer?: (id: number) => Promise<void>;
  }
}

const TOTAL_QUESTIONS = 10;

export default function QuestionPage() {
  const [current, setCurrent] = useState(1);
  const [questions, setQuestions] = useState<any[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [isHintModalOpen, setIsHintModalOpen] = useState(false);

  const [testInfo, setTestInfo] = useState<{
    timeLimit: number;
    totalQuestionCount: number;
  } | null>(null);

  const [levelTestId, setLevelTestId] = useState<number | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, string[]>
  >({});
  const [starred, setStarred] = useState<Record<number, boolean>>({});
  const [isStarring, setIsStarring] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const subjectUnitIds = location.state?.subjectUnitIds ?? [];
  const hideToolbar = location.state?.hideToolbar ?? false;

  const currentQuestion = questions[current - 1]?.question;
  const answerValue = answers[current] ?? '';
  const isLast = current === (testInfo?.totalQuestionCount ?? TOTAL_QUESTIONS);

  const hints = currentQuestion?.topic ? [currentQuestion.topic] : [];

  const images = useAnswerStore((state) => state.images);

  useEffect(() => {
    const createLevelTest = async () => {
      try {
        useAnswerStore.getState().clearAll();

        const res = await axiosInstance.post('/v1/level-tests', {
          isInitialTest: hideToolbar,
          subjectUnitIds,
        });

        const data = res.data.data;
        setLevelTestId(data.levelTestId);
        setQuestions(data.levelTestQuestions || []);

        const raw = data.timeLimit ?? 30;
        const cnt = data.totalQuestionCount ?? TOTAL_QUESTIONS;

        setTestInfo({
          timeLimit: raw > 180 ? Math.floor(raw / 60) : raw,
          totalQuestionCount: cnt,
        });
      } catch (e) {
        console.error('레벨 테스트 생성 실패:', e);
        setTestInfo({ timeLimit: 30, totalQuestionCount: TOTAL_QUESTIONS });
      }
    };

    createLevelTest();
  }, [hideToolbar, subjectUnitIds]);

  useEffect(() => {
    if (!testInfo) return;
    const total = testInfo.totalQuestionCount;
    const list: number[] = [];

    for (let i = 1; i <= total; i++) {
      if (
        (answers[i]?.trim().length ?? 0) > 0 ||
        (selectedOptions[i]?.length ?? 0) > 0
      ) {
        list.push(i);
      }
    }
    setSolved(list);
  }, [answers, selectedOptions, testInfo]);

  const handleSelect = async (target: number) => {
    if (!testInfo || isNavigating) return;

    const total = testInfo.totalQuestionCount;
    if (target < 1 || target > total) return;

    setIsNavigating(true);
    try {
      if (
        currentQuestion?.questionFormat === '단답형' &&
        window.saveEssayAnswer
      ) {
        await window.saveEssayAnswer(current);
      }

      setCurrent(target);
    } finally {
      setIsNavigating(false);
    }
  };

  const handleToggleStar = async () => {
    const questionId = currentQuestion?.questionId;
    if (!questionId || isStarring) return;

    setIsStarring(true);
    try {
      await toggleQuestionStar(questionId);
      setStarred((p) => ({ ...p, [current]: !p[current] }));
    } catch (error) {
      console.error('별표 토글 실패:', error);
      alert('별표 표시 중 오류가 발생했습니다.');
    } finally {
      setIsStarring(false);
    }
  };

  const handleSubmit = async () => {
    if (!testInfo || !levelTestId || isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (
        currentQuestion?.questionFormat === '단답형' &&
        window.saveEssayAnswer
      ) {
        await window.saveEssayAnswer(current);
      }

      const total = testInfo.totalQuestionCount;
      const submission: any[] = [];

      for (let q = 1; q <= total; q++) {
        const essay = answers[q];
        const option = selectedOptions[q];
        const qData = questions[q - 1];

        const questionId = qData?.question?.questionId;
        const levelTestQuestionId = qData?.levelTestQuestionId;

        if (!questionId) continue;

        if (essay) {
          let finalUrl = null;
          const base64 = images[q];

          if (base64) {
            const fileName = `descriptions/leveltest_${levelTestId}_${levelTestQuestionId}.png`;
            finalUrl = await uploadImageToS3_GET(base64, fileName);
          }

          submission.push({
            questionId,
            userAnswer: essay,
            descriptiveImageUrl: finalUrl,
          });

          continue;
        }

        if (option && option.length > 0) {
          submission.push({
            questionId,
            userAnswer: option.join(', '),
            descriptiveImageUrl: null,
          });
        }
      }

      console.log('제출 데이터:', submission);

      await axiosInstance.post(`/v1/level-tests/${levelTestId}/grade`, {
        answers: submission,
      });

      alert('제출 완료!');
      navigate('/home');
    } catch (e) {
      console.error('제출 실패:', e);
      alert('제출 중 오류 발생');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isAllSolved =
    solved.length === (testInfo?.totalQuestionCount ?? TOTAL_QUESTIONS);

  const imageUrl = currentQuestion?.filename
    ? `${import.meta.env.VITE_S3_BASE_URL}${currentQuestion.filename}`
    : null;

  return (
    <div className="relative flex h-screen w-full flex-col bg-primary-bg">
      {testInfo && (
        <QuestionBar
          totalQuestions={testInfo.totalQuestionCount}
          current={current}
          solved={solved}
          onSelect={handleSelect}
          timeLimit={testInfo.timeLimit}
          showTimer={true}
          onTimeUp={handleSubmit}
        />
      )}

      <div className="relative flex h-[calc(100vh-80px)] w-full flex-row gap-5 p-10">
        {!hideToolbar && (
          <div className="absolute bottom-10 left-8 z-100">
            <HintBar
              hints={hints}
              onOpenHintModal={() => setIsHintModalOpen(true)}
              isHintModalOpen={isHintModalOpen}
              isStarred={!!starred[current]}
              onToggleStar={handleToggleStar}
            />
          </div>
        )}

        <div className="ml-20 flex flex-1 flex-col gap-6">
          <div className="w-full flex-[0.4]">
            {currentQuestion ? (
              <QuestionDisplay
                imageUrl={imageUrl}
                textContent={currentQuestion.text}
              />
            ) : (
              <div className="text-center text-lg text-gray-400">
                문제를 불러오는 중...
              </div>
            )}
          </div>

          <div className="w-full flex-1">
            {currentQuestion?.questionFormat === '단답형' ? (
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

          {currentQuestion?.questionFormat === '선택형' && (
            <OptionList
              options={[
                { id: 1, text: '' },
                { id: 2, text: '' },
                { id: 3, text: '' },
                { id: 4, text: '' },
                { id: 5, text: '' },
              ]}
              selectedOptionIds={selectedOptions[current]?.map(Number) ?? []}
              onSelect={(v) =>
                setSelectedOptions((p) => ({ ...p, [current]: v }))
              }
              isHintOpen={isHintModalOpen}
            />
          )}

          <div className="mt-auto flex w-full flex-col items-end gap-10">
            {currentQuestion?.questionFormat === '단답형' && (
              <>
                <WarningBox>
                  풀이과정 없이 단답형 답안 채점만을 원할 시 풀이를 모두
                  지워주세요.
                </WarningBox>
                <AnswerInput
                  value={answerValue}
                  onAnswerChange={(v) =>
                    setAnswers((p) => ({ ...p, [current]: v }))
                  }
                />
              </>
            )}

            <div className="flex w-full gap-7">
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
