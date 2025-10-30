import Badge from '../../components/Badge.tsx';
import IconBookOpenBlank from '../../assets/svgs/IconBookOpenBlank.tsx';
import IconClock from '../../assets/svgs/IconClock.tsx';
import IconBookOpenFill from '../../assets/svgs/IconBookOpenFill.tsx';
import IconSpeechBubble from '../../assets/svgs/IconSpeechBubble.tsx';

const LevelTestStartPage = () => {
  const totalQuestionCount = 30;
  const timeLimit = 30;
  return (
    <div className="inline-flex h-[834px] w-[1194px] flex-col items-center justify-center gap-9 bg-secondary-bg">
      <div className="inline-flex items-center justify-start">
        <div className="inline-flex w-265 flex-col items-center justify-center self-stretch bg-secondary-bg">
          <div className="flex w-188 flex-col items-center justify-center gap-9">
            <div className="flex flex-col items-center justify-start gap-4">
              <div className="inline-flex items-center justify-center gap-4 self-stretch">
                <IconBookOpenFill />
                <div className="justify-start text-4xl leading-10 font-semibold text-black">
                  수준 테스트
                </div>
              </div>
              <div className="justify-start self-stretch text-center text-lg leading-7 font-normal text-secondary">
                나의 수학 실력을 확인해보세요!
              </div>
            </div>
            <div className="flex w-188 flex-col items-center justify-start gap-10 rounded-2xl bg-white p-10 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.05)]">
              <div className="flex flex-col items-start justify-start gap-8 self-stretch">
                <div className="inline-flex items-center justify-start gap-3">
                  <div className="relative h-6 w-6 overflow-hidden">
                    <IconSpeechBubble />
                  </div>
                  <div className="justify-start text-xl leading-7 font-semibold text-black">
                    테스트 안내
                  </div>
                </div>
                <div className="inline-flex items-center justify-start gap-6 self-stretch">
                  <div className="inline-flex h-36 flex-1 flex-col items-center justify-center gap-5 rounded-lg outline-[0.20px] outline-offset-[-0.20px] outline-primary">
                    <IconBookOpenBlank />
                    <div className="flex flex-col items-center justify-center gap-1.5">
                      <div className="justify-start text-base leading-6 font-normal text-black">
                        문제 수
                      </div>
                      <div className="justify-start text-center text-xl leading-7 font-semibold text-secondary">
                        {totalQuestionCount}문제
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex h-36 flex-1 flex-col items-center justify-center gap-5 rounded-lg outline-[0.20px] outline-offset-[-0.20px] outline-primary">
                    <IconClock />
                    <div className="flex flex-col items-center justify-center gap-1.5">
                      <div className="justify-start text-base leading-6 font-normal text-black">
                        제한 시간
                      </div>
                      <div className="justify-start text-center text-xl leading-7 font-semibold text-secondary">
                        {timeLimit}분
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start gap-2.5 self-stretch overflow-hidden rounded-[10px] bg-gray-50 p-5 outline-[0.20px] outline-offset-[-0.20px] outline-white">
                <div className="flex flex-col items-start justify-start gap-2.5">
                  <div className="inline-flex items-center justify-start gap-2.5 self-stretch">
                    <div className="flex items-center justify-start gap-2.5">
                      <div className="justify-start text-base leading-6 font-medium text-black">
                        테스트 범위
                      </div>
                    </div>
                    <div className="justify-center text-sm leading-5 font-normal text-secondary">
                      2학년 1학기
                    </div>
                  </div>
                  <div className="flex items-center justify-start gap-3.5 overflow-x-scroll">
                    <Badge
                      size={'small'}
                      variant={'levelTest'}
                      className="flex-shrink-0"
                    >
                      유리수의 근삿값
                    </Badge>
                    <Badge
                      size={'small'}
                      variant={'levelTest'}
                      className="flex-shrink-0"
                    >
                      식의 계산
                    </Badge>
                    <Badge
                      size={'small'}
                      variant={'levelTest'}
                      className="flex-shrink-0"
                    >
                      유리수의 근삿값
                    </Badge>
                    <Badge
                      size={'small'}
                      variant={'levelTest'}
                      className="flex-shrink-0"
                    >
                      식의 계산
                    </Badge>
                    <Badge
                      size={'small'}
                      variant={'levelTest'}
                      className="flex-shrink-0"
                    >
                      식의 계산
                    </Badge>
                    <Badge
                      size={'small'}
                      variant={'levelTest'}
                      className="flex-shrink-0"
                    >
                      유리수의 근삿값
                    </Badge>
                    <Badge
                      size={'small'}
                      variant={'levelTest'}
                      className="flex-shrink-0"
                    >
                      유리수의 근삿값
                    </Badge>
                    <Badge
                      size={'small'}
                      variant={'levelTest'}
                      className="flex-shrink-0"
                    >
                      유리수의 근삿값
                    </Badge>
                    <Badge
                      size={'small'}
                      variant={'levelTest'}
                      className="flex-shrink-0"
                    >
                      유리수의 근삿값
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center justify-center gap-2.5 self-stretch rounded-lg bg-primary px-5 py-3">
                <div className="justify-start text-base leading-6 font-medium text-white">
                  수준 테스트 시작하기
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelTestStartPage;
