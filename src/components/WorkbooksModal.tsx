import IconMagnifingGlass from '../assets/svgs/IconMagnifingGlass.tsx';
import { useState } from 'react';
import WorkBookSearch from './WorkBookSearch.tsx';

interface WorkBooksModalProps {
  onClose: () => void;
  onSelectWorkbooks: (selected: { id: number; title: string }[]) => void;
}

const WorkbooksModal = ({
  onClose,
  onSelectWorkbooks,
}: WorkBooksModalProps) => {
  const [workbooks] = useState([
    { id: 1, title: '쎈 중등 수학 1 - 1' },
    { id: 2, title: '쎈 중등 수학 1 - 2' },
    { id: 3, title: '쎈 중등 수학 1 - 2' },
    { id: 4, title: '쎈 중등 수학 1 - 2' },
    { id: 5, title: '쎈 중등 수학 1 - 2' },
    { id: 6, title: '쎈 중등 수학 1 - 2' },
  ]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  const handleAdd = () => {
    const selectedItems = workbooks.filter((w) => selectedIds.includes(w.id));
    onSelectWorkbooks(selectedItems);
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative z-20 inline-flex h-110 w-198.5 flex-col items-start justify-start gap-5 rounded-2xl bg-white px-10 py-7">
        <div className="flex w-[724px] flex-col items-start justify-start gap-5">
          <div className="flex w-32 flex-col items-start justify-start gap-2.5">
            <div className="justify-start self-stretch font-['Pretendard_Variable'] text-xl leading-7 font-medium text-black">
              문제집 검색
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-2.5 self-stretch">
            <div className="flex flex-col items-start justify-start gap-2.5 self-stretch">
              <div className="justify-start self-stretch font-['Pretendard_Variable'] text-sm leading-5 font-normal text-neutral-600">
                문제집 입력
              </div>
              <div className="flex flex-col items-start justify-start gap-0.5 self-stretch">
                <div className="inline-flex items-center justify-start gap-0.75 self-stretch">
                  <input
                    className="w-181 justify-start text-xl font-medium text-secondary outline-none placeholder:font-normal"
                    placeholder="문제집을 검색하세요"
                  />
                  <div className="relative h-6 w-6 overflow-hidden">
                    <IconMagnifingGlass />
                  </div>
                </div>
                <div className="h-0 self-stretch outline-1 outline-primary"></div>
              </div>
            </div>
            <div className="flex h-50 flex-col items-start justify-start gap-3 self-stretch overflow-scroll">
              {workbooks.map((workbook) => (
                <WorkBookSearch
                  title={workbook.title}
                  key={workbook.id}
                  isSelected={selectedIds.includes(workbook.id)}
                  onToggle={() => toggleSelect(workbook.id)}
                />
              ))}
            </div>
          </div>
        </div>
        <div
          className="flex flex-col items-start justify-start gap-2.5 self-stretch"
          onClick={handleAdd}
        >
          <div className="inline-flex items-center justify-center gap-2.5 self-stretch rounded-lg bg-primary px-5 py-3">
            <div className="justify-start text-base leading-normal font-medium text-white">
              문제집 추가하기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkbooksModal;
