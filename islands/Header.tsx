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

  const debouncedHandleScroll = useCallback(debounce(handleScroll, 100), [
    handleScroll,
  ]);

  useEffect(() => {
    // Initial check
    handleScroll();
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => window.removeEventListener("scroll", debouncedHandleScroll);
  }, [debouncedHandleScroll]);

  useEffect(() => {
    // Set initial spacer height
    const header = document.querySelector("header");
    if (header) {
      setSpacerHeight(header.offsetHeight);
    }
  }, []);

  return (
    <>
      <div style={{ height: isScrolled ? `${spacerHeight}px` : "224px" }} 
           className="transition-all duration-500 ease-in-out" />
      <header
        style={{ right: 0, left: 0 }}
        className={`
                fixed top-0 z-50 w-full px-4
                text-[#E7DECA] 
                transition-all duration-500 ease-in-out
                max-w-[62.5rem] mx-auto 
                rounded-b-[0.6rem] shadow-lg
                ${isScrolled ? 'header-blur' : 'bg-gradient-to-r from-[#1a1a1a] via-[#232323] to-[#1a1a1a]'}
                ${isScrolled ? 'py-2' : 'py-6'}
                gradient-animate noise-texture
                ${
                  isScrolled
                    ? "flex flex-row justify-start items-center"
                    : "flex flex-col items-center"
                }
            `}
      >
        <div
          className={`relative inline-flex items-center transition-all duration-500 ease-in-out group
                     ${isScrolled ? 'transform-none' : 'header-content header-expanded'}`}
          onMouseEnter={() => setIsImageHovered(true)}
          onMouseLeave={() => setIsImageHovered(false)}
        >
          <div
            className={`relative transition-all duration-500 ease-in-out transform 
                       ${isScrolled ? 'group-hover:scale-105' : 'scale-100'} 
                       ${isScrolled ? 'h-12' : 'h-32 w-32'}
                       ${isScrolled && !isImageHovered ? 'w-12 absolute' : 'w-0 relative'}
                       image-hover`}
          >
            <img
              src="/jc.png"
              alt="Joel Cuthriell, a UX Specialist with design, development, and consulting experience"
              className={`absolute top-0 left-0 w-full h-full object-cover 
                         transition-all duration-500 ease-in-out rounded-full shadow-md
                         ${isScrolled ? 'hover:shadow-xl' : ''}
                         ${isScrolled && isImageHovered ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}
            />
          </div>
          <h1
            className={`w-full h-full flex items-center justify-center sm:text-4xl font-bold 
                       whitespace-nowrap transition-all duration-500 ease-in-out top-0 left-0 
                       bg-clip-text text-transparent bg-gradient-to-r from-[#E7DECA] via-[#d4c5a7] to-[#c4b69d] 
                       text-glow header-title-slide
                       ${isScrolled ? 'ml-16' : ''}
                       ${
                         isScrolled && isImageHovered
                           ? 'opacity-100 translate-x-0'
                           : 'opacity-0 -translate-x-4 absolute'
                       }`}
          >
            Joel Cuthriell&nbsp;&nbsp;•
          </h1>
        </div>
        <div className={`overflow-hidden transition-all duration-500 ease-in-out
                        ${isScrolled ? 'ml-4' : 'mt-4 text-center'}`}>
          <h1
            className={`sm:text-4xl font-bold text-center transition-all duration-500 ease-in-out 
                       bg-clip-text text-transparent bg-gradient-to-r from-[#E7DECA] via-[#d4c5a7] to-[#c4b69d] 
                       text-glow text-fade
                       ${isScrolled ? 'text-left scale-90 origin-left' : 'scale-100'}`}
          >
            Interactive Specialist
          </h1>
          <p
            className={`text-sm sm:text-base transition-all duration-500 ease-in-out 
                       text-wrap-balance tracking-wide text-fade
                       ${isScrolled ? 'text-left mt-1 opacity-75' : 'text-center my-4 opacity-90'}`}
          >
            UI / UX / Design / Development
          </p>
        </div>
      </header>
    </>
  );
}
