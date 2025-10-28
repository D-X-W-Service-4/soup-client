import Button from '../../components/Button.tsx';
import IconMagnifingGlass from '../../assets/svgs/IconMagnifingGlass.tsx';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import WorkBook from '../../components/WorkBook.tsx';
import { useState } from 'react';
import WorkbooksModal from '../../components/WorkbooksModal.tsx';

const WorkBookPage = () => {
  const navigate = useNavigate();
  const [workbooks, setWorkbooks] = useState([
    { id: 1, title: '쎈 중등 수학 1 - 1' },
    { id: 2, title: '쎈 중등 수학 1 - 2' },
    { id: 3, title: '쎈 중등 수학 1 - 2' },
    { id: 4, title: '쎈 중등 수학 1 - 2' },
    { id: 5, title: '쎈 중등 수학 1 - 2' },
    { id: 6, title: '쎈 중등 수학 1 - 2' },
  ]);
  const count = workbooks.length;
  const [isWorkBookOpen, setIsWorkBookOpen] = useState(false);
  const handleRemove = (id: number) => {
    setWorkbooks((prev) => prev.filter((workbook) => workbook.id !== id));
  };
  const handleRemoveAll = () => {
    setWorkbooks([]);
  };
  return (
    <div className="inline-flex h-[834px] w-[1194px] flex-col items-center justify-start gap-12 bg-primary-bg px-36 py-4">
      <div className="flex flex-col items-center justify-start gap-16">
        <div className="flex w-full items-center justify-start gap-1">
          <div className="h-1 w-72 rounded-sm bg-primary"></div>
          <div className="h-1 w-72 rounded-sm bg-primary"></div>
          <div className="h-1 w-72 rounded-sm bg-primary"></div>
        </div>
        <div className="flex w-[797px] flex-col items-center justify-start gap-16">
          <div className="flex flex-col items-center justify-start gap-4">
            <motion.div
              className="inline-flex items-center justify-center gap-4 self-stretch"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="justify-start text-4xl leading-10 font-semibold text-black">
                풀고 있던 문제집이 있으신가요 ?
              </div>
            </motion.div>
            <motion.div
              className="justify-start self-stretch text-center text-lg leading-7 font-normal text-secondary"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.7 }}
            >
              학습에 사용중이신 문제집을 알려주세요.
            </motion.div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-5 self-stretch rounded-[20px] bg-white px-10 py-12 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col items-start justify-start gap-10 self-stretch">
          <div
            className="inline-flex items-center justify-between self-stretch rounded-2xl bg-secondary-bg px-5 py-3.5 active:bg-neutral-300"
            onClick={() => {
              setIsWorkBookOpen(true);
              document.body.style.overflow = 'hidden';
            }}
          >
            <div className="justify-start text-xl leading-7 font-normal text-secondary">
              원하는 문제집을 검색해 보세요
            </div>
            <IconMagnifingGlass />
          </div>
          <div className="flex flex-col items-start justify-start gap-5 self-stretch">
            <div className="inline-flex items-center justify-between self-stretch px-2.5">
              <div className="flex items-center justify-start gap-2.5">
                <div className="justify-start text-2xl leading-7 font-semibold text-black">
                  내 문제집
                </div>
                <div className="justify-start text-xl leading-7 font-semibold text-primary">
                  {count}
                </div>
              </div>
              <Button
                size={'medium'}
                variant={'white'}
                onClick={() => handleRemoveAll()}
              >
                전체 삭제
              </Button>
            </div>
            <div className="flex h-50 flex-col items-start justify-start gap-2.5 self-stretch overflow-scroll p-1">
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
        <div
          className="flex flex-col items-start justify-start gap-2.5 self-stretch"
          onClick={() => navigate('/onboarding/loginSuccess')}
        >
          <div className="inline-flex items-center justify-center gap-2.5 self-stretch rounded-lg bg-primary px-5 py-3">
            <div className="justify-start text-base leading-normal font-medium text-white">
              이대로 저장할래요
            </div>
          </div>
        </div>
      </div>
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
