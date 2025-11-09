import LogoHeader from './component/LogoHeader.tsx';
import SocialLoginButton from './component/SocialLoginButton.tsx';
import Iconkakao from '../../assets/svgs/Iconkakao.tsx';
import IconNaver from '../../assets/svgs/IconNaver.tsx';

export default function LoginPage() {
  const handleKakaoLogin = () => {
    window.location.href = 'http://localhost:5173/';
  };

  const handleNaverLogin = () => {
    window.location.href = 'http://localhost:5173/';
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-neutral-50">
      <div className="flex w-[633px] flex-col items-center justify-center gap-14">
        <LogoHeader />

        <div className="flex w-full flex-col gap-4">
          <SocialLoginButton
            bgColor="bg-yellow-400"
            textColor="text-black"
            icon={<Iconkakao />}
            label="카카오로 계속하기"
            onClick={handleKakaoLogin}
          />
          <SocialLoginButton
            bgColor="bg-green-500"
            textColor="text-white"
            icon={<IconNaver />}
            label="네이버로 계속하기"
            onClick={handleNaverLogin}
          />
        </div>
      </div>
    </div>
  );
}
