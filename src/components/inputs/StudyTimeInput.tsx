interface StudyTimeInputProps {
  value: string;
  onChange: (value: string) => void;
}

const StudyTimeInput = ({ value, onChange }: StudyTimeInputProps) => {
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const onlyNumber = value.replace(/\D/g, ''); // 숫자만 추출
    onChange(onlyNumber);
  };
  return (
    <div className="inline-flex items-center self-stretch rounded-lg bg-secondary-bg px-3 py-3.5">
      <input
        className="h-4 w-full text-xs font-normal text-secondary placeholder:text-zinc-500 focus:outline-none"
        placeholder="하루에 공부 가능한 시간을 입력해주세요!"
        value={value}
        onChange={handleTimeChange}
        onBlur={(e) => {
          const onlyNumber = e.target.value.replace(/\D/g, ''); // 숫자 이외(\D) 제거
          e.target.value = onlyNumber ? `${onlyNumber}시간` : '';
        }}
      />
    </div>
  );
};

export default StudyTimeInput;
