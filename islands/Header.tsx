// islands/Header.tsx
import { useState, useEffect, useCallback } from "preact/hooks";

// Debounce function
function debounce(func: Function, wait: number) {
  let timeout: number | undefined;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [spacerHeight, setSpacerHeight] = useState(0);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 0);
  }, []);

  const debouncedHandleScroll = useCallback(debounce(handleScroll, 100), [handleScroll]);

  useEffect(() => {
    // Initial check
    handleScroll();
    window.addEventListener('scroll', debouncedHandleScroll);
    return () => window.removeEventListener('scroll', debouncedHandleScroll);
  }, [debouncedHandleScroll]);

  useEffect(() => {
    // Set initial spacer height
    const header = document.querySelector('header');
    if (header) {
      setSpacerHeight(header.offsetHeight);
    }
  }, []);

  return (
    <>
      <div style={{ height: isScrolled ? `${spacerHeight}px` : '224' }} />
<header 
  style={{ right: 0, left: 0 }}
  className={`
    fixed top-0 z-50 w-full px-4
    text-[#E7DECA] bg-[#232323] 
    transition-all duration-300 ease-in-out
    max-w-[62.5rem] mx-auto 
    rounded-b-[0.6rem]
    ${isScrolled 
      ? 'flex flex-row justify-start items-center py-2' 
      : 'flex flex-col items-center'
    }
  `}
>
  <div
        className="relative inline-flex items-center transition-all duration-300 ease-in-out"
        onMouseEnter={() => setIsImageHovered(true)}
        onMouseLeave={() => setIsImageHovered(false)}
        style={{ width: isScrolled ? '48px' : '128px', height: isScrolled ? '48px' : '128px' }}
      >
        <img
          src="/jc.png"
          alt="Joel Cuthriell, a UX Specialist with design, development, and consulting experience"
          className={`transition-all duration-300 ease-in-out absolute top-0 left-0 ${
            isScrolled ? 'h-12 w-12' : 'h-32 w-32'
          } ${isScrolled && isImageHovered ? 'opacity-0' : 'opacity-100'}`}
        />
        <h1 className={`w-full h-full flex items-center justify-center text-4xl font-bold whitespace-nowrap transition-all duration-300 ease-in-out absolute top-0 left-0 ${
          isScrolled && isImageHovered ? 'opacity-100' : 'opacity-0'
        }`}>
            Joel Cuthriell&nbsp;&nbsp;•
          </h1>
      </div>
      <h1 className={`text-4xl font-bold text-center transition-all duration-300 ease-in-out ${isScrolled ? 'mx-4' : ''}`}>Interactive Specialist</h1>
      <p className={`text-center transition-all duration-300 ease-in-out ${isScrolled ? 'm-0 mt-3' : 'my-4'}`}>
        UI / UX / Design / Development / Multimedia
      </p>
    </header>
    </>
  );
}
