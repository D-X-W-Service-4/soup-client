import IconBookOpen from '../assets/svgs/IconBookOpen.tsx';
import IconXMark from '../assets/svgs/IconXMark.tsx';

interface StudyGuideProps {
  title: string;
}
const StudyGuide = ({ title }: StudyGuideProps) => {
  return (
    <div className="inline-flex items-center justify-between self-stretch rounded-2xl bg-primary-bg px-6 py-4 outline outline-offset-1 outline-primary">
      <div className="flex items-center justify-start gap-3.5">
        <IconBookOpen />
        <div className="justify-start text-base leading-normal font-medium text-black">
          {title}
        </div>
      </div>
      <IconXMark />
    </div>
  );
};

export default StudyGuide;
