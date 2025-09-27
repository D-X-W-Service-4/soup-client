import { useModalStore } from '../../hooks/UserModal.hooks.ts';
import { useState } from 'react';

const UserModal = () => {
  const { isUserModalOpen, toggleUserModal } = useModalStore();
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState(false);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNickname(value);
    const regex = /^[A-Za-z가-힣0-9]+$/;
    setError(value && !regex.test(value) ? true : false);
  };

  if (!isUserModalOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={toggleUserModal} // 바깥 클릭하면 모달 닫기
      ></div>
      <div className="relative z-10 inline-flex h-96 w-[794px] flex-col items-start justify-start gap-5 rounded-[20px] bg-white px-10 py-7 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.10)]">
        <div className="flex w-32 flex-col items-start justify-start gap-2.5">
          <div className="justify-start self-stretch font-['Pretendard_Variable'] text-xl leading-7 font-medium text-black">
            내 정보 수정
          </div>
          <div className="justify-start self-stretch font-['Pretendard_Variable'] text-sm leading-tight font-normal text-neutral-600">
            내 정보를 수정합니다.
          </div>
        </div>
        <div className="flex h-60 flex-col items-start justify-start gap-5 self-stretch overflow-y-auto">
          <div className="flex flex-col items-start justify-start gap-2 self-stretch">
            <div className="flex flex-col items-start justify-center gap-5 self-stretch">
              <div className="justify-start font-['Pretendard_Variable'] text-base leading-normal font-medium text-black">
                닉네임 수정
              </div>
            </div>
            <div className="inline-flex items-center justify-between self-stretch rounded-[10px] bg-neutral-100 px-3 py-3.5">
              <textarea
                className="h-[1em] w-full resize-none overflow-hidden font-['Pretendard_Variable'] text-xs leading-none font-normal text-neutral-600 placeholder:text-zinc-500 focus:outline-none"
                placeholder="닉네임을 입력하세요"
                value={nickname}
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) => {
                  e.target.placeholder = '닉네임을 입력하세요';
                }}
                onChange={handleNicknameChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                  }
                }}
              ></textarea>
            </div>
            {error && (
              <div className="justify-start font-['Pretendard_Variable'] text-xs leading-none font-normal text-red-500">
                올바르지 않은 닉네임입니다.
              </div>
            )}
          </div>
          <div className="flex flex-col items-start justify-center gap-2 self-stretch">
            <div className="justify-start font-['Pretendard_Variable'] text-base leading-normal font-medium text-black">
              현재 학년 입력
            </div>
            <div className="inline-flex items-center justify-between self-stretch rounded-[10px] bg-neutral-100 px-3 py-3.5">
              <div className="justify-start font-['Pretendard_Variable'] text-xs leading-none font-normal text-zinc-500">
                현재 학년을 선택해주세요.
              </div>
              <div className="h-1 w-2 outline outline-1 outline-offset-[-0.50px] outline-neutral-600"></div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-2 self-stretch">
            <div className="justify-start font-['Pretendard_Variable'] text-base leading-normal font-medium text-black">
              현재 학기 입력
            </div>
            <div className="inline-flex items-center justify-between self-stretch rounded-[10px] bg-neutral-100 px-3 py-3.5">
              <div className="justify-start font-['Pretendard_Variable'] text-xs leading-none font-normal text-zinc-500">
                현재 학기를 선택해주세요.
              </div>
              <div className="h-1 w-2 outline outline-1 outline-offset-[-0.50px] outline-neutral-600"></div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-2 self-stretch">
            <div className="justify-start font-['Pretendard_Variable'] text-base leading-normal font-medium text-black">
              공부 시간 입력
            </div>
            <div className="inline-flex items-center justify-between self-stretch rounded-[10px] bg-neutral-100 px-3 py-3.5">
              <div className="justify-start font-['Pretendard_Variable'] text-xs leading-none font-normal text-zinc-500">
                하루에 공부 가능한 시간을 선택해 주세요.
              </div>
              <div className="h-1 w-2 outline outline-1 outline-offset-[-0.50px] outline-neutral-600"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start gap-2.5 self-stretch">
          <div className="inline-flex items-center justify-center gap-2.5 self-stretch rounded-lg bg-red-400 px-5 py-3">
            <div className="justify-start font-['Pretendard_Variable'] text-base leading-normal font-medium text-white">
              내 정보 수정
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
