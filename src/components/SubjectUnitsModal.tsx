import { useState } from 'react';
import IconMagnifingGlass from '../assets/svgs/IconMagnifingGlass.tsx';
import {
  gradeStoreToDisplay,
  type SubjectUnit,
  subjectUnits,
} from '../pages/levelTest/SubjectUnits.ts';

interface SubjectUnitsModalProps {
  onClose: () => void;
  onSelectSubjectUnits: (selected: SubjectUnit[]) => void;
}

const SubjectUnitsModal = ({
  onClose,
  onSelectSubjectUnits,
}: SubjectUnitsModalProps) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchText, setSearchText] = useState('');

  const filtered = subjectUnits.filter((item) => {
    const displayGrade = gradeStoreToDisplay[item.grade];
    const lowerSearchText = searchText.toLowerCase();

    return (
      displayGrade.includes(searchText) ||
      item.name.toLowerCase().includes(lowerSearchText)
    );
  });

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleAdd = () => {
    const selectedUnits = subjectUnits.filter((u) =>
      selectedIds.includes(u.subjectUnitId)
    );
    onSelectSubjectUnits(selectedUnits);
    onClose();
    console.log(selectedUnits);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative z-20 flex h-[600px] w-[700px] flex-col gap-4 overflow-hidden rounded-2xl bg-white p-6">
        <div className="flex flex-col items-start justify-start gap-2.5 self-stretch">
          <div className="justify-start self-stretch text-sm leading-5 font-normal text-secondary">
            단원 선택
          </div>
          <div className="flex flex-col items-start justify-start gap-0.5 self-stretch">
            <div className="inline-flex items-center justify-start gap-0.75 self-stretch">
              <input
                className="w-181 justify-start text-xl font-medium text-secondary outline-none placeholder:font-normal"
                placeholder="단원명 또는 학년 검색"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
              <div className="relative h-6 w-6 overflow-hidden">
                <IconMagnifingGlass />
              </div>
            </div>
            <div className="h-0 self-stretch outline-1 outline-primary"></div>
          </div>
        </div>
        <div className="flex-1 space-y-2 overflow-y-scroll">
          {filtered.map((item) => (
            <div
              key={item.subjectUnitId}
              onClick={() => toggleSelect(item.subjectUnitId)}
              className={`cursor-pointer border-gray-300 p-2 ${
                selectedIds.includes(item.subjectUnitId)
                  ? 'rounded-2xl bg-gray-100'
                  : 'border-b hover:bg-gray-100'
              }`}
            >
              <div className="text-sm text-gray-600">
                {gradeStoreToDisplay[item.grade]}
              </div>
              <div className="font-medium">{item.name}</div>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col items-start justify-start gap-2.5 self-stretch"
          onClick={handleAdd}
        >
          <div className="inline-flex items-center justify-center gap-2.5 self-stretch rounded-lg bg-primary px-5 py-3">
            <div className="justify-start text-base leading-normal font-medium text-white">
              선택한 단원 추가하기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectUnitsModal;
