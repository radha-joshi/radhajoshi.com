import { useState } from 'react';
import {
  MagnifyingGlass,
  Moon,
  Sun,
  Translate,
  Article,
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
  House,
  User,
  FolderSimple,
  ClockClockwise,
} from '@phosphor-icons/react';

interface SpotlightProps {
  onClose: () => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isDark: boolean;
  toggleDark: () => void;
  toggleLang: () => void;
}

const glassStyle = 'mac-glass';
  

export default function Spotlight({
  onClose,
  currentPage,
  setCurrentPage,
  isDark,
  toggleDark,
  toggleLang,
}: SpotlightProps) {
  const [query, setQuery] = useState('');

  const contacts = [
    {
      id: 'github',
      label: 'GitHub',
      icon: <GithubLogo size={20} weight="light" />,
      href: 'https://github.com/radha-joshi',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: <LinkedinLogo size={20} weight="light" />,
      href: 'https://linkedin.com/in/radha-joshi-4763472a2',
    },
    {
      id: 'blog',
      label: 'Blog',
      icon: <Article size={20} weight="light" />,
      href: 'https://blog.radhajoshi.com',
    },
    {
      id: 'email',
      label: 'Email',
      icon: <EnvelopeSimple size={20} weight="light" />,
      href: 'mailto:you@radhajoshi.com',
    },
  ];

  const items = [
    {
      id: 'home',
      label: 'Home',
      icon: <House size={16} weight="light" />,
      action: () => setCurrentPage('home'),
    },
    {
      id: 'about',
      label: 'About',
      icon: <User size={16} weight="light" />,
      action: () => setCurrentPage('about'),
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: <FolderSimple size={16} weight="light" />,
      action: () => setCurrentPage('projects'),
    },
    {
      id: 'now',
      label: 'Now',
      icon: <ClockClockwise size={16} weight="light" />,
      action: () => setCurrentPage('now'),
    },
    {
      id: 'theme',
      label: isDark ? 'Switch to light mode' : 'Switch to dark mode',
      icon: isDark ? <Sun size={16} weight="light" /> : <Moon size={16} weight="light" />,
      action: toggleDark,
    },
    {
      id: 'lang',
      label: 'Toggle language (EN / मराठी)',
      icon: <Translate size={16} weight="light" />,
      action: toggleLang,
    },
  ];

  const filtered = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (action: () => void) => {
    action();
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl mx-4 flex flex-col gap-2"
      >
        {/* Top Row: Search Pill + Contact Circles */}
        <div className="flex items-center gap-2">
          <div
            className={`flex-1 flex items-center gap-2.5 px-5 py-3.5 rounded-full ${glassStyle}`}
          >
            <MagnifyingGlass
              size={20}
              weight="light"
              className="shrink-0 text-[#52805c] dark:text-[#869d89]"
            />
            <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-[#52805c]/10 dark:bg-[#869d89]/15 text-[#52805c] dark:text-[#869d89] shrink-0">
              /{currentPage}
            </span>
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && filtered.length > 0) {
                  handleSelect(filtered[0].action);
                }
              }}
              placeholder="where to?"
              className="w-full bg-transparent text-base outline-none placeholder:text-[#52805c]/50 dark:placeholder:text-[#869d89]/50"
            />
          </div>

          {/* Floating Contact Circles */}
          <div className="flex items-center gap-2 shrink-0">
            {contacts.map((contact) => (
              <a
                key={contact.id}
                href={contact.href}
                target={contact.id === 'email' ? undefined : '_blank'}
                rel="noreferrer"
                title={contact.label}
                className={`w-[52px] h-[52px] flex items-center justify-center rounded-full text-[#52805c] dark:text-[#869d89] hover:scale-105 active:scale-90 transition-all duration-150 ${glassStyle}`}
              >
                {contact.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Navigation & Actions Card */}
        <div className={`p-2 rounded-2xl ${glassStyle}`}>
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.action)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm cursor-pointer hover:bg-[#52805c]/10 dark:hover:bg-[#869d89]/15 transition-colors duration-150"
              >
                <span className="flex items-center gap-3">
                  <span className="text-[#52805c] dark:text-[#869d89]">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </span>
                {item.id === currentPage && (
                  <span className="text-[11px] font-mono opacity-50">
                    current
                  </span>
                )}
              </button>
            ))
          ) : (
            <p className="px-3.5 py-3 text-xs text-[#52805c]/60 dark:text-[#869d89]/60">
              No matches for "{query}"
            </p>
          )}
        </div>
      </div>
    </div>
  );
}