import { Icon } from '@iconify/react';
import { Link, useLocation } from 'react-router-dom';
import { useModalStore } from '../stores/modalStore';

type sideBarProps = {
  isOpen: boolean;
  onToggle: () => void;
};

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
    path: '/levelTest/levelTest',
    children: [
      {
        key: 'go',
        label: '수준테스트 보러가기',
        path: '/levelTest/levelTest',
      },
      { key: 'hist', label: '기록 조회하기', path: '/levelTest/levelTest' },
    ],
  },
  {
    key: 'my',
    label: '마이페이지',
    icon: 'heroicons-outline:user',
    path: '/my',
  },
];

export default function SideBar({ isOpen = true, onToggle }: sideBarProps) {
  const { pathname } = useLocation();
  const { toggleUserModal, isUserModalOpen } = useModalStore();

  const isActive = (base: string) =>
    base === '/' ? pathname === '/' : pathname.startsWith(base);

  const isChildActive = (childPath: string) =>
    pathname === childPath || pathname.startsWith(childPath + '/');

  return (
    <aside
      className={`flex flex-col items-center justify-start gap-16 rounded-[20px] bg-white px-3 py-9 shadow-base
    transition-[width] duration-200 ${isOpen ? 'w-52' : 'w-16'}`}
    >
      <div className="flex w-full flex-col gap-16">
        <button
          type="button"
          onClick={onToggle}
          aria-label={`사이드바 ${isOpen ? '펼치기' : '접기'}`}
          className="flex cursor-pointer justify-start px-2"
        >
          {isOpen ? (
            <img
              src="/assets/logo/Logotype.png"
              alt="App Logo"
              className="h-6 w-14"
            />
          ) : (
            <Icon
              icon="ic:round-keyboard-arrow-right"
              className="shrink-0 text-2xl text-neutral-500"
            />
          )}
        </button>
      </div>

      {/* 내비게이션 */}
      <nav className="flex w-full flex-col gap-3">
        {NAV.map((item) => {
          let active = isActive(item.path);
          if (item.key === 'my') {
            active = isUserModalOpen;
          }

          return (
            <div key={item.key} className="group relative w-full">
              {item.key === 'my' ? (
                <button
                  type="button"
                  onClick={toggleUserModal}
                  aria-haspopup="dialog"
                  aria-expanded={isUserModalOpen}
                  className={`flex h-10 w-full items-center rounded-[10px] transition-colors
                    ${active ? 'bg-primary text-white' : 'text-secondary hover:bg-secondary-bg'}
                    ${isOpen ? 'gap-3 px-3 py-2' : 'gap-0 p-[11px]'}`}
                >
                  <Icon
                    icon={item.icon}
                    className={`shrink-0 ${active ? 'text-white' : 'text-primary'}`}
                    width={18}
                    height={18}
                  />
                  <span
                    className={`overflow-hidden text-sm font-medium whitespace-nowrap ${isOpen ? 'w-auto opacity-100' : 'ml-0 w-0 opacity-0'}`}
                  >
                    {item.label}
                  </span>
                </button>
              ) : (
                <Link
                  to={item.path}
                  aria-current={active ? 'page' : undefined}
                  aria-haspopup={item.children ? 'menu' : undefined}
                  className={`flex h-10 w-full items-center rounded-[10px] transition-colors
                    ${active ? 'bg-primary text-white' : 'text-secondary hover:bg-secondary-bg'}
                    ${isOpen ? 'gap-3 px-3 py-2' : 'gap-0 p-[11px]'}`}
                >
                  <Icon
                    icon={item.icon}
                    className={`shrink-0 ${active ? 'text-white' : 'text-primary'}`}
                    width={18}
                    height={18}
                  />
                  <span
                    className={`overflow-hidden text-sm font-medium whitespace-nowrap ${isOpen ? 'w-auto opacity-100' : 'ml-0 w-0 opacity-0'}`}
                  >
                    {item.label}
                  </span>
                </Link>
              )}

              {isOpen && active && item.children?.length ? (
                <div className="mt-4 pl-10">
                  <div className="flex flex-col gap-4">
                    {item.children.map((child) => {
                      const childActive = isChildActive(child.path);
                      return (
                        <Link
                          key={child.key}
                          to={child.path}
                          className={`overflow-hidden text-sm font-medium whitespace-nowrap transition-colors
                              ${childActive ? 'text-primary' : 'text-neutral-400 hover:text-secondary'}`}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              {!isOpen && item.children?.length ? (
                <div
                  className="
                    pointer-events-none absolute top-0 left-full z-30 ml-2 min-w-[12rem]
                    translate-x-1 rounded-xl border border-gray-200 bg-white p-2
                    opacity-0 shadow-base transition-all duration-200
                    group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100
                    focus-within:pointer-events-auto focus-within:translate-x-0 focus-within:opacity-100
                  "
                  role="menu"
                >
                  <div className="px-2 pb-1 text-xs font-semibold text-neutral-500">
                    {item.label}
                  </div>
                  {item.children.map((child) => {
                    const childActive = isChildActive(child.path);
                    return (
                      <Link
                        key={child.key}
                        to={child.path}
                        className={`block rounded-md px-3 py-2 text-sm transition-colors
                          ${childActive ? 'text-primary' : 'text-neutral-400 hover:text-secondary'}`}
                        aria-current={childActive ? 'page' : undefined}
                        role="menuitem"
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
