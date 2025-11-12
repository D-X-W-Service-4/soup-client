import IconBookOpen from '../assets/svgs/IconBookOpen.tsx';
import IconXMark from '../assets/svgs/IconXMark.tsx';

interface WorkBookProps {
  title: string;
  onRemove: () => void;
}
const WorkBook = ({ title, onRemove }: WorkBookProps) => {
  return (
    <div className="inline-flex items-center justify-between self-stretch rounded-2xl bg-primary-bg px-6 py-4 outline outline-offset-1 outline-primary">
      <div className="flex items-center justify-start gap-3.5">
        <IconBookOpen />
        <div className="justify-start text-base leading-normal font-medium text-black">
          {title}
        </div>
      </div>
      <IconXMark onClick={onRemove} />
    </div>
  );
};

export default WorkBook;
