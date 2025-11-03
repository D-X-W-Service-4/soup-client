import Badge from '../../components/Badge.tsx';
import IconBookOpenBlank from '../../assets/svgs/IconBookOpenBlank.tsx';
import IconClock from '../../assets/svgs/IconClock.tsx';
import IconBookOpenFill from '../../assets/svgs/IconBookOpenFill.tsx';
import IconSpeechBubble from '../../assets/svgs/IconSpeechBubble.tsx';
import { useUserStore } from '../../stores/userStore.ts';
import SideBar from '../../components/SideBar.tsx';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import subjectUnits from './SubjectUnits.ts';

const LevelTestStartPage = () => {
  const { pathname } = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const hideSidebar = pathname === '/levelTest/levelTestStart';

  const grade = useUserStore((state) => state.grade);
  const term = useUserStore((state) => state.term);

  const totalQuestionCount = 30;
  const timeLimit = 30;

  const gradeKey = grade as keyof typeof subjectUnits;
  const displayGrade = grade ? grade.replace('M', '') : '';

  const currentUnits = subjectUnits[gradeKey] || [];

  return (
    <div
      className={`inline-flex h-full w-full flex-row gap-9 bg-primary-bg px-9 py-5 ${hideSidebar ? 'justify-center' : ''}`}
    >
      {!hideSidebar && (
        <SideBar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      )}
      <div className="inline-flex flex-col items-center justify-center">
        <div className="inline-flex items-center justify-start">
          <div className="inline-flex w-265 flex-col items-center justify-center self-stretch bg-primary-bg">
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
                        {displayGrade}학년 {term}
                      </div>
                    </div>
                    <div className="flex items-center justify-start gap-3.5 overflow-x-scroll">
                      {currentUnits.map((subjectData) =>
                        subjectData.units.map((unitName) => (
                          <Badge
                            key={`${subjectData.subject}-${unitName}`}
                            size={'small'}
                            variant={'levelTest'}
                            className={'flex-shrink-0'}
                          >
                            {`${subjectData.subject} - ${unitName}`}
                          </Badge>
                        ))
                      )}
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
    </div>
  );
};

export default LevelTestStartPage;
