interface MultipleChoiceBoxProps {
  value: string;
  onChange: (val: string) => void;
  options: string[];
}

const MultipleChoiceBox = ({ value, onChange }: MultipleChoiceBoxProps) => {
  return (
    <div className="flex h-full w-full flex-col rounded-xl bg-white p-8 shadow-md">
      <textarea
        className="h-full w-full resize-none bg-white p-2 text-base outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default MultipleChoiceBox;
