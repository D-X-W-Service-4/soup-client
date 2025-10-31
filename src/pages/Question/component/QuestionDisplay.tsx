type QuestionDisplayProps = {
  imageUrl: string | null;
  textContent: string;
  className?: string;
};

const QuestionDisplay = ({
  imageUrl,
  textContent,
  className,
}: QuestionDisplayProps) => {
  return (
    <div
      className={`// ✨ 높이 고정
                      부모가 늘어나지 않게 방지
                  flex
                  h-[20vh] min-h-[200px]
                  w-full shrink-0
                  items-start justify-center overflow-y-auto rounded-xl bg-white p-8 shadow-md
                  ${className || ''}`}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="문제 이미지"
          className="block h-auto w-full object-contain"
        />
      ) : (
        <p className="w-full text-lg leading-relaxed break-keep whitespace-pre-line">
          {textContent}
        </p>
      )}
    </div>
  );
};

export default QuestionDisplay;
