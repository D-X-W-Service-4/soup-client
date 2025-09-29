import { useModalStore } from '../stores/modalStore.ts';
import { useState } from 'react';
import IconChevronDown from '../assets/svgs/IconChevronDown.tsx';

const UserInfoModal = () => {
  const { isUserModalOpen, toggleUserModal } = useModalStore();

  const [nickname, setNickname] = useState('');
  const [error, setError] = useState(false);

  const [isGradeOpen, setIsGradeOpen] = useState(false);
  const [isSemesterOpen, setIsSemesterOpen] = useState(false);

  const [grade, setGrade] = useState('');
  const [semester, setSemester] = useState('');
  const [studyTime, setStudyTime] = useState('');

  /* 닉네임 변경 함수 - 에러(영어/한글/숫자만) */
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);
    const regex = /^[A-Za-z가-힣0-9]+$/;
    setError(value && !regex.test(value) ? true : false);
  };

  /* 공부 시간 관련 함수 (숫자만 추출하도록) */
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const onlyNumber = value.replace(/\D/g, ''); // 숫자만 추출
    setStudyTime(onlyNumber);
  };

  /* 저장되면 초기화 */
  const handleSave = () => {
    setNickname('');
    setError(false);
    setGrade('');
    setSemester('');
    setStudyTime('');

    toggleUserModal();
  };

  if (!isUserModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={toggleUserModal}
      ></div>

      <div className="relative z-10 inline-flex h-96 w-194.5 flex-col items-start justify-start gap-5 rounded-2xl bg-white px-10 py-7 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.10)]">
        <div className="flex w-32 flex-col items-start justify-start gap-2.5">
          <div className="self-stretch text-xl leading-7 font-medium text-black">
            내 정보 수정
          </div>
          <div className="self-stretch text-sm leading-tight font-normal text-neutral-600">
            내 정보를 수정합니다.
          </div>
        </div>

        {/* 닉네임 수정 */}
        <div className="flex flex-col items-start justify-start gap-5 self-stretch overflow-y-auto">
          <div className="flex flex-col items-start justify-start gap-2 self-stretch">
            <div className="text-base leading-normal font-medium text-black">
              닉네임 수정
            </div>
            <div className="inline-flex items-center self-stretch rounded-lg bg-neutral-100 px-3 py-3.5">
              <input
                className="h-4 w-full text-xs font-normal text-neutral-600 placeholder:text-zinc-500 focus:outline-none"
                placeholder="사용하실 닉네임을 입력해주세요!"
                value={nickname}
                onChange={handleNicknameChange}
              />
            </div>
            {error && (
              <div className="text-xs leading-none font-normal text-red-500">
                올바르지 않은 닉네임입니다.
              </div>
            )}
          </div>

          {/* 학년 입력 */}
          <div className="flex flex-col items-start justify-center gap-2 self-stretch">
            <div className="text-base leading-normal font-medium text-black">
              현재 학년 입력
            </div>
            <div className="w-full">
              {isGradeOpen ? (
                <div className="mt-1 flex w-full flex-col overflow-hidden rounded-lg bg-neutral-100">
                  {['1학년', '2학년', '3학년'].map((item) => (
                    <div
                      key={item}
                      className="cursor-pointer px-3 py-3.5 text-sm hover:bg-neutral-200"
                      onClick={() => {
                        setGrade(item);
                        setIsGradeOpen(false);
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg bg-neutral-100 px-3 py-3.5"
                  onClick={() => setIsGradeOpen(!isGradeOpen)}
                >
                  <div className="text-xs leading-none font-normal text-zinc-500">
                    {grade === '' ? '현재 학년을 선택해주세요!' : grade}
                  </div>
                  <IconChevronDown />
                </div>
              )}
            </div>
          </div>

          {/* 학기 입력 */}
          <div className="flex flex-col items-start justify-center gap-2 self-stretch">
            <div className="text-base leading-normal font-medium text-black">
              현재 학기 입력
            </div>
            <div className="w-full">
              {isSemesterOpen ? (
                <div className="mt-1 flex w-full flex-col overflow-hidden rounded-lg bg-neutral-100">
                  {['1학기', '2학기'].map((item) => (
                    <div
                      key={item}
                      className="cursor-pointer px-3 py-3.5 text-sm hover:bg-neutral-200"
                      onClick={() => {
                        setSemester(item);
                        setIsSemesterOpen(false);
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg bg-neutral-100 px-3 py-3.5"
                  onClick={() => setIsSemesterOpen(!isSemesterOpen)}
                >
                  <div className="text-xs leading-none font-normal text-zinc-500">
                    {semester === '' ? '현재 학기를 선택해주세요!' : semester}
                  </div>
                  <IconChevronDown />
                </div>
              )}
            </div>
          </div>

          {/* 공부 시간 입력 */}
          <div className="flex flex-col items-start justify-start gap-2 self-stretch">
            <div className="text-base leading-normal font-medium text-black">
              공부시간 입력
            </div>
            <div className="inline-flex items-center self-stretch rounded-lg bg-neutral-100 px-3 py-3.5">
              <input
                className="h-4 w-full text-xs font-normal text-neutral-600 placeholder:text-zinc-500 focus:outline-none"
                placeholder="하루에 공부 가능한 시간을 입력해주세요!"
                value={studyTime}
                onChange={handleTimeChange}
                onBlur={(e) => {
                  const onlyNumber = e.target.value.replace(/\D/g, ''); // 숫자 이외(\D) 제거
                  e.target.value = onlyNumber ? `${onlyNumber}시간` : '';
                  console.log(studyTime);
                }}
              />
            </div>
          </div>
        </div>

        <div
          className="flex flex-col items-start justify-start gap-2.5 self-stretch"
          onClick={handleSave}
        >
          <div className="inline-flex cursor-pointer items-center justify-center gap-2.5 self-stretch rounded-lg bg-red-400 px-5 py-3">
            <div className="text-base leading-normal font-medium text-white">
              내 정보 수정
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoModal;
