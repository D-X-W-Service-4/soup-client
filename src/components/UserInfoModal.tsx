import { useModalStore } from '../stores/modalStore.ts';
import { useState } from 'react';
import NicknameInput from './inputs/NicknameInput.tsx';
import StudyTimeInput from './inputs/StudyTimeInput.tsx';
import DropdownSelect from './DropdownSelect.tsx';

const UserInfoModal = () => {
  const { isUserModalOpen, toggleUserModal } = useModalStore();

  const [nickname, setNickname] = useState('');

  const [grade, setGrade] = useState('');
  const [semester, setSemester] = useState('');
  const [studyTime, setStudyTime] = useState('');

  const handleSave = () => {
    setNickname('');
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
          <div className="self-stretch text-sm leading-tight font-normal text-secondary">
            내 정보를 수정합니다.
          </div>
        </div>

        {/* 닉네임 수정 */}
        <div className="flex flex-col items-start justify-start gap-5 self-stretch overflow-y-auto">
          <div className="flex flex-col items-start justify-start gap-2 self-stretch">
            <div className="text-base leading-normal font-medium text-black">
              닉네임 수정
            </div>
            <NicknameInput value={nickname} onChange={setNickname} />
          </div>

          {/* 학년 입력 */}
          <DropdownSelect
            label="현재 학년 입력"
            options={['1학년', '2학년', '3학년']}
            value={grade}
            onChange={setGrade}
            placeholder="학년을 선택해주세요!"
          />

          {/* 학기 입력 */}
          <DropdownSelect
            label="현재 학기 입력"
            options={['1학기', '2학기']}
            value={semester}
            onChange={setSemester}
            placeholder="학기를 선택해주세요!"
          />
          {/* 공부 시간 입력 */}
          <div className="flex flex-col items-start justify-start gap-2 self-stretch">
            <div className="text-base leading-normal font-medium text-black">
              공부시간 입력
            </div>
            <StudyTimeInput value={studyTime} onChange={setStudyTime} />
          </div>
        </div>

        <div
          className="flex flex-col items-start justify-start gap-2.5 self-stretch"
          onClick={handleSave}
        >
          <div className="inline-flex cursor-pointer items-center justify-center gap-2.5 self-stretch rounded-lg bg-primary px-5 py-3">
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
