import { useRef, useEffect, useState } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import type { ReactSketchCanvasRef } from 'react-sketch-canvas';
import { useAnswerStore } from '../../../stores/useAnswerStore.ts';
import IconReturn from '../../../assets/svgs/IconReturn.tsx';
import IconEraser from '../../../assets/svgs/IconEraser.tsx';
import IconDelete from '../../../assets/svgs/IconDelete.tsx';

interface MultipleChoiceBoxProps {
  questionId: number;
}

export default function MultipleChoiceBox({
  questionId,
}: MultipleChoiceBoxProps) {
  const canvasRef = useRef<ReactSketchCanvasRef | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { answers, setAnswer } = useAnswerStore();
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    const saved = answers[questionId];
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

  // 애플펜슬만 허용
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'pen') {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'pen') {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    container.addEventListener('pointerdown', handlePointerDown, {
      capture: true,
    });
    container.addEventListener('pointermove', handlePointerMove, {
      capture: true,
    });

    return () => {
      container.removeEventListener('pointerdown', handlePointerDown, {
        capture: true,
      });
      container.removeEventListener('pointermove', handlePointerMove, {
        capture: true,
      });
    };
  }, []);

  const handleAutoSave = async () => {
    const paths = await canvasRef.current?.exportPaths();
    if (paths) setAnswer(questionId, JSON.stringify(paths));
  };

  const handleClear = () => {
    canvasRef.current?.clearCanvas();
    setAnswer(questionId, '');
  };

  const handleUndo = () => {
    canvasRef.current?.undo();
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
          onClick={() => setIsErasing(!isErasing)}
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
      <div
        ref={containerRef}
        className="relative min-h-0 flex-1 overflow-hidden rounded-md border border-white"
      >
        <div className="absolute inset-0 overflow-y-auto">
          <div className="relative h-[1500px] w-full bg-white">
            <ReactSketchCanvas
              key={questionId}
              ref={canvasRef}
              className="absolute top-0 left-0"
              strokeWidth={isErasing ? 50 : 3}
              strokeColor={isErasing ? '#ffffff' : 'black'}
              width="100%"
              eraserWidth={100}
              height="1500px"
              onStroke={handleAutoSave}
              style={{
                border: 'none',
                outline: 'none',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
