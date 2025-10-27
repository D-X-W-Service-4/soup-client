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
      className={`flex h-full w-full items-start justify-center
                  overflow-y-auto rounded-xl bg-white
                  p-8 shadow-md ${className || ''}`}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="문제 이미지"
          className="block h-auto w-full object-contain"
        />
      ) : (
        <p className="w-full text-lg leading-relaxed">{textContent}</p>
      )}
    </div>
  );
};

export default QuestionDisplay;
