import Logotype from '../assets/Logotype.png';
import { Icon } from '@iconify/react';
import { Link, useLocation } from 'react-router-dom';

const NAV = [
  {
    key: 'home',
    label: '홈',
    icon: 'heroicons-outline:home',
    path: '/',
  },
  {
    key: 'review',
    label: '문제 다시보기',
    icon: 'feather:bookmark',
    path: '/review',
  },
  {
    key: 'test',
    label: '수준테스트',
    icon: 'pepicons-pop:pen',
    path: '/test',
    children: [
      { key: 'go', label: '수준테스트 보러가기', path: '/test/go' },
      { key: 'hist', label: '기록 조회하기', path: '/test/hist' },
    ],
  },
  {
    key: 'my',
    label: '마이페이지',
    icon: 'heroicons-outline:user',
    path: '/my',
    children: [
      { key: 'learning', label: '학습 정보 변경', path: '/my/learning' },
      { key: 'info', label: '내 정보 수정', path: '/my/info' },
      { key: 'logout', label: '로그아웃', path: '/my/logout' },
    ],
  },
];

export default function SideBar() {
  const { pathname } = useLocation();

  const isActive = (base: string) =>
    base === '/' ? pathname === '/' : pathname.startsWith(base);

  const isChildActive = (childPath: string) =>
    pathname === childPath || pathname.startsWith(childPath + '/');

  return (
    <aside className="flex w-52 flex-col items-center justify-start gap-16 rounded-[20px] bg-white px-3 py-9 shadow-base">
      <div className="flex w-full flex-col items-stretch justify-start gap-16">
        <div className="flex justify-start px-2">
          <img src={Logotype} alt="App Logo" className="h-6 w-14" />
        </div>

        <nav className="flex w-full flex-col gap-3">
          {NAV.map((item) => {
            const active = isActive(item.path);

            return (
              <div key={item.key} className="w-full">
                <Link
                  to={item.path}
                  aria-current={active ? 'page' : undefined}
                  className={`flex w-full items-center gap-3 rounded-[10px] px-3 py-2 transition-colors
                    ${active ? 'bg-primary text-white' : 'text-secondary hover:bg-secondary-bg'}`}
                >
                  <Icon icon={item.icon} className="h-[18px] w-[18px]" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>

                {active && item.children?.length ? (
                  <div className="mt-4 pl-10">
                    <div className="flex flex-col gap-4">
                      {item.children.map((child) => {
                        const childActive = isChildActive(child.path);
                        return (
                          <Link
                            key={child.key}
                            to={child.path}
                            className={`text-sm font-medium transition-colors
                              ${childActive ? 'text-primary' : 'text-neutral-400'}`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
