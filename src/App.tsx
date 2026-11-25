import { useState } from 'react';
import Corners from './components/Corners';
import Spotlight from './components/Spotlight';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [Lang, setLang] = useState('en');
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen w-full bg-[#f4f7f4] text-[#363636] dark:bg-[#111512] dark:text-[#a8b2aa] bg-bujo transition-colors duration-300">
        <Corners
          isDark={isDark}
          toggleDark={() => setIsDark(!isDark)}
          toggleLang={() => setLang(Lang === 'en' ? 'mr' : 'en')}
          isSpotlightOpen={isSpotlightOpen}
          openSpotlight={() => setIsSpotlightOpen((prev) => !prev)}
        />

        {isSpotlightOpen && 
          (
            <Spotlight
            onClose={() => setIsSpotlightOpen(false)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            isDark={isDark}
            toggleDark={() => setIsDark(!isDark)}
            toggleLang={() => setLang(Lang === 'en' ? 'mr' : 'en')}
            />
          )
        }

        <main className="max-w-2xl mx-auto px-6 py-32">
          <h1 className="text-3xl font-medium ">{Lang === 'en' ? 'hi, welcome to my life' : "नमस्कार, माझ्या आयुष्यात तुमचे स्वागत आहे"}</h1>
        </main>
      </div>
    </div>
  );
}