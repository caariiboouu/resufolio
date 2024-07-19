// islands/Header.tsx
import { useState, useEffect } from "preact/hooks";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isImageDisappeared, setIsImageDisappeared] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!isScrolled && window.scrollY > 0) {
        setIsScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  useEffect(() => {
    if (isScrolled && isImageHovered) {
      const timer = setTimeout(() => {
        setIsImageDisappeared(true);
      }, 300); // Match this with the image transition duration
      return () => clearTimeout(timer);
    } else {
      setIsImageDisappeared(false);
    }
  }, [isScrolled, isImageHovered]);

  return (
    <header className={`flex transition-all duration-300 ease-in-out ${isScrolled ? 'flex-row justify-between items-center py-2' : 'flex-col items-center'}`}>
      <div 
        className="relative inline-flex items-center transition-all duration-300 ease-in-out"
        onMouseEnter={() => setIsImageHovered(true)}
        onMouseLeave={() => setIsImageHovered(false)}
        style={{ minWidth: isScrolled ? '48px' : '128px' }} // Animate width change
      >
        <img
          src="/jc.png"
          alt="Joel Cuthriell, a UX Specialist with design, development, and consulting experience"
          className={`transition-all duration-300 ease-in-out ${
            isScrolled ? 'h-12 w-12' : 'h-32 w-32 my-6'
          } ${isScrolled && isImageHovered ? 'opacity-0' : 'opacity-100'}`}
        />
        {isScrolled && (
          <h1 className={`w-full h-full flex items-center justify-center text-4xl font-bold whitespace-nowrap transition-all duration-300 ease-in-out ${
            isImageDisappeared ? 'opacity-100' : 'opacity-0 absolute'
          }`}>
            Joel Cuthriell
          </h1>
        )}
      </div>
      <h1 className={`text-4xl font-bold text-center transition-all duration-300 ease-in-out ${isScrolled ? 'mx-4' : ''}`}>Interactive Specialist</h1>
      <p className={`text-center transition-all duration-300 ease-in-out ${isScrolled ? 'm-0 mt-3' : 'my-4'}`}>
        UI / UX / Design / Development / Multimedia
      </p>
    </header>
  );
}
