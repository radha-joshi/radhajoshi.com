import { useState, useRef, useEffect } from 'react';
import {
  Article,
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
  House,
  User,
  FolderSimple,
  ClockClockwise,
} from '@phosphor-icons/react';
import { useSound } from '../context/SoundContext';

interface NavBarProps {
  onClose: () => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  lang: string;
}

export default function NavBar({
  onClose,
  currentPage,
  setCurrentPage,
  lang,
}: NavBarProps) {
  const [isClosingPulse, setIsClosingPulse] = useState(false);
  const timersRef = useRef<number[]>([]);
  const { playSound } = useSound();

  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const triggerClose = () => {
    if (isClosingPulse) return;
    setIsClosingPulse(true);
    playSound('window-close', 0.45);

    const restoreTimer = window.setTimeout(() => {
      setIsClosingPulse(false);
    }, 90);

    const closeTimer = window.setTimeout(() => {
      onClose();
    }, 210);

    timersRef.current.push(restoreTimer, closeTimer);
  };

  const navItems = [
    {
      id: 'home',
      label: lang === 'en' ? 'home' : 'मुख्यपृष्ठ',
      icon: <House size={15} weight="light" />,
      action: () => setCurrentPage('home'),
    },
    {
      id: 'about',
      label: lang === 'en' ? 'about' : 'माझ्याबद्दल',
      icon: <User size={15} weight="light" />,
      action: () => setCurrentPage('about'),
    },
    {
      id: 'projects',
      label: lang === 'en' ? 'projects' : 'प्रकल्प',
      icon: <FolderSimple size={15} weight="light" />,
      action: () => setCurrentPage('projects'),
    },
    {
      id: 'now',
      label: lang === 'en' ? 'now' : 'सध्या',
      icon: <ClockClockwise size={15} weight="light" />,
      action: () => setCurrentPage('now'),
    },
    {
      id: 'blog',
      label: lang === 'en' ? 'blog' : 'ब्लॉग',
      icon: <Article size={15} weight="light" />,
      href: 'https://blog.radhajoshi.com',
    },
  ];

  const contacts = [
    {
      id: 'github',
      label: 'github',
      icon: <GithubLogo size={16} weight="light" />,
      href: 'https://github.com/radha-joshi',
    },
    {
      id: 'linkedin',
      label: 'linkedin',
      icon: <LinkedinLogo size={16} weight="light" />,
      href: 'https://linkedin.com/in/radha-joshi-4763472a2',
    },
    {
      id: 'email',
      label: 'email',
      icon: <EnvelopeSimple size={16} weight="light" />,
      href: 'mailto:you@radhajoshi.com',
    },
  ];

  return (
    <div
      role="dialog"
      aria-label="Navigation menu"
      className="fixed bottom-28 right-6 z-50 w-48 flex flex-col border-[3px] border-[#2B2833] bg-[#FAF4E4] dark:bg-[#24212B] shadow-[6px_6px_0px_#2B2833] select-none"
    >
      {/* Ochre Title Bar */}
      <div className="flex items-center justify-between px-2.5 py-1 bg-[#D49443] border-b-[3px] border-[#2B2833]">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 bg-[#EBC369] border border-[#2B2833]" />
          <span className="font-mono text-[11px] font-bold tracking-wide text-[#2B2833]">
            nav.exe
          </span>
        </div>

        <button
          type="button"
          onClick={triggerClose}
          aria-label="Close navigation"
          className={`inline-block font-mono text-[11px] font-bold text-[#2B2833] hover:text-[#9B3F41] cursor-pointer transition-transform duration-75 ease-out ${
            isClosingPulse ? 'scale-75' : 'scale-100'
          }`}
        >
          [x]
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col p-2 gap-1 font-mono text-sm text-[#2B2833] dark:text-[#F2DFAF]">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;

          if (item.href) {
            return (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={triggerClose}
                className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-[#D49443]/25 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="text-[#9E6B2B] dark:text-[#D49443]">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </span>
                <span className="text-[10px] opacity-60">↗</span>
              </a>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                item.action?.();
                triggerClose();
              }}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded cursor-pointer transition-colors ${
                isActive
                  ? 'bg-[#D49443]/35 font-bold'
                  : 'hover:bg-[#D49443]/20'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-[#9E6B2B] dark:text-[#D49443]">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </span>
              {isActive && (
                <span className="text-[10px] opacity-60">•</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Contact Links Footer */}
      <div className="flex items-center justify-around px-2 py-1.5 border-t-2 border-[#2B2833]/20 dark:border-[#F2DFAF]/15 text-[#2B2833] dark:text-[#F2DFAF]">
        {contacts.map((contact) => (
          <a
            key={contact.id}
            href={contact.href}
            target={contact.id === 'email' ? undefined : '_blank'}
            rel="noreferrer"
            title={contact.label}
            aria-label={contact.label}
            className="p-1.5 rounded hover:bg-[#D49443]/25 transition-colors"
          >
            {contact.icon}
          </a>
        ))}
      </div>
    </div>
  );
}