import Button from '../../components/Button.tsx';
import IconMagnifingGlass from '../../assets/svgs/IconMagnifingGlass.tsx';

const StudyGuidePage = () => {
  return (
    <div className="inline-flex h-[834px] w-[1194px] flex-col items-center justify-start gap-12 bg-neutral-50 px-36 py-4">
      <div className="flex flex-col items-center justify-start gap-16">
        <div className="flex w-full items-center justify-start gap-1">
          <div className="h-1 w-72 rounded-sm bg-primary"></div>
          <div className="h-1 w-72 rounded-sm bg-primary"></div>
          <div className="h-1 w-72 rounded-sm bg-primary"></div>
        </div>
        <div className="flex w-[797px] flex-col items-center justify-start gap-16">
          <div className="flex flex-col items-center justify-start gap-4">
            <div className="inline-flex items-center justify-center gap-4 self-stretch">
              <div className="justify-start font-['Pretendard_Variable'] text-4xl leading-10 font-semibold text-black">
                풀고 있던 문제집이 있으신가요 ?
              </div>
            </div>
            <div className="justify-start self-stretch text-center font-['Pretendard_Variable'] text-lg leading-7 font-normal text-neutral-600">
              학습에 사용중이신 문제집을 알려주세요.
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-20 self-stretch rounded-[20px] bg-white px-10 py-12 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col items-start justify-start gap-10 self-stretch">
          <div className="inline-flex items-center justify-between self-stretch rounded-2xl bg-neutral-100 px-5 py-3.5 active:bg-neutral-300">
            <div
              className="justify-start font-['Pretendard_Variable'] text-xl leading-7 font-normal text-neutral-600"
              onClick={() => console.log('누름')}
            >
              원하는 문제집을 검색해 보세요
            </div>
            <IconMagnifingGlass />
          </div>
          <div className="flex flex-col items-start justify-start gap-5 self-stretch">
            <div className="inline-flex items-center justify-between self-stretch px-2.5">
              <div className="flex items-center justify-start gap-2.5">
                <div className="justify-start font-['Pretendard_Variable'] text-2xl leading-7 font-semibold text-black">
                  내 문제집
                </div>
                <div className="justify-start font-['Pretendard_Variable'] text-xl leading-7 font-semibold text-red-400">
                  2
                </div>
              </div>
              <Button size={'medium'} variant={'white'}>
                전체 삭제
              </Button>
            </div>
            <div className="flex flex-col items-start justify-start gap-2.5 self-stretch">
              <div className="inline-flex items-center justify-between self-stretch rounded-2xl bg-neutral-50 px-6 py-4 outline outline-[0.50px] outline-offset-[-0.50px] outline-red-400">
                <div className="flex items-center justify-start gap-3.5">
                  <div className="h-4 w-6 bg-red-400"></div>
                  <div className="justify-start font-['Pretendard_Variable'] text-base leading-normal font-medium text-black">
                    쎈 중등 수학 1 - 1
                  </div>
                </div>
                <div className="h-3.5 w-3.5 bg-neutral-100"></div>
              </div>
              <div className="inline-flex items-center justify-between self-stretch rounded-2xl bg-neutral-50 px-6 py-4 outline outline-[0.50px] outline-offset-[-0.50px] outline-red-400">
                <div className="flex items-center justify-start gap-3.5">
                  <div className="h-4 w-6 bg-red-400"></div>
                  <div className="justify-start font-['Pretendard_Variable'] text-base leading-normal font-medium text-black">
                    쎈 중등 수학 1 - 2
                  </div>
                </div>
                <div className="h-3.5 w-3.5 bg-neutral-100"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start gap-2.5 self-stretch">
          <div className="inline-flex items-center justify-center gap-2.5 self-stretch rounded-lg bg-red-400 px-5 py-3">
            <div className="justify-start font-['Pretendard_Variable'] text-base leading-normal font-medium text-white">
              이대로 저장할래요
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StudyGuidePage;
