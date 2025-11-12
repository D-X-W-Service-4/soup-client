import Logotype from '/src/assets/logo/Logotype.png';

export default function LogoHeader() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center font-['Pretendard_Variable'] text-xl font-medium">
        <span className="text-black">당신의 </span>
        <span className="text-primary">수</span>
        <span className="text-black">학 </span>
        <span className="text-primary">프</span>
        <span className="text-black">렌즈</span>
      </div>
      <img src={Logotype} alt="logo" className="h-21 w-48 object-contain" />
    </div>
  );
}
