import { updateUser } from '../apis/userAPI';
import { useModalStore } from '../stores/modalStore';
import { useState } from 'react';
import NicknameInput from './inputs/NicknameInput';
import DropdownSelect from './DropdownSelect';

const UserInfoModal = () => {
  const { isInfoModalOpen, closeInfoModal } = useModalStore();
  const [nickname, setNickname] = useState('');
  const [grade, setGrade] = useState('');
  const [semester, setSemester] = useState('');

  const handleSave = async () => {
    try {
      // 학년/학기 변환
      const gradeMap: Record<string, 'M1' | 'M2' | 'M3'> = {
        '1학년': 'M1',
        '2학년': 'M2',
        '3학년': 'M3',
      };

      const termMap: Record<string, 1 | 2> = {
        '1학기': 1,
        '2학기': 2,
      };

      const payload = {
        nickname,
        grade: gradeMap[grade],
        term: termMap[semester],
      };

      const response = await updateUser(payload);
      alert('내 정보가 수정되었습니다!');
      console.log('✅ 수정 완료:', response);

      closeInfoModal();
    } catch (error) {
      console.error('❌ 유저 정보 수정 실패:', error);
      alert('유저 정보 수정에 실패했습니다.');
    }
  };

  if (!isInfoModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={closeInfoModal}
      ></div>

      <div className="relative z-10 inline-flex h-120 w-194.5 flex-col gap-5 rounded-2xl bg-white px-10 py-7 shadow-md">
        <div className="text-xl font-medium text-black">내 정보 수정</div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-start justify-start gap-2 self-stretch">
            <div className="text-base leading-normal font-medium text-black">
              닉네임 수정
            </div>
            <NicknameInput value={nickname} onChange={setNickname} />
          </div>

          <DropdownSelect
            label="현재 학년 입력"
            options={['1학년', '2학년', '3학년']}
            value={grade}
            onChange={setGrade}
            placeholder="학년을 선택해주세요!"
          />

          <DropdownSelect
            label="현재 학기 입력"
            options={['1학기', '2학기']}
            value={semester}
            onChange={setSemester}
            placeholder="학기를 선택해주세요!"
          />
        </div>

        <button
          onClick={handleSave}
          className="mt-5 rounded-lg bg-primary px-5 py-3 text-white"
        >
          내 정보 수정
        </button>
      </div>
    </div>
  );
};

export default UserInfoModal;
