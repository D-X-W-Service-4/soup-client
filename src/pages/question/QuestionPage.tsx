import { useState, useEffect } from 'react';
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
import { createLevelTest, gradeLevelTest } from '../../apis/levelTestAPI.ts';
import type {
  LevelTestDetailDto,
  LevelTestQuestionDto,
} from '../../types/levelTest.ts';
import { useAuthStore } from '../../stores/UseAuthorStore.ts';

export default function QuestionPage() {
  const [current, setCurrent] = useState(1);
  const [levelTest, setLevelTest] = useState<LevelTestDetailDto | null>(null);
  const [questions, setQuestions] = useState<LevelTestQuestionDto[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [isHintModalOpen, setIsHintModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);

  const location = useLocation();
  const hideToolbar = location.state?.hideToolbar ?? false;
  const subjectUnitIds = location.state?.subjectUnitIds ?? [];

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, Option | null>
  >({});
  const [starred, setStarred] = useState<Record<number, boolean>>({});

  const answerValue = answers[current] ?? '';
  const selectedOption = selectedOptions[current] ?? null;

  const totalQuestions = questions.length;
  const isLast = current === totalQuestions;

  const hints = [
    '이 문제는 유리수 단원의 문제입니다. 화이팅!',
    '두 번째 힌트입니다.',
    '마지막 힌트!',
  ];

  // 레벨 테스트 생성 및 문제 로드
  useEffect(() => {
    const loadLevelTest = async () => {
      try {
        setLoading(true);
        const response = await createLevelTest({
          isInitialTest: hideToolbar, // 온보딩 중이면 초기 테스트
          subjectUnitIds: subjectUnitIds,
        });

        setLevelTest(response.data);
        setQuestions(response.data.levelTestQuestions);
        console.log('레벨 테스트 생성 완료:', response.data);
      } catch (error) {
        console.error('레벨 테스트 로드 실패:', error);
        alert('레벨 테스트를 불러오는데 실패했습니다.');
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    if (subjectUnitIds.length > 0) {
      loadLevelTest();
    } else {
      alert('테스트 범위를 선택해주세요.');
      navigate(-1);
    }
  }, [subjectUnitIds, hideToolbar, navigate]);

  const handleTimeUp = () => {
    alert('시간이 종료되어 자동 제출됩니다.');
    handleSubmit();
  };

  useEffect(() => {
    const newSolved: number[] = [];
    for (let q = 1; q <= totalQuestions; q++) {
      const hasEssay = (answers[q]?.trim().length ?? 0) > 0;
      const hasObjective = !!selectedOptions[q];
      if (hasEssay || hasObjective) newSolved.push(q);
    }
    setSolved(newSolved);
  }, [answers, selectedOptions, totalQuestions]);

  const handleSelect = (qNum: number) => {
    if (qNum >= 1 && qNum <= totalQuestions) setCurrent(qNum);
  };

  const handleOptionSelect = (option: Option | null) => {
    setSelectedOptions((prev) => ({ ...prev, [current]: option }));
  };

  const handleToggleStar = () => {
    setStarred((prev) => ({ ...prev, [current]: !prev[current] }));
  };

  const handleHintModal = () => setIsHintModalOpen((prev) => !prev);

  const handleSubmit = async () => {
    if (!levelTest) {
      alert('테스트 정보를 불러오지 못했습니다.');
      return;
    }

    try {
      const gradeRequest = {
        questions: questions.map((q, index) => {
          const qNum = index + 1;
          const essayAnswer = answers[qNum] || '';
          const selected = selectedOptions[qNum];

          return {
            levelTestQuestionId: q.levelTestQuestionId,
            userAnswer: essayAnswer || selected?.text || '',
            descriptiveImagePath: '', // 이미지 업로드가 필요한 경우 추가
            isTimeout: false,
          };
        }),
      };

      console.log('제출 데이터:', gradeRequest);

      await gradeLevelTest(levelTest.levelTestId, gradeRequest);
      alert('모든 문제를 제출했습니다!');

      if (hideToolbar) {
        // 온보딩 중이면 홈으로
        navigate('/home');
      } else {
        // 일반 테스트면 결과 페이지로
        navigate(`/test/result/${levelTest.levelTestId}`);
      }
    } catch (error) {
      console.error('제출 실패:', error);
      alert('제출에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const isAllSolved = solved.length === totalQuestions;

  const currentQuestion = questions[current - 1] || null;
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-primary-bg">
        <div className="text-center">
          <div className="text-xl font-semibold text-secondary">
            레벨 테스트를 준비하고 있습니다...
          </div>
          <div className="mt-2 text-sm text-gray-400">잠시만 기다려주세요</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-start bg-primary-bg">
      <QuestionBar
        totalQuestions={totalQuestions}
        current={current}
        solved={solved}
        onSelect={handleSelect}
        showTimer={true}
        timeLimit={levelTest?.timeLimit ?? 30}
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
            {currentQuestion ? (
              <QuestionDisplay
                imageUrl={currentQuestion.question.questionImagePath}
                textContent={`문제 ${current}`}
              />
            ) : (
              <div className="text-center text-lg text-gray-400">
                문제를 불러오는 중...
              </div>
            )}
          </div>

          <div className="h-full w-full flex-1">
            <EssayAnswerBox questionId={current} />
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

          <div className="mt-auto flex w-full flex-col items-end gap-10">
            <WarningBox>
              원활한 채점을 위해 답안을 <br /> 정확히 작성해 주세요.
            </WarningBox>
            <AnswerInput
              value={answerValue}
              onAnswerChange={(val) =>
                setAnswers((prev) => ({ ...prev, [current]: val }))
              }
            />

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
