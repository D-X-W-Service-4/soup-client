import StudyInfoPage from './pages/onboarding/StudyInfoPage.tsx';
import StudyGuidePage from './pages/onboarding/StudyGuidePage.tsx';
import LoginSuccessPage from './pages/onboarding/LoginSuccessPage.tsx';
import NicknamePage from './pages/onboarding/NicknamePage.tsx';

export default function App() {
  // const [isOpen, setIsOpen] = useState(true);

  return (
    // <div className="flex h-dvh w-full bg-primary-bg p-5">
    //   <div className="flex h-full w-full gap-6">
    //     <SideBar isOpen={isOpen} onToggle={() => setIsOpen((v) => !v)} />
    //
    //     <main className="flex h-full flex-1 flex-col rounded-[20px] bg-white p-9 shadow-base">
    //       <span className="text-xl font-semibold">메인</span>
    //     </main>
    //   </div>
    // </div>
    // <StudyGuidePage />
    // <LoginSuccessPage />
    // <StudyInfoPage />
    <NicknamePage />
  );
}
