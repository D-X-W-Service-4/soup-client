import IconInformationCircle from '../../assets/svgs/IconInformationCircle.tsx';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import NicknameInput from '../../components/inputs/NicknameInput.tsx';
import { useUserStore } from '../../stores/userStore.ts';
import { useState } from 'react';

const NicknamePage = () => {
  const navigate = useNavigate();
  const nickname = useUserStore((state) => state.nickname);
  const setNickname = useUserStore((state) => state.setNickname);
  const [error, setError] = useState(false);
  return (
    <div className="mx-auto flex h-auto w-full max-w-298.5 flex-col items-center gap-12 bg-primary-bg px-36 pt-4 pb-44">
      <div className="flex w-full flex-col items-center gap-16">
        <div className="flex w-full items-center justify-start gap-1">
          <div className="h-1 w-72 rounded-sm bg-primary"></div>
          <div className="h-1 w-72 rounded-sm bg-secondary-bg"></div>
          <div className="h-1 w-72 rounded-sm bg-secondary-bg"></div>
        </div>

        <div className="flex w-full max-w-227 flex-col items-center gap-4 text-center">
          <motion.h1
            className="text-3xl font-medium text-black"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            SOUP에 오신 것을 환영해요 !
          </motion.h1>

          <motion.p
            className="text-lg text-secondary"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.7 }}
          >
            당신의 닉네임을 알려주세요.
          </motion.p>
        </div>
      </div>
      <motion.div
        className="flex w-full max-w-198.5 flex-col gap-8 rounded-[20px] bg-white px-10 py-12 shadow-lg"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 1.5 }}
      >
        <div className="flex w-full flex-col gap-10">
          <div className="flex w-full items-center gap-7 rounded-2xl bg-warning-bg px-7 py-5">
            <div className="relative h-7 w-7">
              <IconInformationCircle />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-base font-medium text-warning">
                닉네임은 다른 사용자와 겹치지 않도록 해주세요.
              </p>
              <p className="text-base font-medium text-warning">
                비속어나 부적절한 표현은 사용이 제한됩니다.
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-2">
            <label className="mb-2 text-xl font-medium text-black">
              닉네임 입력
            </label>
            <NicknameInput
              value={nickname}
              onChange={setNickname}
              inputClassName="!h-7 !text-lg"
              containerClassName="px-5 py-4"
              onErrorChange={setError}
            />
          </div>
        </div>

        <button
          className="w-full rounded-lg bg-primary px-5 py-3 text-base font-medium text-white active:bg-rose-500 disabled:bg-rose-300"
          disabled={!nickname || error}
          onClick={() => navigate('/onboarding/study-info')}
        >
          다음
        </button>
      </motion.div>
    </div>
  );
};

export default NicknamePage;
