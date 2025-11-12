import Button from '../../components/Button.tsx';
import IconMagnifingGlass from '../../assets/svgs/IconMagnifingGlass.tsx';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import WorkBook from '../../components/WorkBook.tsx';
import { useState } from 'react';
import WorkbooksModal from '../../components/WorkbooksModal.tsx';
import { useUserStore } from '../../stores/userStore.ts';
import { signUp } from '../../apis/signAPI.ts';
import subjectUnits from '../levelTest/SubjectUnits.ts';

const WorkBookPage = () => {
  const navigate = useNavigate();

  const { grade, term, lastStudiedUnit, studyHours } = useUserStore();

  const [workbooks, setWorkbooks] = useState<{ id: number; title: string }[]>(
    []
  );
  const [isWorkBookOpen, setIsWorkBookOpen] = useState(false);
  const count = workbooks.length;

  const lastSubjectUnitId =
    subjectUnits.find((unit) => unit.name === lastStudiedUnit)?.subjectUnitId ??
    0;

  const handleRemove = (id: number) => {
    setWorkbooks((prev) => prev.filter((workbook) => workbook.id !== id));
  };

  const handleRemoveAll = () => {
    setWorkbooks([]);
  };

  const handleSignUp = async () => {
    if (!grade || !term || !studyHours) {
      alert('모든 학습 정보를 입력해주세요.');
      return;
    }

    try {
      const payload = {
        grade,
        term: term === '1학기' ? 0 : 1,
        lastSubjectUnitId,
        studyHours: parseFloat(studyHours),
        workbooks: workbooks.map((w) => w.title),
      };

      console.log('회원가입 요청 데이터:', payload);
      const res = await signUp(payload);
      console.log('회원가입 성공:', res);

      alert('온보딩이 완료되었습니다!');
      navigate('/onboarding/success');
    } catch (err: any) {
      console.error('회원가입 실패:', err.response?.data || err.message);
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="inline-flex h-[834px] w-[1194px] flex-col items-center justify-start gap-12 bg-primary-bg px-36 py-4">
      {/* 상단 진행바 */}
      <div className="flex flex-col items-center justify-start gap-16">
        <div className="flex w-full items-center justify-start gap-1">
          <div className="h-1 w-72 rounded-sm bg-primary"></div>
          <div className="h-1 w-72 rounded-sm bg-primary"></div>
          <div className="h-1 w-72 rounded-sm bg-primary"></div>
        </div>

        <div className="flex w-200 flex-col items-center justify-start gap-16">
          <div className="flex flex-col items-center justify-start gap-4">
            <motion.div
              className="inline-flex items-center justify-center gap-4 self-stretch"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="text-4xl leading-10 font-semibold text-black">
                풀고 있던 문제집이 있으신가요 ?
              </div>
            </motion.div>

            <motion.div
              className="text-center text-lg leading-7 font-normal text-secondary"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.7 }}
            >
              학습에 사용중이신 문제집을 알려주세요.
            </motion.div>
          </div>
        </div>
      </div>

      {/* 문제집 목록 */}
      <div className="flex flex-col items-start justify-start gap-5 self-stretch rounded-2xl bg-white px-10 py-12 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col gap-10 self-stretch">
          {/* 검색창 */}
          <div
            className="inline-flex cursor-pointer items-center justify-between rounded-2xl bg-secondary-bg px-5 py-3.5"
            onClick={() => {
              setIsWorkBookOpen(true);
              document.body.style.overflow = 'hidden';
            }}
          >
            <div className="text-xl leading-7 text-secondary">
              원하는 문제집을 검색해 보세요
            </div>
            <IconMagnifingGlass />
          </div>

          {/* 내 문제집 리스트 */}
          <div className="flex flex-col items-start justify-start gap-5 self-stretch">
            <div className="inline-flex items-center justify-between self-stretch px-2.5">
              <div className="flex items-center gap-2.5">
                <div className="text-2xl leading-7 font-semibold text-black">
                  내 문제집
                </div>
                <div className="text-xl leading-7 font-semibold text-primary">
                  {count}
                </div>
              </div>
              <Button
                size={'medium'}
                variant={'white'}
                onClick={handleRemoveAll}
              >
                전체 삭제
              </Button>
            </div>

            <div className="flex h-50 flex-col gap-2.5 self-stretch overflow-scroll p-1">
              {workbooks.map((workbook) => (
                <WorkBook
                  key={workbook.id}
                  title={workbook.title}
                  onRemove={() => handleRemove(workbook.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 저장 버튼 */}
        <div
          className="flex cursor-pointer flex-col items-start justify-start gap-2.5 self-stretch"
          onClick={handleSignUp}
        >
          <div className="inline-flex items-center justify-center gap-2.5 self-stretch rounded-lg bg-primary px-5 py-3 transition-colors hover:bg-rose-500">
            <div className="text-base leading-normal font-medium text-white">
              이대로 저장할래요
            </div>
          </div>
        </div>
      </div>

      {/* 문제집 선택 모달 */}
      {isWorkBookOpen && (
        <WorkbooksModal
          onClose={() => {
            setIsWorkBookOpen(false);
            document.body.style.overflow = 'auto';
          }}
          onSelectWorkbooks={(selected) => {
            setWorkbooks((prev) => {
              const existingIds = prev.map((w) => w.id);
              const newOnes = selected.filter(
                (w) => !existingIds.includes(w.id)
              );
              return [...prev, ...newOnes];
            });
          }}
        />
      )}
    </div>
  );
};

export default WorkBookPage;
