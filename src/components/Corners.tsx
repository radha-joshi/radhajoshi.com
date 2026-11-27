import { useState, useEffect } from 'react';
import BookshelfLight from './BookshelfLight';
import BookshelfDark from './BookshelfDark';
import { useSound } from '../context/SoundContext';
import {
  PixelLangIcon,
  PixelSunIcon,
  PixelMoonIcon,
  PixelVolumeIcon,
  PixelSearchIcon,
} from './PixelCornerIcons';

interface CornersProps {
  isDark: boolean;
  toggleDark: () => void;
  toggleLang: () => void;
  openSpotlight: () => void;
  isSpotlightOpen: boolean;
}

export default function Corners({
  isDark,
  toggleDark,
  toggleLang,
  openSpotlight,
  isSpotlightOpen,
}: CornersProps) {
  const [time, setTime] = useState(new Date());
  const [isNavHovered, setIsNavHovered] = useState(false);
  const { isMuted, toggleMute, playSound } = useSound();

  const handleThemeClick = () => {
    const nextIsDark = !isDark;
    playSound(nextIsDark ? 'night-mode' : 'day-mode', 0.5);
    toggleDark();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleNavClick = () => {
    playSound(isSpotlightOpen ? 'window-close' : 'window-open', 0.45);
    openSpotlight();
  };

  return (
    <div className="text-[#4f6d55] dark:text-[#869d89]">
      {/* Top Left */}
      <div className="fixed top-1 left-6 w-52 sm:w-[360px]">
        {isDark ? <BookshelfDark /> : <BookshelfLight />}
      </div>

      {/* Top Right */}
      <div className="fixed top-6 right-6 flex items-center gap-1 text-sm text-[#1c1c1c] dark:text-[#e6ece7] ">
        <button
          type="button"
          onClick={toggleLang}
          aria-label="Toggle language"
          title="Toggle language"
          className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-[#4f6d55]/10 dark:hover:bg-[#869d89]/15 hover:shadow-xs active:scale-90 active:translate-y-px active:bg-[#4f6d55]/20 dark:active:bg-[#869d89]/25 active:shadow-none transition-all duration-150 ease-out"
        >
          <PixelLangIcon />
        </button>

        <button
          type="button"
          onClick={handleThemeClick}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Switch to day mode' : 'Switch to night mode'}
          className="relative w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-[#4f6d55]/10 dark:hover:bg-[#869d89]/15 hover:shadow-xs active:scale-90 active:translate-y-px active:bg-[#4f6d55]/20 dark:active:bg-[#869d89]/25 active:shadow-none transition-all duration-150 ease-out"
        >
          <span
            className={`absolute transition-all duration-300 ease-out ${
              isDark
                ? 'opacity-100 rotate-0 scale-100'
                : 'opacity-0 -rotate-90 scale-50 pointer-events-none'
            }`}
          >
            <PixelSunIcon />
          </span>
          <span
            className={`absolute transition-all duration-300 ease-out ${
              !isDark
                ? 'opacity-100 rotate-0 scale-100'
                : 'opacity-0 rotate-90 scale-50 pointer-events-none'
            }`}
          >
            <PixelMoonIcon />
          </span>
        </button>

        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
          title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
          className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-[#4f6d55]/10 dark:hover:bg-[#869d89]/15 hover:shadow-xs active:scale-90 active:translate-y-px active:bg-[#4f6d55]/20 dark:active:bg-[#869d89]/25 active:shadow-none transition-all duration-150 ease-out"
        >
          <PixelVolumeIcon muted={isMuted} />
        </button>
      </div>

      {/* Bottom Left */}
      <div className="fixed bottom-6 left-6 text-xs font-mono font-bold">
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
      <div className="fixed bottom-6 right-6 z-[60] flex items-center">
        {/* Hover-only squiggly note + loopy arrow */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute right-13 bottom-1 flex items-end gap-2 transition-opacity duration-200 select-none ${
            isNavHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span
            className="whitespace-nowrap text-[#D49443] text-xl font-bold italic leading-[0.95] -rotate-6 text-right"
            style={{ fontFamily: "'Caveat', 'Bradley Hand', 'Comic Sans MS', cursive" }}
          >
            {isSpotlightOpen ? (
              <>
                click to close
                <br />
                nav bar
              </>
            ) : (
              <>
                click to open
                <br />
                nav bar
              </>
            )}
          </span>

          <svg
            width="48"
            height="36"
            viewBox="0 0 48 36"
            fill="none"
            className="text-[#D49443] mb-0.5 shrink-0"
          >
            <path
              d="M 4 8 C 12 24, 24 25, 25 15 C 26 7, 15 9, 19 20 C 22 28, 33 28, 42 24"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 36 19 L 43 24 L 37 29"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <button
          type="button"
          onClick={handleNavClick}
          onMouseEnter={() => setIsNavHovered(true)}
          onMouseLeave={() => setIsNavHovered(false)}
          title={isSpotlightOpen ? 'Close nav bar' : 'Open nav bar'}
          aria-label={isSpotlightOpen ? 'Close nav bar' : 'Open nav bar'}
          className={`w-9 h-9 flex items-center justify-center rounded-full cursor-pointer transition-all duration-150 ease-out ${
            isSpotlightOpen
              ? 'scale-90 translate-y-px bg-[#4f6d55]/20 dark:bg-[#869d89]/25 shadow-none'
              : 'hover:bg-[#4f6d55]/10 dark:hover:bg-[#869d89]/15 hover:shadow-xs active:scale-90 active:translate-y-px active:bg-[#4f6d55]/20 dark:active:bg-[#869d89]/25 active:shadow-none'
          }`}
        >
          <PixelSearchIcon className="text-[#1c1c1c] dark:text-[#e6ece7]" />
        </button>
      </div>
    </div>
  );
}