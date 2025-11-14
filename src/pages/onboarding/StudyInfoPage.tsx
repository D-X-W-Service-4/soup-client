import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DropdownSelect from '../../components/DropdownSelect.tsx';
import StudyTimeInput from '../../components/inputs/StudyTimeInput.tsx';
import { useUserStore } from '../../stores/userStore.ts';
import subjectUnits from '../levelTest/SubjectUnits.ts';

const gradeDisplayToStore = {
  '1학년': 'M1',
  '2학년': 'M2',
  '3학년': 'M3',
};

const gradeStoreToDisplay = {
  M1: '1학년',
  M2: '2학년',
  M3: '3학년',
};

const StudyInfoPage = () => {
  const [isStudyInfoOpen, setIsStudyInfoOpen] = useState(false);
  const toggleStudyInfo = () => {
    setIsStudyInfoOpen(!isStudyInfoOpen);
  };
  const nickname = useUserStore((state) => state.nickname);

  const grade = useUserStore((state) => state.grade);
  const setGrade = useUserStore((state) => state.setGrade);

  const term = useUserStore((state) => state.term);
  const setTerm = useUserStore((state) => state.setTerm);

  const lastStudiedUnit = useUserStore((state) => state.lastStudiedUnit);
  const setLastStudiedUnit = useUserStore((state) => state.setLastStudiedUnit);

  const studyTime = useUserStore((state) => state.studyHours);
  const setStudyTime = useUserStore((state) => state.setStudyHours);

  const navigate = useNavigate();

  const handleGradeChange = (displayValue: string) => {
    const storeValue =
      gradeDisplayToStore[displayValue as keyof typeof gradeDisplayToStore];
    setGrade(storeValue);
    setLastStudiedUnit('');
  };

  const displayGrade =
    gradeStoreToDisplay[grade as keyof typeof gradeStoreToDisplay];

  const unitOptions = useMemo(() => {
    if (!grade) {
      return [];
    }

    const filteredUnits = subjectUnits.filter((unit) => unit.grade === grade);

    const options = filteredUnits.map((unit) => unit.name);

    return options;
  }, [grade]);

  return (
    <div className="inline-flex h-full w-full flex-col items-center justify-start gap-14 bg-primary-bg px-48 pt-4 pb-44">
      <div className="flex w-[908px] flex-col items-center justify-start gap-16">
        <div className="flex w-full items-center justify-start gap-1">
          <div className="h-1 w-72 rounded-sm bg-primary"></div>
          <div className="h-1 w-72 rounded-sm bg-primary"></div>
          <div className="h-1 w-72 rounded-sm bg-secondary-bg"></div>
        </div>
        <div className="flex w-199.25 flex-col items-center justify-start gap-16">
          <div className="flex flex-col items-center justify-start gap-4">
            <motion.div
              className="inline-flex items-center justify-center gap-4"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-start">
                <div className="justify-start text-4xl leading-10 font-semibold text-primary">
                  {nickname}
                </div>
                <div className="justify-start text-4xl leading-10 font-semibold text-black">
                  님의 학습 정보에 대해 알고 싶어요!
                </div>
              </div>
            </motion.div>

            <motion.div
              className="justify-start self-stretch text-center text-lg font-normal text-secondary"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.7 }}
            >
              학년, 학기, 단원, 공부시간 등 학습에 관련된 정보를 알려주세요.
            </motion.div>
          </div>
        </div>
      </div>
      <div className="inline-flex items-center justify-start gap-16">
        <div
          className={`inline-flex h-113.25 w-96 flex-col items-center justify-start gap-10 rounded-2xl bg-white p-10 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.10)]
    ${isStudyInfoOpen ? 'opacity-40' : ''}`}
          onClick={() => {
            if (isStudyInfoOpen) {
              setIsStudyInfoOpen(false);
            }
          }}
        >
          <div className="flex flex-1 flex-col items-start justify-between self-stretch">
            <div className="flex flex-col items-start justify-start gap-8 self-stretch">
              <div className="justify-start text-xl leading-7 font-semibold text-black">
                학년, 학기 입력
              </div>
              <div className="flex flex-col items-start justify-start gap-6 self-stretch">
                <div className="flex flex-col items-start justify-start gap-4 self-stretch">
                  <DropdownSelect
                    label={'현재 학년은 몇 학년인가요?'}
                    options={['1학년', '2학년', '3학년']}
                    value={displayGrade}
                    onChange={handleGradeChange}
                    placeholder="학년을 선택해주세요!"
                  />
                </div>
                <div className="flex flex-col items-start justify-start gap-4 self-stretch">
                  <DropdownSelect
                    label={'현재 몇 학기인가요?'}
                    options={['1학기', '2학기']}
                    value={term}
                    onChange={setTerm}
                    placeholder="학기를 선택해주세요!"
                  />
                </div>
              </div>
            </div>
            <button
              className="w-full rounded-lg bg-primary px-5 py-3 text-base font-medium text-white active:bg-rose-500 disabled:bg-rose-300"
              disabled={!term || !grade}
              onClick={() => toggleStudyInfo()}
            >
              다음
            </button>
          </div>
        </div>
        <div
          className={`inline-flex h-113.25 w-96 flex-col items-center justify-start gap-10 rounded-2xl bg-white p-10 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.10)]
    ${!isStudyInfoOpen ? 'pointer-events-none opacity-40' : ''}`}
        >
          <div className="flex flex-1 flex-col items-start justify-between self-stretch">
            <div className="flex flex-col items-start justify-start gap-8 self-stretch">
              <div className="justify-start text-xl leading-7 font-semibold text-black">
                단원, 공부시간 입력
              </div>
              <DropdownSelect
                label={'마지막으로 공부한 단원은 무엇인가요?'}
                options={unitOptions}
                value={lastStudiedUnit}
                onChange={setLastStudiedUnit}
                placeholder="단원을 선택해주세요."
              />
              <div className="flex flex-col items-start justify-start gap-6 self-stretch">
                <div className="flex flex-col items-start justify-start gap-4 self-stretch">
                  <div className="justify-start text-base leading-normal font-medium text-black">
                    하루에 공부 가능한 시간은 얼마나 되나요?
                  </div>

                  <StudyTimeInput value={studyTime} onChange={setStudyTime} />
                </div>
              </div>
            </div>
            <button
              className="w-full rounded-lg bg-primary px-5 py-3 text-base font-medium text-white active:bg-rose-500"
              onClick={() => navigate('/onboarding/workbook')}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyInfoPage;
