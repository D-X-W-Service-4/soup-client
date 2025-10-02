const LoginSuccessPage = () => {
  return (
    <div className="inline-flex h-[834px] w-[1194px] flex-col items-center justify-between bg-neutral-50 px-96 py-36">
      <div className="flex w-72 flex-col items-center justify-start gap-4">
        <div className="justify-start text-center font-['Pretendard_Variable'] text-5xl leading-[48px] font-semibold text-black">
          환영합니다!
        </div>
        <div className="justify-start text-center">
          <span className="font-['Pretendard_Variable'] text-base leading-7 font-medium text-neutral-600">
            이제부터{' '}
          </span>
          <span className="font-['Pretendard_Variable'] text-base leading-7 font-medium text-red-400">
            SOUP
          </span>
          <span className="font-['Pretendard_Variable'] text-base leading-7 font-medium text-neutral-600">
            와 함께 학습을 시작해요.
          </span>
        </div>
      </div>
      <div className="inline-flex items-center justify-start gap-2.5">
        <div className="flex items-center justify-center gap-2.5">
          <img className="h-80 w-80" src="src/assets/Character.png" />
        </div>
      </div>
      <div className="inline-flex items-center justify-center gap-2.5 self-stretch rounded-lg bg-red-400 px-24 py-3">
        <div className="justify-start font-['Pretendard_Variable'] text-base leading-normal font-medium text-white">
          시작하기
        </div>
      </div>
    </div>
  );
};

export default LoginSuccessPage;
