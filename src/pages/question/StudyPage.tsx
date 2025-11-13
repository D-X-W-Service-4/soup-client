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
import { toggleQuestionStar } from '../../apis/questionAPI.ts';

declare global {
  interface Window {
    saveEssayAnswer?: (id: number) => Promise<void>;
  }
}

export default function StudyPage() {
  const [current, setCurrent] = useState(1);
  const [questions, setQuestions] = useState<any[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [isHintModalOpen, setIsHintModalOpen] = useState(false);
  const [questionSetId, setQuestionSetId] = useState<number | null>(null);

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

  const images = useAnswerStore((state) => state.images);

  const TOTAL_QUESTIONS = questions.length;
  const answerValue = answers[current] ?? '';
  const isLast = current === TOTAL_QUESTIONS;

  const currentQuestionItem = questions[current - 1];
  const currentQuestion = currentQuestionItem?.question;
  const hints = currentQuestion?.topic ? [currentQuestion.topic] : [];

  // ⭐️ (수정) ReviewPage에서 넘겨준 location.state를 받아 state 설정
  useEffect(() => {
    // 1. location.state에서 데이터 추출 (ReviewPage가 보낸 형식)
    const state = location.state as {
      questionSetId: number;
      questionSetItems: any[]; // any[]로 받음
    };

    const stateId = state?.questionSetId;
    const stateItems = state?.questionSetItems;

    if (!stateId || !stateItems || stateItems.length === 0) {
      alert('잘못된 접근입니다. 문제 선택 페이지로 이동합니다.');
      navigate('/'); // (메인이나 문제 선택 페이지로)
      return;
    }

    // 2. 캔버스 초기화 (QuestionPage와 동일)
    useAnswerStore.getState().clearAll();

    // 3. state 설정
    setQuestionSetId(stateId);
    setQuestions(stateItems);
  }, [location.state, navigate]); // location.state가 바뀔 일은 없지만, 명시적 의존성

  // 풀이 여부 체크 (QuestionPage와 동일)
  useEffect(() => {
    if (TOTAL_QUESTIONS === 0) return;
    const newSolved: number[] = [];

    for (let q = 1; q <= TOTAL_QUESTIONS; q++) {
      const hasEssay = (answers[q]?.trim().length ?? 0) > 0;
      const hasObjective = (selectedOptions[q]?.length ?? 0) > 0;
      if (hasEssay || hasObjective) newSolved.push(q);
    }

    setSolved(newSolved);
  }, [answers, selectedOptions, TOTAL_QUESTIONS]);

  // 문제 이동 (QuestionPage와 동일)
  const handleSelect = async (qNum: number) => {
    if (qNum < 1 || qNum > TOTAL_QUESTIONS || isNavigating) return;

    setIsNavigating(true);
    try {
      const currentQuestionType =
        questions[current - 1]?.question?.questionFormat;

      if (currentQuestionType === '단답형' && window.saveEssayAnswer) {
        try {
          await window.saveEssayAnswer(current);
        } catch (err) {
          console.warn('saveEssayAnswer 실행 중 오류:', err);
        }
      }

      setCurrent(qNum);
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
      setStarred((prev) => ({ ...prev, [current]: !prev[current] }));
    } catch (error) {
      console.error('별표 토글 실패:', error);
      alert('별표 표시 중 오류가 발생했습니다.');
    } finally {
      setIsStarring(false);
    }
  };

  const handleHintModal = () => setIsHintModalOpen((prev) => !prev);

  // 제출 로직 (QuestionPage와 동일, ID와 API 주소만 다름)
  const handleSubmit = async () => {
    if (!questionSetId || isSubmitting) {
      if (!questionSetId) {
        alert('문제 세트 ID가 없습니다. 다시 시도해주세요.');
      }
      return;
    }

    setIsSubmitting(true);
    try {
      const currentQuestionType =
        questions[current - 1]?.question?.questionFormat;
      if (currentQuestionType === '단답형' && window.saveEssayAnswer) {
        try {
          console.log('제출 전 마지막 단답형 캡처 저장');
          await window.saveEssayAnswer(current);
        } catch (err) {
          console.warn(' 마지막 saveEssayAnswer 실행 중 오류:', err);
        }
      }

      const totalCount = TOTAL_QUESTIONS;
      const submissionData: any[] = [];

      for (let qNum = 1; qNum <= totalCount; qNum++) {
        const essayAnswer = answers[qNum];
        const selected = selectedOptions[qNum];
        const questionItem = questions[qNum - 1];
        const questionId = questionItem?.question?.questionId;

        if (!questionItem || !questionId) continue;

        if (essayAnswer) {
          const imageBase64 = images[qNum] ?? null;
          submissionData.push({
            questionId,
            userAnswer: essayAnswer,
            descriptiveImageUrl: imageBase64,
          });
        } else if (selected && selected.length > 0) {
          submissionData.push({
            questionId,
            userAnswer: selected.join(', '),
            descriptiveImageUrl: null,
          });
        }
      }

      console.log('제출 데이터:', submissionData);

      if (submissionData.length === 0) {
        console.warn('제출 데이터 없음');
        alert('답안을 입력해주세요.');
        return;
      }

      await axiosInstance.post(`/v1/question-sets/${questionSetId}/grade`, {
        answers: submissionData,
      });

      alert('학습을 모두 완료했습니다! 채점 결과를 확인합니다.');
      navigate('/result', { state: { questionSetId: questionSetId } });
    } catch (e) {
      console.error('채점 요청 실패:', e);
      alert('답안 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isAllSolved = solved.length === TOTAL_QUESTIONS;

  const imageUrl = currentQuestion?.filename
    ? `${import.meta.env.VITE_S3_BASE_URL}${currentQuestion.filename}`
    : null;
  const textContent = currentQuestion?.text ?? '';
  const questionFormat = currentQuestion?.questionFormat;

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-start bg-primary-bg">
      <QuestionBar
        totalQuestions={TOTAL_QUESTIONS}
        current={current}
        solved={solved}
        onSelect={handleSelect}
        showTimer={false}
      />

      <div className="relative flex h-[calc(100vh-80px)] w-full flex-1 flex-row items-start justify-start gap-5 p-10">
        <div className="absolute bottom-10 left-8 z-50">
          <HintBar
            hints={hints}
            onOpenHintModal={handleHintModal}
            isHintModalOpen={isHintModalOpen}
            isStarred={!!starred[current]}
            onToggleStar={handleToggleStar}
          />
        </div>

        <div className="ml-20 flex h-full flex-1 flex-col items-center justify-start gap-6">
          <div className="w-full flex-[0.4]">
            {currentQuestion ? (
              <QuestionDisplay imageUrl={imageUrl} textContent={textContent} />
            ) : (
              <div className="text-center text-lg text-gray-400">
                문제를 불러오는 중...
              </div>
            )}
          </div>

          <div className="h-full w-full flex-1">
            {questionFormat === '단답형' ? (
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

          {questionFormat === '선택형' && (
            <OptionList
              options={[
                { id: 1, text: '' },
                { id: 2, text: '' },
                { id: 3, text: '' },
                { id: 4, text: '' },
                { id: 5, text: '' },
              ]}
              selectedOptionIds={selectedOptions[current]?.map(Number) ?? []}
              onSelect={(value) => {
                setSelectedOptions((prev) => ({
                  ...prev,
                  [current]: value,
                }));
              }}
              isHintOpen={isHintModalOpen}
            />
          )}

          <div className="mt-auto flex w-full flex-col items-end gap-10">
            {questionFormat === '단답형' && (
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

              <QuestionPageButton
                direction="next"
                label={isLast ? '완료' : '다음'}
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
