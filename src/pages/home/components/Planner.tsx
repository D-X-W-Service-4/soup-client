export default function Planner() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2.5 rounded-[20px] bg-white shadow-base">
      <img
        src="/assets/logo/Logo.png"
        alt="로고"
        width={157}
        height={157}
        className="h-[157px] w-[157px]"
      />

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 text-center">
          <span className="text-xl font-normal">
            아직 오늘의 플래너를 생성하지 않았어요!
          </span>
          <span className="text-sm font-normal text-secondary">
            지금까지의 피드백을 바탕으로 한 오늘의 플래너를 만들어 보세요.
          </span>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            className="rounded-[20px] bg-primary px-20 py-2.5 text-base text-white"
            onClick={() => {
              // TODO: 플래너 생성 로직 or 라우팅
            }}
          >
            플래너 생성하기
          </button>
        </div>
      </div>
    </div>
  );
}
