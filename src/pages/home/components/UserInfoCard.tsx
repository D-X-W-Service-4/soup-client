import SoupLogo from '../../../assets/logo/SoupLogo.svg';

interface UserInfoCardProps {
  email?: string | null;
  nickname?: string | null;
  grade?: string | null;
  term?: number | null;
  solvedQuestionCount?: number;
  starredQuestionCount?: number;
  plannerAchievementRate?: number;
}

export default function UserInfoCard({
  email,
  nickname,
  grade,
  term,
  solvedQuestionCount = 0,
  starredQuestionCount = 0,
  plannerAchievementRate = 0,
}: UserInfoCardProps) {
  // grade가 null일 수 있으니 안전하게 처리
  const gradeNumber = grade?.startsWith('M')
    ? Number(grade.replace('M', ''))
    : 0;

  return (
    <div className="flex flex-col overflow-hidden rounded-[20px]">
      {/* 상단 유저 정보 영역 */}
      <div className="flex items-center justify-start gap-5 bg-primary-bg px-5 py-3">
        <img src={SoupLogo} alt="수프 로고" className="h-14 w-14" />
        <div className="flex flex-col items-start justify-start gap-1">
          <span className="text-2xl font-semibold text-secondary">
            {nickname || '이름 없음'}
          </span>
          <span className="text-sm font-medium text-gray-400">
            {gradeNumber}학년 {term ?? 1}학기
          </span>
          <span className="text-xs font-medium text-gray-400">
            {email || '이메일 없음'}
          </span>
        </div>
      </div>

      {/* 하단 통계 영역 */}
      <div className="flex justify-center bg-white px-7 py-7.5">
        <div className="flex items-center gap-4">
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
              {Math.round(plannerAchievementRate * 100)}%
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
