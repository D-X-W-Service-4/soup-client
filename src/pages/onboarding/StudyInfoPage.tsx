import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudyInfoPage = () => {
  const [isStudyInfoOpen, setIsStudyInfoOpen] = useState(false);
  const toggleStudyInfo = () => {
    setIsStudyInfoOpen(!isStudyInfoOpen);
  };
  const navigate = useNavigate();
  return (
    <div className="inline-flex h-208.5 w-298.5 flex-col items-center justify-start gap-14 bg-primary-bg px-48 pt-4 pb-44">
      <div className="flex w-[908px] flex-col items-center justify-start gap-16">
        <div className="flex w-full items-center justify-start gap-1">
          <div className="h-1 w-72 rounded-sm bg-primary"></div>
          <div className="h-1 w-72 rounded-sm bg-primary"></div>
          <div className="h-1 w-72 rounded-sm bg-secondary-bg"></div>
        </div>
        <div className="flex w-199.25 flex-col items-center justify-start gap-16">
          <div className="flex flex-col items-center justify-start gap-4">
            <div className="inline-flex items-center justify-center gap-4">
              <div className="flex items-center justify-start">
                <div className="justify-start text-4xl leading-10 font-semibold text-primary">
                  OOO
                </div>
                <div className="justify-start text-4xl leading-10 font-semibold text-black">
                  님의 학습 정보에 대해 알고 싶어요!
                </div>
              </div>
            </div>
            <div className="justify-start self-stretch text-center text-lg font-normal text-secondary">
              학년, 학기, 단원, 공부시간 등 학습에 관련된 정보를 알려주세요.
            </div>
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
                  <div className="justify-start text-base leading-normal font-medium text-black">
                    현재 학년은 몇 학년인가요?
                  </div>
                  <div className="inline-flex items-center justify-between self-stretch rounded-lg bg-secondary-bg px-3 py-3.5">
                    <div className="justify-start text-xs leading-none font-normal text-neutral-500">
                      학년을 선택해주세요.
                    </div>
                    <div className="h-1 w-2 outline outline-1 outline-offset-[-0.50px] outline-neutral-600"></div>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start gap-4 self-stretch">
                  <div className="justify-start text-base leading-normal font-medium text-black">
                    현재 몇 학기인가요?
                  </div>
                  <div className="inline-flex items-center justify-between self-stretch rounded-lg bg-neutral-100 px-3 py-3.5">
                    <div className="justify-start text-xs leading-none font-normal text-neutral-500">
                      학기를 선택해주세요.
                    </div>
                    <div className="h-1 w-2 outline outline-1 outline-offset-[-0.50px] outline-neutral-600"></div>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="w-full rounded-lg bg-primary px-5 py-3 text-base font-medium text-white active:bg-rose-500"
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
              <div className="flex flex-col items-start justify-start gap-6 self-stretch">
                <div className="flex flex-col items-start justify-start gap-4 self-stretch">
                  <div className="justify-start text-base leading-normal font-medium text-black">
                    마지막으로 공부한 단원은 무엇인가요?
                  </div>
                  <div className="inline-flex items-center justify-between self-stretch rounded-lg bg-neutral-100 px-3 py-3.5">
                    <div className="justify-start text-xs leading-none font-normal text-neutral-500">
                      단원을 선택해주세요.
                    </div>
                    <div className="h-1 w-2 outline outline-1 outline-offset-[-0.50px] outline-neutral-600"></div>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start gap-4 self-stretch">
                  <div className="justify-start text-base leading-normal font-medium text-black">
                    하루에 공부 가능한 시간은 얼마나 되나요?
                  </div>
                  <div className="inline-flex items-center justify-between self-stretch rounded-lg bg-neutral-100 px-3 py-3.5">
                    <div className="justify-start text-xs leading-none font-normal text-neutral-500">
                      하루에 공부 가능한 시간을 선택해주세요.
                    </div>
                    <div className="h-1 w-2 outline outline-1 outline-offset-[-0.50px] outline-neutral-600"></div>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="w-full rounded-lg bg-primary px-5 py-3 text-base font-medium text-white active:bg-rose-500"
              onClick={() => navigate('/onboard/books')}
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
