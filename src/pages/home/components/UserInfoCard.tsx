interface UserInfoCardProps {
  email: string;
  nickname: string;
  grade: string;
  term: number;
  solvedQuestionCount: number;
  starredQuestionCount: number;
  plannerAchievementRate: number;
}

export default function UserInfoCard({
  email,
  nickname,
  grade,
  term,
  solvedQuestionCount,
  starredQuestionCount,
  plannerAchievementRate,
}: UserInfoCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[20px] shadow-base">
      <div className="flex items-center justify-start gap-5 bg-primary-bg px-5 py-3">
        <img
          src="/src/assets/logo/SoupLogo.png"
          alt="수프 로고"
          className="h-14 w-14"
        />
        <div className="flex flex-col items-start justify-start gap-1">
          <span className="text-2xl font-semibold text-secondary">
            {nickname}
          </span>
          <span className="text-sm font-medium text-gray-400">
            {Number(grade.replace('M', ''))}학년 {term}학기
          </span>
          <span className="text-xs font-medium text-gray-400">{email}</span>
        </div>
      </div>
      <div className="flex justify-center bg-white px-7 py-7.5">
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-medium text-success">
              {solvedQuestionCount}
            </span>
            <span className="text-xs font-normal text-secondary">
              해결한 문제
            </span>
          </div>
          <div className="h-12 w-px bg-secondary-bg" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-medium text-warning">
              {starredQuestionCount}
            </span>
            <span className="text-xs font-normal text-secondary">
              표시한 문제
            </span>
          </div>
          <div className="h-12 w-px bg-secondary-bg" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-medium text-primary">
              {plannerAchievementRate * 100}%
            </span>
            <span className="text-xs font-normal text-secondary">
              일일 달성률
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
