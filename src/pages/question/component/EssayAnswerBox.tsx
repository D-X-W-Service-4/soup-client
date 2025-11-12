import { useRef, useEffect, useState } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import type { ReactSketchCanvasRef } from 'react-sketch-canvas';
import { useAnswerStore } from '../../../stores/useAnswerStore.ts';
import IconReturn from '../../../assets/svgs/IconReturn.tsx';
import IconEraser from '../../../assets/svgs/IconEraser.tsx';
import IconDelete from '../../../assets/svgs/IconDelete.tsx';

interface EssayAnswerBoxProps {
  questionId: number;
}

export default function EssayAnswerBox({ questionId }: EssayAnswerBoxProps) {
  const canvasRef = useRef<ReactSketchCanvasRef | null>(null);
  const { answers, setAnswer, setImage } = useAnswerStore();
  const [isErasing, setIsErasing] = useState(false);

  const lineHeight = 47;
  const totalRows = 100;

  useEffect(() => {
    const key = String(questionId);
    const saved = answers[key];

    if (!canvasRef.current) return;

    if (saved && saved.trim() !== '' && saved !== '[]') {
      try {
        const paths = JSON.parse(saved);
        if (Array.isArray(paths) && paths.length > 0) {
          canvasRef.current?.loadPaths(paths);
        } else {
          canvasRef.current?.clearCanvas();
        }
      } catch (e) {
        console.error('경로 복원 실패:', e);
        canvasRef.current?.clearCanvas();
      }
    } else {
      canvasRef.current?.clearCanvas();
    }
  }, [questionId, answers]);

  const handleAutoSave = async () => {
    const key = String(questionId);
    const paths = await canvasRef.current?.exportPaths();

    if (paths) {
      const json = JSON.stringify(paths);
      if (answers[key] !== json) setAnswer(key, json);
    }

    const base64 = await canvasRef.current?.exportImage('png');
    if (base64) setImage(key, base64);
  };

  const handleClear = async () => {
    const key = String(questionId);
    await canvasRef.current?.clearCanvas();
    setAnswer(key, '');
    setImage(key, '');
  };

  const handleUndo = async () => {
    await canvasRef.current?.undo();
    handleAutoSave();
  };

  const toggleEraser = () => {
    const newState = !isErasing;
    setIsErasing(newState);
    canvasRef.current?.eraseMode(newState);
  };

  return (
    <div className="flex h-full w-full flex-col rounded-xl bg-white p-0 shadow-md">
      {/* 상단 버튼 */}
      <div className="mb-3 flex w-full justify-end gap-3 pt-4 pr-4">
        <button
          onClick={handleUndo}
          className="flex items-center justify-center rounded-md bg-white px-1 transition hover:bg-gray-100"
          title="되돌리기"
        >
          <IconReturn className="text-gray-400" />
        </button>

        <button
          onClick={toggleEraser}
          className={`flex items-center justify-center rounded-md p-1 transition ${
            isErasing ? 'bg-gray-100' : 'bg-white hover:bg-gray-100'
          }`}
          title="지우개 모드"
        >
          <IconEraser className="text-gray-400" />
        </button>

        <button
          onClick={handleClear}
          className="flex items-center justify-center rounded-md bg-white p-1 transition hover:bg-gray-100"
          title="전체 지우기"
        >
          <IconDelete className="text-gray-400" />
        </button>
      </div>

      {/* 필기 영역 */}
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-md border border-white">
        <div className="absolute inset-0 overflow-y-auto">
          <div
            className="relative w-full px-15"
            style={{
              height: `${lineHeight * totalRows}px`,
              backgroundImage: `repeating-linear-gradient(
                to bottom,
                white 0px,
                white ${lineHeight - 1}px,
                #e5e7eb ${lineHeight - 1}px,
                #e5e7eb ${lineHeight}px
              )`,
              backgroundClip: 'content-box',
            }}
          >
            <ReactSketchCanvas
              key={questionId}
              ref={canvasRef}
              className="absolute top-0 left-0"
              strokeWidth={isErasing ? 40 : 3}
              strokeColor="black"
              eraserWidth={100}
              width="100%"
              height={`${lineHeight * totalRows}px`}
              onStroke={handleAutoSave}
              canvasColor="transparent"
              style={{
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
