import { Translate, Moon, Sun, Clock, MagnifyingGlass, MagnifyingGlassIcon } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import BookshelfLight from './BookshelfLight';
import BookshelfDark from './BookshelfDark';

interface CornersProps {
  isDark: boolean;
  toggleDark: () => void;
  toggleLang: () => void;
  openSpotlight: () => void;
  isSpotlightOpen: boolean;
}

export default function Corners({ isDark, toggleDark, toggleLang, openSpotlight, isSpotlightOpen }: CornersProps) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
  const timer = setInterval(() => {
    setTime(new Date());
  }, 1000);

  return () => clearInterval(timer);
  }, []);
  return (
    <div className="text-[#4f6d55] dark:text-[#869d89]">
  
      {/* Top Left */}
      <div className="fixed top-1 left-6 w-52 sm:w-[360px]">
        {isDark ? <BookshelfDark /> : <BookshelfLight />}
      </div>

      {/* Top Right */}
      <div className="fixed top-6 right-6 flex items-center gap-1 text-sm opacity-80">
        <button 
          onClick={toggleLang}
          className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-[#4f6d55]/10 dark:hover:bg-[#869d89]/15 hover:shadow-xs active:scale-90 active:translate-y-px active:bg-[#4f6d55]/20 dark:active:bg-[#869d89]/25 active:shadow-none transition-all duration-150 ease-out"
        >
          <Translate size={18}  />
        </button>
        <button
          onClick={toggleDark}
          className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-[#4f6d55]/10 dark:hover:bg-[#869d89]/15 hover:shadow-xs active:scale-90 active:translate-y-px active:bg-[#4f6d55]/20 dark:active:bg-[#869d89]/25 active:shadow-none transition-all duration-150 ease-out"
        >
          {isDark ? <Sun size={20}/> : <Moon size={20}/> }
        </button>
      </div>

      {/* Bottom Left */}
      <div className="fixed bottom-6 left-6 text-xs font-mono opacity-80">
        {time.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        })}{' '}
        IST
      </div>

      {/* Bottom Right */}
        <button
          onClick={openSpotlight}
          title="Menu"
          className={`fixed bottom-6 right-6 z-[60] w-9 h-9 flex items-center justify-center rounded-full cursor-pointer transition-all duration-150 ease-out ${
            isSpotlightOpen
              ? 'scale-90 translate-y-px bg-[#4f6d55]/20 dark:bg-[#869d89]/25 shadow-none'
              : 'hover:bg-[#4f6d55]/10 dark:hover:bg-[#869d89]/15 hover:shadow-xs active:scale-90 active:translate-y-px active:bg-[#4f6d55]/20 dark:active:bg-[#869d89]/25 active:shadow-none'
          }`}
        >
          <MagnifyingGlass size={18} weight="light" />
        </button>
    </div>
  );
}