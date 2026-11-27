import { useState, useRef, useEffect, ReactNode } from 'react';
import { useSound } from '../context/SoundContext';

interface OchreWindowProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
}

export default function OchreWindow({
  isOpen,
  onClose,
  title = 'notes.txt',
  children,
}: OchreWindowProps) {
  const [size, setSize] = useState({ width: 380, height: 260 });
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [isClosingPulse, setIsClosingPulse] = useState(false);
  const { playSound } = useSound();

  const timersRef = useRef<number[]>([]);
  const actionRef = useRef<{
    type: 'drag' | 'resize';
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    origW: number;
    origH: number;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsClosingPulse(false);
      if (pos === null) {
        setPos({
          x: Math.max(16, Math.round((window.innerWidth - size.width) / 2)),
          y: Math.max(16, Math.round((window.innerHeight - size.height) / 2)),
        });
      }
    }
  }, [isOpen, pos, size.width, size.height]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isClosingPulse) return;

    setIsClosingPulse(true);
    playSound('window-close', 0.45);

    // 1) Shrink down for ~90ms, 2) bounce back to original size, 3) close after a fraction of a second
    const restoreTimer = window.setTimeout(() => {
      setIsClosingPulse(false);
    }, 90);

    const closeTimer = window.setTimeout(() => {
      onClose();
    }, 210);

    timersRef.current.push(restoreTimer, closeTimer);
  };

  const handlePointerDownDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pos) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    actionRef.current = {
      type: 'drag',
      startX: e.clientX,
      startY: e.clientY,
      origX: pos.x,
      origY: pos.y,
      origW: size.width,
      origH: size.height,
    };
  };

  const handlePointerDownResize = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!pos) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    actionRef.current = {
      type: 'resize',
      startX: e.clientX,
      startY: e.clientY,
      origX: pos.x,
      origY: pos.y,
      origW: size.width,
      origH: size.height,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const act = actionRef.current;
    if (!act) return;

    const dx = e.clientX - act.startX;
    const dy = e.clientY - act.startY;

    if (act.type === 'drag') {
      setPos({
        x: Math.max(0, Math.min(window.innerWidth - act.origW, act.origX + dx)),
        y: Math.max(0, Math.min(window.innerHeight - 40, act.origY + dy)),
      });
    } else {
      setSize({
        width: Math.max(240, Math.min(window.innerWidth - act.origX - 16, act.origW + dx)),
        height: Math.max(160, Math.min(window.innerHeight - act.origY - 16, act.origH + dy)),
      });
    }
  };

  const handlePointerUp = () => {
    actionRef.current = null;
  };

  if (!isOpen || !pos) return null;

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        left: pos.x,
        top: pos.y,
        width: size.width,
        height: size.height,
      }}
      className="fixed z-50 flex flex-col border-[3px] border-[#2B2833] bg-[#FAF4E4] dark:bg-[#24212B] shadow-[6px_6px_0px_#2B2833] select-none"
    >
      {/* Draggable Ochre Title Bar */}
      <div
        onPointerDown={handlePointerDownDrag}
        className="flex items-center justify-between px-3 py-1.5 bg-[#D49443] border-b-[3px] border-[#2B2833] cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 bg-[#EBC369] border border-[#2B2833]" />
          <span className="font-mono text-xs font-bold tracking-wide text-[#2B2833]">
            {title}
          </span>
        </div>

        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={handleCloseClick}
          aria-label="Close window"
          className={`inline-block font-mono text-xs font-bold text-[#2B2833] hover:text-[#9B3F41] cursor-pointer transition-transform duration-75 ease-out ${
            isClosingPulse ? 'scale-75' : 'scale-100'
          }`}
        >
          [x]
        </button>
      </div>

      {/* Window Content */}
      <div className="flex-1 p-4 overflow-auto text-sm text-[#2B2833] dark:text-[#F2DFAF]">
        {children ?? (
          <p className="font-mono text-xs leading-relaxed">
            hello from the ochre book! put whatever you want in here.
          </p>
        )}
      </div>

      {/* Bottom-Right Pixel Resize Grip */}
      <div
        onPointerDown={handlePointerDownResize}
        title="Drag to resize"
        className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize flex items-end justify-end p-0.5"
      >
        <span className="block w-2.5 h-2.5 border-r-2 border-b-2 border-[#AC6E35]" />
      </div>
    </div>
  );
}