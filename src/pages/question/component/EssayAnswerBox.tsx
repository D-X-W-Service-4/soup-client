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

  const lineHeight = 35;
  const totalRows = 100;

  const handleSave = async () => {
    const key = String(questionId);
    const paths = await canvasRef.current?.exportPaths();
    if (paths?.length) {
      setAnswer(key, JSON.stringify(paths));

      // 캔버스를 이미지로 변환
      const base64 = await canvasRef.current?.exportImage('png');
      if (base64) {
        setImage(key, base64);
        console.log(`${key}번 문제 이미지 저장 완료`);
      }
    }
  };

  useEffect(() => {
    // saveEssayAnswer 전역 등록
    window.saveEssayAnswer = async (id: number) => {
      if (id !== questionId) return;
      await handleSave();
    };

    // 저장된 답안 복원
    const restore = async () => {
      const key = String(questionId);
      const saved = answers[key];
      if (!canvasRef.current) return;

      if (saved && saved.trim() !== '') {
        try {
          const paths = JSON.parse(saved);
          if (Array.isArray(paths) && paths.length > 0) {
            await canvasRef.current.loadPaths(paths);
            console.log(`${questionId} 답안 복원 완료`);
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

    // cleanup
    return () => {
      delete window.saveEssayAnswer;
    };
  }, [questionId, answers]);

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
        <button onClick={handleUndo} title="되돌리기">
          <IconReturn className="text-gray-400" />
        </button>
        <button onClick={toggleEraser} title="지우개 모드">
          <IconEraser
            className={`text-gray-400 ${isErasing ? 'opacity-60' : ''}`}
          />
        </button>
        <button onClick={handleClear} title="전체 지우기">
          <IconDelete className="text-gray-400" />
        </button>
      </div>

      {/* 캔버스 */}
      <div className="relative flex-1 overflow-auto rounded-md border border-gray-100 bg-white">
        <div
          className="absolute inset-0 z-0"
          style={{
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
          height={`${lineHeight * totalRows}px`}
          canvasColor="transparent"
          style={{
            position: 'relative',
            zIndex: 1,
            background: 'transparent',
          }}
        />
      </div>
    </div>
  );
}
