import Badge from '../../components/Badge.tsx';
import IconBookOpenBlank from '../../assets/svgs/IconBookOpenBlank.tsx';
import IconClock from '../../assets/svgs/IconClock.tsx';
import IconBookOpenFill from '../../assets/svgs/IconBookOpenFill.tsx';
import IconSpeechBubble from '../../assets/svgs/IconSpeechBubble.tsx';
import { useUserStore } from '../../stores/userStore.ts';
import SideBar from '../../components/SideBar.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
// [CHANGE] 'subjectUnits' (default)와 'SubjectUnit' (type)을 임포트합니다.
import subjectUnits, { type SubjectUnit } from '../levelTest/SubjectUnits.ts';
import SubjectUnitsModal from '../../components/SubjectUnitsModal.tsx';

// [DELETED] 'SelectedUnit', 'Chapter', 'Grade' 타입은 더 이상 필요 없습니다.

const LevelTestStartPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const hideSidebar = pathname === '/levelTest/levelTestStart';

  const grade = useUserStore((state) => state.grade);
  const term = useUserStore((state) => state.term);
  const lastStudiedUnit = useUserStore((state) => state.lastStudiedUnit);
  // [DELETED] 'unitName'은 더 이상 필요 없습니다.

  const totalQuestionCount = 20;
  const timeLimit = 30;

  // [RE-WRITTEN] currentUnits 함수 로직 전체 수정
  const currentUnits = (): SubjectUnit[] => {
    // 1. 마지막 학습 단원 정보가 없으면 빈 배열 반환 (학년(grade)은 이제 불필요)
    if (!lastStudiedUnit) return [];

    // 2. 'lastStudiedUnit' 이름으로 'subjectUnits' 배열에서
    //    해당 객체를 찾아 'subjectUnitId'를 가져옵니다. (학년 무관)
    const targetUnit = subjectUnits.find(
      (unit) => unit.name === lastStudiedUnit
    );

    // 3. 일치하는 단원을 못 찾으면 빈 배열 반환
    if (!targetUnit) return [];

    const targetId = targetUnit.subjectUnitId;

    // 4. 'subjectUnitId'가 1부터 'targetId'까지인 모든 단원을 필터링합니다. (학년 무관)
    const result = subjectUnits.filter(
      (unit) => unit.subjectUnitId <= targetId
    );

    console.log(result);
    return result;
  };

  // [DELETED] 'gradeKey'는 더 이상 필요 없습니다.
  const displayGrade = grade ? grade.replace('M', '') : '';

  // [CHANGE] state가 SubjectUnit 배열을 저장하도록 변경
  const [selectedUnits, setSelectedUnits] = useState<SubjectUnit[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  // [CHANGE] 모달이 SubjectUnit[]을 반환하므로,
  //          그대로 state에 저장합니다. (SelectedUnit[] 타입 제거)
  const handleSelectSubjectUnits = (selected: SubjectUnit[]) => {
    setSelectedUnits(selected);
  };

  // [CHANGE] displayUnits는 이제 SubjectUnit[] 타입입니다.
  const displayUnits =
    selectedUnits.length > 0 ? selectedUnits : currentUnits();

  return (
    <div
      className={`inline-flex h-full w-full flex-row gap-9 bg-primary-bg px-9 py-5 ${
        hideSidebar ? 'justify-center' : ''
      }`}
    >
      {!hideSidebar && (
        <SideBar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      )}
      <div className="inline-flex flex-col items-center justify-center">
        <div className="inline-flex items-center justify-start">
          <div
            className={`inline-flex flex-col items-center justify-center self-stretch bg-primary-bg ${
              isSidebarOpen ? 'w-200' : 'w-265'
            }`}
          >
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

                <div
                  className={`flex flex-col items-start justify-start gap-2.5 self-stretch overflow-hidden rounded-[10px] bg-gray-50 p-5 outline-[0.20px] outline-offset-[-0.20px] outline-white ${
                    !hideSidebar ? 'cursor-pointer hover:bg-gray-100' : ''
                  }`}
                  onClick={() => {
                    if (!hideSidebar) setModalOpen(true); // 문제풀이 페이지랑 연결 과정에서 추가
                  }}
                >
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
                    {/* [CHANGE] 렌더링 로직 수정 */}
                    <div className="flex items-center justify-start gap-3.5 overflow-x-scroll">
                      {displayUnits.map((unit) => (
                        <Badge
                          key={unit.subjectUnitId} // 고유 ID 사용
                          size="small"
                          variant="levelTest"
                          className="flex-shrink-0"
                        >
                          {unit.name} {/* 'name'에 전체 문자열이 들어있음 */}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  className="inline-flex cursor-pointer items-center justify-center gap-2.5 self-stretch rounded-lg bg-primary px-5 py-3 transition hover:bg-primary/90"
                  onClick={() => {
                    const unitNumbersToSend = displayUnits.map(
                      (unit) => unit.unitNumber
                    );

                    navigate('/question/test', {
                      state: {
                        hideToolbar: hideSidebar,
                        unitNumbers: unitNumbersToSend, // <-- 추가된 부분
                      },
                    });
                    console.log(unitNumbersToSend);
                  }}
                >
                  <div className="justify-start text-base leading-6 font-medium text-white">
                    수준 테스트 시작하기
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <SubjectUnitsModal
          onClose={() => setModalOpen(False)}
          onSelectSubjectUnits={handleSelectSubjectUnits}
        />
      )}
    </div>
  );
};

export default LevelTestStartPage;
