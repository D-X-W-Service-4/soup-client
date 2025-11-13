// src/pages/QuestionPage/component/EssayAnswerBox.tsx
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { answers, setAnswer, setImage } = useAnswerStore();
  const [isErasing, setIsErasing] = useState(false);

  const lineHeight = 35;
  const totalRows = 20;
  const canvasHeight = lineHeight * totalRows;

  const handleSave = async () => {
    const key = String(questionId);

    const paths = await canvasRef.current?.exportPaths();

    // 답안이 없으면 저장하지 않음
    if (!paths || paths.length === 0) {
      setAnswer(key, '');
      setImage(key, '');
      return;
    }

    setAnswer(key, JSON.stringify(paths));

    const base64 = await canvasRef.current?.exportImage('png');
    if (base64) {
      setImage(key, base64);
      console.log(`${key}번 이미지 저장됨`);
    }
  };

  useEffect(() => {
    window.saveEssayAnswer = async (id: number) => {
      if (id === questionId) await handleSave();
    };

    const restore = async () => {
      const key = String(questionId);
      const saved = answers[key];
      if (!canvasRef.current) return;

      if (saved && saved.trim() !== '') {
        try {
          const paths = JSON.parse(saved);
          if (Array.isArray(paths) && paths.length > 0) {
            await canvasRef.current.loadPaths(paths);
          } else {
            canvasRef.current.clearCanvas();
          }
        } catch {
          canvasRef.current.clearCanvas();
        }
      } else {
        canvasRef.current.clearCanvas();
      }
    };
    restore();

    return () => {
      delete window.saveEssayAnswer;
    };
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

  const handleClear = async () => {
    const key = String(questionId);
    await canvasRef.current?.clearCanvas();
    setAnswer(key, '');
    setImage(key, '');
  };

  const handleUndo = async () => {
    await canvasRef.current?.undo();
    handleSave();
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
        <button onClick={handleUndo}>
          <IconReturn className="text-gray-400" />
        </button>
        <button onClick={toggleEraser}>
          <IconEraser
            className={`text-gray-400 ${isErasing ? 'opacity-60' : ''}`}
          />
        </button>
        <button onClick={handleClear}>
          <IconDelete className="text-gray-400" />
        </button>
      </div>

      {/* 캔버스 영역 */}
      <div
        ref={containerRef}
        className="relative min-h-0 flex-1 overflow-hidden rounded-md"
      >
        <div className="absolute inset-0 overflow-y-auto">
          {/* 줄 배경 */}
          <div
            className="absolute top-0 left-0 w-full"
            style={{
              height: canvasHeight,
              backgroundImage: `repeating-linear-gradient(
                to bottom,
                white 0px,
                white ${lineHeight - 1}px,
                #e5e7eb ${lineHeight - 1}px,
                #e5e7eb ${lineHeight}px
              )`,
            }}
          />

          <ReactSketchCanvas
            key={`canvas-${questionId}`}
            ref={canvasRef}
            strokeWidth={isErasing ? 40 : 3}
            strokeColor="black"
            eraserWidth={100}
            width="100%"
            height={`${canvasHeight}px`}
            style={{ border: 'none', outline: 'none' }}
            canvasColor="transparent"
            className="absolute top-0 left-0"
            allowOnlyPointerType={'pen'}
          />
        </div>
      </div>
    </div>
  );
}
