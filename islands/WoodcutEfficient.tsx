interface IllustrationProps {
  cardId: number;
  position: "left" | "right";
}

export function WoodcutIllustration({ cardId, position }: IllustrationProps) {
  const renderIllustration = () => {
    switch (cardId) {
      case 1: // "Hi." - Detailed alchemical all-seeing eye
        return (
          <div className="woodcut-frame">
            <svg viewBox="0 0 160 160" className="woodcut-svg">
              {/* Outer decorative border */}
              <rect x="10" y="10" width="140" height="140" fill="none" stroke="#e5e7eb" strokeWidth="1.5" />
              
              {/* Inner circular frame */}
              <circle 
                cx="80" 
                cy="80" 
                r="60" 
                fill="none" 
                stroke="#e5e7eb" 
                strokeWidth="2"
                className="woodcut-breathe"
              />
              
              {/* Secondary circle */}
              <circle cx="80" cy="80" r="50" fill="none" stroke="#e5e7eb" strokeWidth="1" />
              
              {/* Sacred triangle */}
              <path 
                d="M80,45 L55,95 L105,95 Z" 
                fill="none" 
                stroke="#e5e7eb" 
                strokeWidth="2.5"
              />
              
              {/* Central all-seeing eye */}
              <circle 
                cx="80" 
                cy="80" 
                r="8" 
                fill="none"
                stroke="#e5e7eb" 
                strokeWidth="1.5"
              />
              <circle 
                cx="80" 
                cy="80" 
                r="4" 
                fill="#e5e7eb"
                className="woodcut-eye-pulse"
              />
              
              {/* Divine emanation rays */}
              <g className="woodcut-rays">
                <line x1="80" y1="25" x2="80" y2="40" stroke="#e5e7eb" strokeWidth="2" />
                <line x1="70" y1="30" x2="75" y2="42" stroke="#e5e7eb" strokeWidth="1.5" />
                <line x1="90" y1="30" x2="85" y2="42" stroke="#e5e7eb" strokeWidth="1.5" />
                <line x1="62" y1="35" x2="68" y2="45" stroke="#e5e7eb" strokeWidth="1" />
                <line x1="98" y1="35" x2="92" y2="45" stroke="#e5e7eb" strokeWidth="1" />
              </g>
              
              {/* Alchemical corner symbols */}
              <circle cx="25" cy="25" r="4" fill="none" stroke="#e5e7eb" strokeWidth="1" />
              <circle cx="135" cy="25" r="4" fill="none" stroke="#e5e7eb" strokeWidth="1" />
              <circle cx="25" cy="135" r="4" fill="none" stroke="#e5e7eb" strokeWidth="1" />
              <circle cx="135" cy="135" r="4" fill="none" stroke="#e5e7eb" strokeWidth="1" />
              
              {/* Sacred geometry lines */}
              <line x1="55" y1="95" x2="105" y2="95" stroke="#e5e7eb" strokeWidth="2" />
              <line x1="80" y1="95" x2="80" y2="105" stroke="#e5e7eb" strokeWidth="1" />
              
              {/* Mystical dots */}
              <circle cx="65" cy="70" r="1.5" fill="#e5e7eb" className="woodcut-float" />
              <circle cx="95" cy="70" r="1.5" fill="#e5e7eb" className="woodcut-float-delay" />
              <circle cx="80" cy="60" r="1" fill="#e5e7eb" className="woodcut-eye-pulse" />
              
              {/* Hermetic cross */}
              <line x1="77" y1="77" x2="83" y2="83" stroke="#e5e7eb" strokeWidth="0.5" />
              <line x1="83" y1="77" x2="77" y2="83" stroke="#e5e7eb" strokeWidth="0.5" />
            </svg>
          </div>
        );

      case 2: // "Interfaces" - Detailed interface design
        return (
          <div className="woodcut-frame">
            <svg viewBox="0 0 160 160" className="woodcut-svg">
              {/* Outer frame */}
              <rect x="15" y="15" width="130" height="130" fill="none" stroke="#e5e7eb" strokeWidth="2" />
              
              {/* Main window */}
              <rect x="30" y="30" width="100" height="100" fill="none" stroke="#e5e7eb" strokeWidth="2" />
              
              {/* Window dividers */}
              <line x1="80" y1="30" x2="80" y2="130" stroke="#e5e7eb" strokeWidth="1.5" />
              <line x1="30" y1="80" x2="130" y2="80" stroke="#e5e7eb" strokeWidth="1.5" />
              
              {/* Top left quadrant - menu items */}
              <rect x="35" y="35" width="35" height="6" fill="none" stroke="#e5e7eb" strokeWidth="1" className="woodcut-float" />
              <rect x="35" y="45" width="25" height="4" fill="none" stroke="#e5e7eb" strokeWidth="0.8" className="woodcut-float-delay" />
              <rect x="35" y="53" width="30" height="4" fill="none" stroke="#e5e7eb" strokeWidth="0.8" />
              <circle cx="40" cy="65" r="2" fill="#e5e7eb" className="woodcut-eye-pulse" />
              <circle cx="50" cy="65" r="1.5" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
              <line x1="35" y1="70" x2="70" y2="70" stroke="#e5e7eb" strokeWidth="0.5" />
              
              {/* Top right quadrant - icons */}
              <rect x="90" y="35" width="30" height="10" fill="none" stroke="#e5e7eb" strokeWidth="1.2" className="woodcut-float" />
              <circle cx="100" cy="50" r="4" fill="none" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="96" y1="50" x2="104" y2="50" stroke="#e5e7eb" strokeWidth="0.8" />
              <line x1="100" y1="46" x2="100" y2="54" stroke="#e5e7eb" strokeWidth="0.8" />
              <rect x="110" y="48" width="8" height="4" fill="#e5e7eb" className="woodcut-float-delay" />
              <circle cx="125" cy="60" r="1.5" fill="#e5e7eb" className="woodcut-eye-pulse" />
              
              {/* Bottom left quadrant - data visualization */}
              <rect x="35" y="90" width="35" height="25" fill="none" stroke="#e5e7eb" strokeWidth="1.5" />
              <line x1="40" y1="95" x2="40" y2="110" stroke="#e5e7eb" strokeWidth="2" className="woodcut-build" />
              <line x1="45" y1="100" x2="45" y2="110" stroke="#e5e7eb" strokeWidth="2" className="woodcut-build-delay" />
              <line x1="50" y1="97" x2="50" y2="110" stroke="#e5e7eb" strokeWidth="2" className="woodcut-build-more" />
              <line x1="55" y1="102" x2="55" y2="110" stroke="#e5e7eb" strokeWidth="2" className="woodcut-build" />
              <circle cx="62" cy="105" r="1" fill="#e5e7eb" className="woodcut-float" />
              
              {/* Bottom right quadrant - settings */}
              <rect x="90" y="90" width="30" height="30" fill="none" stroke="#e5e7eb" strokeWidth="1" />
              <circle cx="105" cy="105" r="8" fill="none" stroke="#e5e7eb" strokeWidth="1" className="woodcut-breathe" />
              <circle cx="105" cy="105" r="4" fill="none" stroke="#e5e7eb" strokeWidth="0.8" />
              <circle cx="105" cy="105" r="2" fill="#e5e7eb" className="woodcut-eye-pulse" />
              <line x1="98" y1="98" x2="112" y2="112" stroke="#e5e7eb" strokeWidth="0.5" />
              <line x1="112" y1="98" x2="98" y2="112" stroke="#e5e7eb" strokeWidth="0.5" />
              
              {/* Corner brackets */}
              <path d="M20,20 L25,20 L25,25" fill="none" stroke="#e5e7eb" strokeWidth="1" />
              <path d="M140,20 L135,20 L135,25" fill="none" stroke="#e5e7eb" strokeWidth="1" />
              <path d="M20,140 L25,140 L25,135" fill="none" stroke="#e5e7eb" strokeWidth="1" />
              <path d="M140,140 L135,140 L135,135" fill="none" stroke="#e5e7eb" strokeWidth="1" />
            </svg>
          </div>
        );

      case 3: // "Animation" - Complex motion visualization
        return (
          <div className="woodcut-frame">
            <svg viewBox="0 0 160 160" className="woodcut-svg">
              {/* Frame */}
              <rect x="20" y="20" width="120" height="120" fill="none" stroke="#e5e7eb" strokeWidth="2" />
              
              {/* Main wave paths */}
              <path 
                d="M30,80 Q80,55 130,80" 
                fill="none" 
                stroke="#e5e7eb" 
                strokeWidth="3"
                className="woodcut-wave"
              />
              <path 
                d="M35,90 Q80,70 125,90" 
                fill="none" 
                stroke="#e5e7eb" 
                strokeWidth="2"
                className="woodcut-wave"
              />
              <path 
                d="M40,100 Q80,85 120,100" 
                fill="none" 
                stroke="#e5e7eb" 
                strokeWidth="1.5"
                className="woodcut-wave"
              />
              
              {/* Motion particles */}
              <circle cx="50" cy="75" r="2.5" fill="#e5e7eb" className="woodcut-particle-1" />
              <circle cx="75" cy="65" r="2" fill="#e5e7eb" className="woodcut-particle-2" />
              <circle cx="105" cy="75" r="2.5" fill="#e5e7eb" className="woodcut-particle-1" />
              <circle cx="120" cy="85" r="2" fill="#e5e7eb" className="woodcut-particle-2" />
              
              {/* Central timepiece */}
              <circle cx="80" cy="80" r="12" fill="none" stroke="#e5e7eb" strokeWidth="2" className="woodcut-breathe" />
              <circle cx="80" cy="80" r="6" fill="none" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="80" y1="74" x2="80" y2="80" stroke="#e5e7eb" strokeWidth="2" />
              <line x1="80" y1="80" x2="85" y2="85" stroke="#e5e7eb" strokeWidth="1.5" />
              
              {/* Motion trails */}
              <path d="M45,70 L50,75 L45,80" fill="none" stroke="#e5e7eb" strokeWidth="1" className="woodcut-float" />
              <path d="M115,75 L110,80 L115,85" fill="none" stroke="#e5e7eb" strokeWidth="1" className="woodcut-float-delay" />
              
              {/* Speed lines */}
              <line x1="25" y1="60" x2="35" y2="60" stroke="#e5e7eb" strokeWidth="0.8" className="woodcut-particle-1" />
              <line x1="25" y1="65" x2="30" y2="65" stroke="#e5e7eb" strokeWidth="0.6" className="woodcut-particle-2" />
              <line x1="125" y1="95" x2="135" y2="95" stroke="#e5e7eb" strokeWidth="0.8" className="woodcut-particle-1" />
              <line x1="130" y1="100" x2="135" y2="100" stroke="#e5e7eb" strokeWidth="0.6" className="woodcut-particle-2" />
              
              {/* Frame decorations */}
              <circle cx="30" cy="30" r="2" fill="#e5e7eb" />
              <circle cx="130" cy="30" r="2" fill="#e5e7eb" />
              <circle cx="30" cy="130" r="2" fill="#e5e7eb" />
              <circle cx="130" cy="130" r="2" fill="#e5e7eb" />
            </svg>
          </div>
        );

      case 4: // "Physical" - Detailed manuscript
        return (
          <div className="woodcut-frame">
            <svg viewBox="0 0 160 160" className="woodcut-svg">
              {/* Book cover */}
              <rect x="25" y="25" width="110" height="110" fill="none" stroke="#e5e7eb" strokeWidth="2" />
              <rect x="35" y="35" width="90" height="90" fill="none" stroke="#e5e7eb" strokeWidth="1.5" />
              
              {/* Spine details */}
              <line x1="30" y1="25" x2="30" y2="135" stroke="#e5e7eb" strokeWidth="2" />
              <line x1="32" y1="30" x2="32" y2="130" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="34" y1="35" x2="34" y2="125" stroke="#e5e7eb" strokeWidth="0.8" />
              
              {/* Text lines appearing sequentially */}
              <line x1="45" y1="50" x2="110" y2="50" stroke="#e5e7eb" strokeWidth="1" className="woodcut-text-appear" />
              <line x1="45" y1="58" x2="100" y2="58" stroke="#e5e7eb" strokeWidth="1" className="woodcut-text-appear-delay" />
              <line x1="45" y1="66" x2="105" y2="66" stroke="#e5e7eb" strokeWidth="1" className="woodcut-text-appear-more" />
              <line x1="45" y1="74" x2="95" y2="74" stroke="#e5e7eb" strokeWidth="1" className="woodcut-text-appear" />
              <line x1="45" y1="82" x2="108" y2="82" stroke="#e5e7eb" strokeWidth="1" className="woodcut-text-appear-delay" />
              <line x1="45" y1="90" x2="85" y2="90" stroke="#e5e7eb" strokeWidth="1" className="woodcut-text-appear-more" />
              
              {/* Illuminated capital letter area */}
              <rect x="45" y="100" width="15" height="15" fill="none" stroke="#e5e7eb" strokeWidth="1.2" />
              <path d="M47,102 L52,108 L57,102 L52,113 Z" fill="none" stroke="#e5e7eb" strokeWidth="0.8" className="woodcut-float" />
              
              {/* Page corner fold */}
              <path d="M120,40 L110,35 L115,45 Z" fill="#e5e7eb" className="woodcut-float-delay" />
              
              {/* Decorative corner flourishes */}
              <circle cx="45" cy="45" r="2" fill="none" stroke="#e5e7eb" strokeWidth="0.8" />
              <circle cx="115" cy="45" r="2" fill="none" stroke="#e5e7eb" strokeWidth="0.8" />
              <circle cx="45" cy="115" r="2" fill="none" stroke="#e5e7eb" strokeWidth="0.8" />
              <circle cx="115" cy="115" r="2" fill="none" stroke="#e5e7eb" strokeWidth="0.8" />
              
              {/* Margin lines */}
              <line x1="42" y1="40" x2="42" y2="120" stroke="#e5e7eb" strokeWidth="0.5" className="woodcut-eye-pulse" />
              
              {/* Reading bookmark */}
              <rect x="125" y="60" width="4" height="25" fill="#e5e7eb" className="woodcut-float" />
              
              {/* Outer border decorations */}
              <path d="M20,30 L25,30 L22.5,35 Z" fill="#e5e7eb" />
              <path d="M140,30 L135,30 L137.5,35 Z" fill="#e5e7eb" />
            </svg>
          </div>
        );

      case 5: // "Full Stack" - Detailed architecture tower
        return (
          <div className="woodcut-frame">
            <svg viewBox="0 0 160 160" className="woodcut-svg">
              {/* Foundation frame */}
              <rect x="20" y="20" width="120" height="120" fill="none" stroke="#e5e7eb" strokeWidth="2" />
              
              {/* Base layer - database */}
              <rect x="40" y="110" width="80" height="25" fill="none" stroke="#e5e7eb" strokeWidth="2.5" className="woodcut-stack-1" />
              <line x1="45" y1="115" x2="115" y2="115" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="45" y1="120" x2="115" y2="120" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="45" y1="125" x2="115" y2="125" stroke="#e5e7eb" strokeWidth="1" />
              <circle cx="50" cy="130" r="1.5" fill="#e5e7eb" className="woodcut-float" />
              <circle cx="110" cy="130" r="1.5" fill="#e5e7eb" className="woodcut-float-delay" />
              
              {/* Middle layer - server */}
              <rect x="50" y="85" width="60" height="25" fill="none" stroke="#e5e7eb" strokeWidth="2" className="woodcut-stack-2" />
              <rect x="55" y="90" width="15" height="15" fill="none" stroke="#e5e7eb" strokeWidth="1" />
              <rect x="75" y="90" width="15" height="15" fill="none" stroke="#e5e7eb" strokeWidth="1" />
              <rect x="95" y="90" width="10" height="15" fill="none" stroke="#e5e7eb" strokeWidth="1" />
              <circle cx="62" cy="97" r="1" fill="#e5e7eb" className="woodcut-eye-pulse" />
              <circle cx="82" cy="97" r="1" fill="#e5e7eb" className="woodcut-eye-pulse" />
              <circle cx="100" cy="97" r="1" fill="#e5e7eb" className="woodcut-eye-pulse" />
              
              {/* Top layer - frontend */}
              <rect x="60" y="60" width="40" height="25" fill="none" stroke="#e5e7eb" strokeWidth="2" className="woodcut-stack-3" />
              <rect x="65" y="65" width="10" height="8" fill="none" stroke="#e5e7eb" strokeWidth="1" />
              <rect x="80" y="65" width="15" height="8" fill="none" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="65" y1="75" x2="95" y2="75" stroke="#e5e7eb" strokeWidth="1" />
              <circle cx="70" cy="78" r="1" fill="#e5e7eb" className="woodcut-float" />
              <circle cx="85" cy="78" r="1" fill="#e5e7eb" className="woodcut-float-delay" />
              
              {/* Top antenna/API */}
              <line x1="80" y1="60" x2="80" y2="40" stroke="#e5e7eb" strokeWidth="2" />
              <circle cx="80" cy="35" r="4" fill="none" stroke="#e5e7eb" strokeWidth="1.5" className="woodcut-breathe" />
              <line x1="76" y1="32" x2="84" y2="38" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="84" y1="32" x2="76" y2="38" stroke="#e5e7eb" strokeWidth="1" />
              
              {/* Connection lines */}
              <line x1="50" y1="95" x2="40" y2="105" stroke="#e5e7eb" strokeWidth="1" className="woodcut-particle-1" />
              <line x1="110" y1="95" x2="120" y2="105" stroke="#e5e7eb" strokeWidth="1" className="woodcut-particle-2" />
              
              {/* Corner tech symbols */}
              <rect x="25" y="25" width="6" height="6" fill="none" stroke="#e5e7eb" strokeWidth="0.8" />
              <rect x="129" y="25" width="6" height="6" fill="none" stroke="#e5e7eb" strokeWidth="0.8" />
              <rect x="25" y="129" width="6" height="6" fill="none" stroke="#e5e7eb" strokeWidth="0.8" />
              <rect x="129" y="129" width="6" height="6" fill="none" stroke="#e5e7eb" strokeWidth="0.8" />
            </svg>
          </div>
        );

      case 6: // "AI Intelligence" - Complex neural network
        return (
          <div className="woodcut-frame">
            <svg viewBox="0 0 160 160" className="woodcut-svg">
              {/* Outer brain outline */}
              <path
                d="M50,60 Q80,35 110,60 Q135,80 110,120 Q80,135 50,120 Q35,100 40,80 Q45,65 50,60"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="2.5"
                className="woodcut-breathe"
              />
              
              {/* Inner neural pathways */}
              <path d="M60,70 Q80,65 100,70" fill="none" stroke="#e5e7eb" strokeWidth="1.5" />
              <path d="M60,80 Q80,75 100,80" fill="none" stroke="#e5e7eb" strokeWidth="1.5" />
              <path d="M60,90 Q80,85 100,90" fill="none" stroke="#e5e7eb" strokeWidth="1.5" />
              <path d="M60,100 Q80,95 100,100" fill="none" stroke="#e5e7eb" strokeWidth="1.5" />
              <path d="M60,110 Q80,105 100,110" fill="none" stroke="#e5e7eb" strokeWidth="1.5" />
              
              {/* Neural nodes */}
              <circle cx="65" cy="70" r="3" fill="#e5e7eb" className="woodcut-neural-1" />
              <circle cx="95" cy="70" r="3" fill="#e5e7eb" className="woodcut-neural-2" />
              <circle cx="80" cy="75" r="4" fill="#e5e7eb" className="woodcut-neural-center" />
              <circle cx="70" cy="85" r="2.5" fill="#e5e7eb" className="woodcut-neural-1" />
              <circle cx="90" cy="85" r="2.5" fill="#e5e7eb" className="woodcut-neural-2" />
              <circle cx="65" cy="100" r="2" fill="#e5e7eb" className="woodcut-neural-1" />
              <circle cx="95" cy="100" r="2" fill="#e5e7eb" className="woodcut-neural-2" />
              <circle cx="80" cy="105" r="3" fill="#e5e7eb" className="woodcut-neural-center" />
              
              {/* Synaptic connections */}
              <line x1="65" y1="70" x2="70" y2="85" stroke="#e5e7eb" strokeWidth="0.8" className="woodcut-particle-1" />
              <line x1="95" y1="70" x2="90" y2="85" stroke="#e5e7eb" strokeWidth="0.8" className="woodcut-particle-2" />
              <line x1="70" y1="85" x2="65" y2="100" stroke="#e5e7eb" strokeWidth="0.8" className="woodcut-particle-1" />
              <line x1="90" y1="85" x2="95" y2="100" stroke="#e5e7eb" strokeWidth="0.8" className="woodcut-particle-2" />
              
              {/* Thought emanations */}
              <path d="M80,45 Q75,30 70,20" fill="none" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="2,2" className="woodcut-rays" />
              <path d="M80,45 Q80,25 80,15" fill="none" stroke="#e5e7eb" strokeWidth="1.2" strokeDasharray="2,2" className="woodcut-rays" />
              <path d="M80,45 Q85,30 90,20" fill="none" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="2,2" className="woodcut-rays" />
              
              {/* Consciousness indicators */}
              <circle cx="60" cy="55" r="1.5" fill="#e5e7eb" className="woodcut-float" />
              <circle cx="100" cy="55" r="1.5" fill="#e5e7eb" className="woodcut-float-delay" />
              <circle cx="50" cy="110" r="1" fill="#e5e7eb" className="woodcut-eye-pulse" />
              <circle cx="110" cy="110" r="1" fill="#e5e7eb" className="woodcut-eye-pulse" />
              
              {/* Frame border */}
              <rect x="15" y="15" width="130" height="130" fill="none" stroke="#e5e7eb" strokeWidth="1.5" />
            </svg>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`woodcut-container-efficient ${position}`}>
      {renderIllustration()}
    </div>
  );
}