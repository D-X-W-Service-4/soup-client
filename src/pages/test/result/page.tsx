import Progress from './components/Progress.tsx';

export default function TestResultPage() {
  return (
    <div className="mx-auto max-w-md p-6">
      <Progress label="점수" value="90" sub="/100" progress={0.9} />
    </div>
  );
}
