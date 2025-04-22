// islands/Header.tsx
import { useState, useEffect, useCallback } from "preact/hooks";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(80);
  const [initialHeaderHeight, setInitialHeaderHeight] = useState(0);

  // Measure header height for the spacer
  const updateHeaderHeight = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const headerEl = document.getElementById('site-header');
    if (headerEl) {
      const height = headerEl.offsetHeight;
      setHeaderHeight(height);
      
      // Set initial height only once
      if (initialHeaderHeight === 0) {
        setInitialHeaderHeight(height);
      }
    }
  }, [initialHeaderHeight]);

  // Handle scroll events - set isScrolled to true when scrolled past the header height
  const handleScroll = useCallback(() => {
    if (typeof window !== 'undefined') {
      setIsScrolled(window.scrollY > 20); // Reduced threshold for earlier collapse
    }
  }, [initialHeaderHeight]);

  // Debounce for better performance
  const debouncedHandleScroll = useCallback(() => {
    let timeout: number | undefined;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        handleScroll();
        if (!isScrolled) {
          updateHeaderHeight();
        }
      }, 50);
    };
  }, [handleScroll, updateHeaderHeight, isScrolled]);

  useEffect(() => {
    // Check scroll position immediately on mount
    if (typeof window !== 'undefined') {
      // Need a small delay to get accurate header measurements
      setTimeout(() => {
        updateHeaderHeight();
        handleScroll();
      }, 100);
    }
    
    // Add scroll event listener
    const scrollHandler = debouncedHandleScroll();
    window.addEventListener("scroll", scrollHandler);
    window.addEventListener("resize", updateHeaderHeight);
    
    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, [debouncedHandleScroll, handleScroll, updateHeaderHeight]);

  return (
    <>
      <header
        id="site-header"
        style={{ 
          position: 'fixed',
          top: 0, 
          left: 0, 
          right: 0,
          zIndex: 9999 
        }}
        className={`
          w-full
          text-[#E7DECA]
          transition-all duration-300 ease-in-out
          shadow-lg
          ${isScrolled ? 'header-blur py-1' : 'bg-gradient-to-r from-[#1a1a1a] via-[#232323] to-[#1a1a1a] py-4 sm:py-6'}
          gradient-animate noise-texture
        `}
      >
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className={`flex items-center justify-between`}>
            {/* Left: Name and Title */}
            <div className="flex-1">
              <a href="/" className="inline-block hover:opacity-80 transition-opacity">
                <div>
                  <h1 className={`font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#E7DECA] via-[#d4c5a7] to-[#c4b69d] text-glow
                                transition-all duration-300 ease-in-out
                                ${isScrolled ? 'text-lg sm:text-xl' : 'text-2xl sm:text-3xl'}`}
                  >
                    Joel Cuthriell
                  </h1>
                  <p className={`transition-all duration-300 ease-in-out
                              ${isScrolled ? 'text-xs opacity-75 mt-0' : 'text-sm sm:text-base mt-1 opacity-90'}`}
                  >
                    Interactive Specialist
                  </p>
                </div>
              </a>
            </div>
            
            {/* Center: Logo */}
            <div className="flex justify-center items-center" 
                onMouseEnter={() => setIsImageHovered(true)}
                onMouseLeave={() => setIsImageHovered(false)}>
              <a href="/" className="block hover:opacity-90 transition-opacity">
                <div className={`relative transition-all duration-300 ease-in-out
                              ${isScrolled ? 'h-8 w-8 sm:h-10 sm:w-10' : 'h-16 w-16 sm:h-24 sm:w-24'}`}
                >
                  <img
                    src="/jc.png"
                    alt="Joel Cuthriell, a UX Specialist"
                    className="w-full h-full object-cover rounded-full shadow-md hover:shadow-xl transition-all"
                  />
                </div>
              </a>
            </div>
            
            {/* Right: Skills */}
            <div className="flex-1 text-right">
              <p className={`transition-all duration-300 ease-in-out
                          ${isScrolled ? 'text-xs opacity-50' : 'text-sm opacity-90'}`}
              >
                UI / UX / Design / Development
              </p>
            </div>
          </div>
        </div>
      </header>
      
      {/* Spacer to prevent content from being hidden behind fixed header */}
      <div 
        aria-hidden="true" 
        className="w-full"
        style={{ height: `${headerHeight}px` }}
      />
    </>
  );
}
