import CharacterLogo from '../../assets/Character.svg';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const LoginSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="inline-flex h-[834px] w-[1194px] flex-col items-center justify-between bg-primary-bg px-96 py-36">
      <div className="flex w-72 flex-col items-center justify-start gap-4">
        <motion.h1
          className="justify-start text-center text-5xl leading-[48px] font-semibold text-black"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          환영합니다!
        </motion.h1>

        <motion.h1
          className="justify-start text-center"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
        >
          <span className="text-base leading-7 font-medium text-secondary">
            이제부터{' '}
          </span>
          <span className="text-base leading-7 font-medium text-primary">
            SOUP
          </span>
          <span className="text-base leading-7 font-medium text-secondary">
            와 함께 학습을 시작해요.
          </span>
        </motion.h1>
      </div>
      <div className="inline-flex items-center justify-start gap-2.5">
        <div className="flex items-center justify-center gap-2.5">
          <img className="h-80 w-80" src={CharacterLogo} alt="Character Logo" />
        </div>
      </div>
      <div
        className="inline-flex items-center justify-center gap-2.5 self-stretch rounded-lg bg-primary px-24 py-3"
        onClick={() => navigate('../levelTest/LevelTestStart')}
      >
        <div className="justify-start text-base leading-normal font-medium text-white">
          시작하기
        </div>
      </div>
    </div>
  );
};

export default LoginSuccessPage;
