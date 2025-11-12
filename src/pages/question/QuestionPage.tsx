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

declare global {
  interface Window {
    saveEssayAnswer?: (id: number) => Promise<void>;
  }
}
const TOTAL_QUESTIONS = 2;

export default function QuestionPage() {
  const [current, setCurrent] = useState(1);
  const [questions, setQuestions] = useState<any[]>([]); // 전체 문제 목록
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
    Record<number, string | null>
  >({});
  const [starred, setStarred] = useState<Record<number, boolean>>({});

  const subjectUnitIds = location.state?.subjectUnitIds ?? [];
  const hideToolbar = location.state?.hideToolbar ?? false;

  const answerValue = answers[current] ?? '';

  const isLast = current === (testInfo?.totalQuestionCount ?? TOTAL_QUESTIONS);

  const hints = [
    '이 문제는 유리수 단원의 문제입니다. 화이팅!',
    '두 번째 힌트입니다.',
    '마지막 힌트!',
  ];

  useEffect(() => {
    const createLevelTest = async () => {
      try {
        const res = await axiosInstance.post('/v1/level-tests', {
          isInitialTest: hideToolbar,
          subjectUnitIds,
        });

        const data = res.data.data;
        console.log('수준테스트 생성 성공:', data);

        setLevelTestId(data.levelTestId);
        setQuestions(data.levelTestQuestions || []);

        const rawTimeLimit = data?.timeLimit ?? 30;
        const totalCount = data?.totalQuestionCount ?? TOTAL_QUESTIONS;

        const convertedTimeLimit =
          rawTimeLimit > 180 ? Math.floor(rawTimeLimit / 60) : rawTimeLimit;

        setTestInfo({
          timeLimit: convertedTimeLimit,
          totalQuestionCount: totalCount,
        });
      } catch (e) {
        console.error('수준테스트 생성 실패:', e);
        setTestInfo({ timeLimit: 30, totalQuestionCount: TOTAL_QUESTIONS });
      }
    };

    createLevelTest();
  }, [hideToolbar, subjectUnitIds]);

  useEffect(() => {
    const newSolved: number[] = [];
    const totalCount = testInfo?.totalQuestionCount ?? TOTAL_QUESTIONS;

    for (let q = 1; q <= totalCount; q++) {
      const hasEssay = (answers[q]?.trim().length ?? 0) > 0;
      const hasObjective = !!selectedOptions[q];
      if (hasEssay || hasObjective) newSolved.push(q);
    }

    setSolved(newSolved);
  }, [answers, selectedOptions, testInfo]);

  const handleSelect = async (qNum: number) => {
    const totalCount = testInfo?.totalQuestionCount ?? TOTAL_QUESTIONS;
    if (qNum < 1 || qNum > totalCount) return;

    console.log(` handleSelect(${qNum}) 호출됨, 현재: ${current}`);

    for (let i = 0; i < 2; i++) {
      if (window.saveEssayAnswer) {
        console.log(` saveEssayAnswer 호출 (재시도 ${i})`);
        await window.saveEssayAnswer(current);
        break;
      } else {
        console.warn(` window.saveEssayAnswer 없음 (재시도 ${i})`);
        await new Promise((res) => setTimeout(res, 100));
      }
    }

    // 다음 문제로 이동
    setCurrent(qNum);
  };

  const handleToggleStar = () => {
    setStarred((prev) => ({ ...prev, [current]: !prev[current] }));
  };

  const handleHintModal = () => setIsHintModalOpen((prev) => !prev);

  const handleTimeUp = () => {
    alert('시간이 종료되어 자동 제출됩니다.');
    handleSubmit();
  };

  const handleSubmit = async () => {
    if (!levelTestId) {
      alert('레벨 테스트 ID가 없습니다. 다시 시도해주세요.');
      return;
    }

    if (!testInfo) return;

    const totalCount = testInfo.totalQuestionCount ?? TOTAL_QUESTIONS;
    const submissionData: any[] = [];

    for (let qNum = 1; qNum <= totalCount; qNum++) {
      const essayAnswer = answers[qNum];
      const selected = selectedOptions[qNum];
      const levelTestQuestion = questions[qNum - 1];
      const questionId = levelTestQuestion?.question?.questionId;

      if (!levelTestQuestion || !questionId) continue;

      if (essayAnswer) {
        // useAnswerStore에서 이미지 base64를 불러와 S3 업로드했다고 가정
        const descriptiveImageUrl = levelTestQuestion?.userImageUrl ?? null;

        submissionData.push({
          questionId,
          userAnswer: essayAnswer,
          descriptiveImageUrl,
        });
      } else if (selected) {
        submissionData.push({
          questionId,
          userAnswer: `${selected}번`, // Swagger 형식 맞춤
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

    try {
      await axiosInstance.post(`/v1/level-tests/${levelTestId}/grade`, {
        answers: submissionData,
      });

      alert(
        '답안이 제출되었습니다!\n채점이 완료되면 결과 조회하기에서 확인할 수 있습니다.'
      );
      navigate('/home');
    } catch (e) {
      console.error('채점 요청 실패:', e);
      alert('답안 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const isAllSolved =
    solved.length === (testInfo?.totalQuestionCount ?? TOTAL_QUESTIONS);

  const currentQuestion = questions[current - 1]?.question;
  const imageUrl = currentQuestion?.filename
    ? `${import.meta.env.VITE_S3_BASE_URL}${currentQuestion.filename}`
    : null;
  const textContent = currentQuestion?.text ?? '';

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-start bg-primary-bg">
      {testInfo && testInfo.timeLimit > 0 && (
        <QuestionBar
          totalQuestions={testInfo.totalQuestionCount ?? TOTAL_QUESTIONS}
          current={current}
          solved={solved}
          onSelect={handleSelect}
          showTimer={true}
          timeLimit={testInfo.timeLimit}
          onTimeUp={handleTimeUp}
        />
      )}

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

        {/* 문제 영역 */}
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
            {currentQuestion?.questionFormat === '단답형' ? (
              <EssayAnswerBox questionId={current} />
            ) : (
              <MultipleChoiceBox questionId={current} />
            )}
          </div>
        </div>

        {/* 오른쪽 영역 */}
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

          {/* 객관식 보기 */}
          {/* 객관식 보기 */}
          {currentQuestion?.questionFormat === '선택형' && (
            <OptionList
              options={[
                { id: 1, text: '' },
                { id: 2, text: '' },
                { id: 3, text: '' },
                { id: 4, text: '' },
              ]}
              selectedOptionId={
                selectedOptions[current]
                  ? Number(selectedOptions[current])
                  : null
              }
              onSelect={(value) => {
                setSelectedOptions((prev) => ({
                  ...prev,
                  [current]: value, // "1" | "2" | null
                }));
              }}
              isHintOpen={isHintModalOpen}
            />
          )}

          {/* 제출 버튼 */}
          <div className="mt-auto flex w-full flex-col items-end gap-10">
            {currentQuestion?.questionFormat === '단답형' && (
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
