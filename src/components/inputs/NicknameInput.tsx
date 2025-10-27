import { type ChangeEvent, useEffect, useState } from 'react';

interface NicknameInputProps {
  value: string;
  onChange: (value: string) => void;
  inputClassName?: string;
  containerClassName?: string;
  onErrorChange?: (error: boolean) => void;
}

const NicknameInput = ({
  value,
  onChange,
  inputClassName = '',
  containerClassName = '',
  onErrorChange,
}: NicknameInputProps) => {
  const [error, setError] = useState(false);

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(value);
    const regex = /^[A-Za-z가-힣0-9]+$/;
    const hasError = value && !regex.test(value) ? true : false;
    setError(hasError);
    onErrorChange?.(hasError);

    setError(value && !regex.test(value) ? true : false);
  };
  useEffect(() => {
    if (!value) {
      setError(false);
      onErrorChange?.(false);
    }
  }, [value, onErrorChange]);

  return (
    <>
      <div
        className={`inline-flex items-center self-stretch rounded-lg bg-secondary-bg px-3 py-3.5 ${containerClassName}`}
      >
        <input
          className={`h-4 w-full text-xs font-normal text-secondary placeholder:text-neutral-500 focus:outline-none ${inputClassName}`}
          placeholder="사용하실 닉네임을 입력해주세요!"
          value={value}
          onChange={handleNicknameChange}
        />
      </div>
      {error ? (
        <div className="text-xs leading-none font-normal text-danger">
          올바르지 않은 닉네임입니다.
        </div>
      ) : (
        <div className="text-xs leading-none font-normal">&nbsp;</div> // 빈 공간 유지용
      )}
    </>
  );
};

export default NicknameInput;
