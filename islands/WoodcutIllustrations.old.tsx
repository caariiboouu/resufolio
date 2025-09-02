import { useEffect, useRef, useState } from "preact/hooks";

// Types for our illustrations
interface IllustrationProps {
  cardId: number;
  position: "left" | "right";
}

// Optimized Woodcut Illustrations - GPU-friendly traditional woodcut style
export function WoodcutIllustration({ cardId, position }: IllustrationProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Simple crosshatch pattern component
  const CrossHatch = ({ x, y, width, height, spacing = 8, opacity = 0.3 }: {
    x: number;
    y: number;
    width: number;
    height: number;
    spacing?: number;
    opacity?: number;
  }) => (
    <g opacity={opacity}>
      {Array.from({ length: Math.floor(height / spacing) }).map((_, i) => (
        <line
          key={`h-${i}`}
          x1={x}
          y1={y + i * spacing}
          x2={x + width}
          y2={y + i * spacing}
          stroke="#e5e7eb"
          strokeWidth="0.5"
        />
      ))}
      {Array.from({ length: Math.floor(width / spacing) }).map((_, i) => (
        <line
          key={`v-${i}`}
          x1={x + i * spacing}
          y1={y}
          x2={x + i * spacing}
          y2={y + height}
          stroke="#e5e7eb"
          strokeWidth="0.5"
        />
      ))}
    </g>
  );

  // Simple hatching pattern component
  const Hatching = (
    { x, y, width, height, angle = 45, spacing = 6, opacity = 0.4 }: {
      x: number;
      y: number;
      width: number;
      height: number;
      angle?: number;
      spacing?: number;
      opacity?: number;
    },
  ) => {
    const lines = [];
    const radians = (angle * Math.PI) / 180;
    const lineLength = Math.sqrt(width * width + height * height);
    const numLines = Math.floor(lineLength / spacing);

    for (let i = 0; i < numLines; i++) {
      const offset = i * spacing;
      const x1 = x + Math.cos(radians) * offset;
      const y1 = y + Math.sin(radians) * offset;
      const x2 = x1 + Math.cos(radians + Math.PI / 2) * lineLength;
      const y2 = y1 + Math.sin(radians + Math.PI / 2) * lineLength;

      lines.push(
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#e5e7eb"
          strokeWidth="0.5"
          opacity={opacity}
        />,
      );
    }
    return <g>{lines}</g>;
  };

  // Determine which illustration to render based on cardId
  const renderIllustration = () => {
    switch (cardId) {
      case 1: // "Hi."
        return (
          <svg
            ref={svgRef}
            viewBox="0 0 240 240"
            className={`woodcut-svg woodcut-hi ${
              position === "left" ? "woodcut-left" : "woodcut-right"
            }`}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
            }}
          >
            {/* Main circular frame */}
            <circle
              cx="120"
              cy="120"
              r="90"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1.5"
              className="woodcut-path float-pulse-slow"
            />

            {/* Celestial orbits */}
            <circle
              cx="120"
              cy="120"
              r="60"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.8"
              className="orbit woodcut-path float-rotate-slow"
            />
            <ellipse
              cx="120"
              cy="120"
              rx="75"
              ry="50"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.8"
              className="orbit woodcut-path float-rotate-reverse"
            />
            <ellipse
              cx="120"
              cy="120"
              rx="50"
              ry="75"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.8"
              className="orbit woodcut-path float-rotate"
            />

            {/* Central sun/face */}
            <circle
              cx="120"
              cy="120"
              r="30"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1.2"
              className="woodcut-path float-rotate-slow"
            />
            <path
              d="M100,120 L140,120"
              stroke="#e5e7eb"
              strokeWidth="1"
              className="celestial-detail woodcut-path float-diagonal-small"
            />
            <path
              d="M120,100 L120,140"
              stroke="#e5e7eb"
              strokeWidth="1"
              className="celestial-detail woodcut-path float-diagonal-reverse-small"
            />
            <circle
              cx="120"
              cy="120"
              r="15"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.8"
              className="celestial-detail woodcut-path float-rotate-reverse"
            />
            <circle
              cx="120"
              cy="120"
              r="22"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="celestial-detail woodcut-path float-up-down-small"
            />
            <path
              d="M105,105 L135,135"
              stroke="#e5e7eb"
              strokeWidth="0.8"
              className="celestial-detail woodcut-path float-left"
            />
            <path
              d="M135,105 L105,135"
              stroke="#e5e7eb"
              strokeWidth="0.8"
              className="celestial-detail woodcut-path float-right"
            />

            {/* Radiating beams */}
            <g className="celestial-rays">
              <path
                d="M120,30 L120,50"
                stroke="#e5e7eb"
                strokeWidth="1"
                className="ray woodcut-path float-up-down-small"
              />
              <path
                d="M120,190 L120,210"
                stroke="#e5e7eb"
                strokeWidth="1"
                className="ray woodcut-path float-up-down-small"
              />
              <path
                d="M30,120 L50,120"
                stroke="#e5e7eb"
                strokeWidth="1"
                className="ray woodcut-path float-left"
              />
              <path
                d="M190,120 L210,120"
                stroke="#e5e7eb"
                strokeWidth="1"
                className="ray woodcut-path float-right"
              />

              <path
                d="M60,60 L75,75"
                stroke="#e5e7eb"
                strokeWidth="1"
                className="ray woodcut-path float-diagonal-reverse-small"
              />
              <path
                d="M165,165 L180,180"
                stroke="#e5e7eb"
                strokeWidth="1"
                className="ray woodcut-path float-diagonal-small"
              />
              <path
                d="M60,180 L75,165"
                stroke="#e5e7eb"
                strokeWidth="1"
                className="ray woodcut-path float-diagonal-small"
              />
              <path
                d="M165,75 L180,60"
                stroke="#e5e7eb"
                strokeWidth="1"
                className="ray woodcut-path float-diagonal-reverse-small"
              />
            </g>

            {/* Planets/celestial bodies */}
            <circle
              cx="180"
              cy="120"
              r="8"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
              className="celestial-body float-left woodcut-path"
            />
            <circle
              cx="120"
              cy="60"
              r="8"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
              className="celestial-body float-up-down-small woodcut-path"
            />
            <circle
              cx="70"
              cy="140"
              r="10"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
              className="celestial-body float-diagonal-small woodcut-path"
            />
            <circle
              cx="160"
              cy="80"
              r="6"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
              className="celestial-body float-diagonal-reverse-small woodcut-path"
            />

            {/* Detail within planets */}
            <path
              d="M176,120 L184,120 M180,116 L180,124"
              stroke="#e5e7eb"
              strokeWidth="0.8"
              className="celestial-detail woodcut-path float-pulse-opacity"
            />
            <path
              d="M116,60 L124,60 M120,56 L120,64"
              stroke="#e5e7eb"
              strokeWidth="0.8"
              className="celestial-detail woodcut-path float-pulse-opacity-delay"
            />
            <path
              d="M67,140 L73,140 M70,137 L70,143"
              stroke="#e5e7eb"
              strokeWidth="0.8"
              className="celestial-detail woodcut-path float-pulse-opacity"
            />
            <path
              d="M157,80 L163,80 M160,77 L160,83"
              stroke="#e5e7eb"
              strokeWidth="0.8"
              className="celestial-detail woodcut-path float-pulse-opacity-delay"
            />

            {/* Celestial bodies in corners */}
            <circle
              cx="75"
              cy="75"
              r="10"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.8"
              className="celestial-body woodcut-path float-up-down-small"
            />
            <circle
              cx="165"
              cy="75"
              r="6"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.8"
              className="celestial-body woodcut-path float-diagonal-small"
            />
            <circle
              cx="165"
              cy="165"
              r="8"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.8"
              className="celestial-body woodcut-path float-left"
            />
            <circle
              cx="75"
              cy="165"
              r="5"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.8"
              className="celestial-body woodcut-path float-right"
            />

            {/* Decorative elements in corners */}
            <path
              d="M30,30 C35,25 40,25 45,30 C50,35 50,40 45,45 C40,50 35,50 30,45 C25,40 25,35 30,30 Z"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.8"
              className="woodcut-flourish float-rotate-slow"
            />
            <path
              d="M210,30 C215,25 220,25 225,30 C230,35 230,40 225,45 C220,50 215,50 210,45 C205,40 205,35 210,30 Z"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.8"
              className="woodcut-flourish float-rotate-reverse-slow"
            />
            <path
              d="M30,210 C35,205 40,205 45,210 C50,215 50,220 45,225 C40,230 35,230 30,225 C25,220 25,215 30,210 Z"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.8"
              className="woodcut-flourish float-rotate-slow"
            />
            <path
              d="M210,210 C215,205 220,205 225,210 C230,215 230,220 225,225 C220,230 215,230 210,225 C205,220 205,215 210,210 Z"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.8"
              className="woodcut-flourish float-rotate-reverse-slow"
            />

            {/* Zodiac symbols around perimeter */}
            <path
              d="M90,40 L95,35 L100,40 L105,35 L110,40"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="zodiac-symbol woodcut-path float-diagonal-small"
            />
            <path
              d="M40,90 L35,95 L40,100 L35,105 L40,110"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="zodiac-symbol woodcut-path float-diagonal-reverse-small"
            />
            <path
              d="M90,200 L95,195 L100,200 L105,195 L110,200"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="zodiac-symbol woodcut-path float-diagonal-small"
            />
            <path
              d="M200,90 L195,95 L200,100 L195,105 L200,110"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="zodiac-symbol woodcut-path float-diagonal-reverse-small"
            />

            {/* Fine hatching patterns in specific areas */}
            <g className="woodcut-hatching float-opacity">
              <path
                d="M130,170 L140,170 M133,175 L143,175 M136,180 L146,180 M139,185 L149,185"
                stroke="#e5e7eb"
                strokeWidth="0.3"
                strokeOpacity="0.8"
                className="float-right"
              />
              <path
                d="M70,70 L80,70 M73,75 L83,75 M76,80 L86,80 M79,85 L89,85"
                stroke="#e5e7eb"
                strokeWidth="0.3"
                strokeOpacity="0.8"
                className="float-left"
              />
            </g>

            {/* Stars in the background */}
            <path
              d="M40,40 L45,40 M42.5,37.5 L42.5,42.5"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="star woodcut-path float-pulse-opacity"
            />
            <path
              d="M200,40 L205,40 M202.5,37.5 L202.5,42.5"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="star woodcut-path float-pulse-opacity-delay"
            />
            <path
              d="M40,200 L45,200 M42.5,197.5 L42.5,202.5"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="star woodcut-path float-pulse-opacity"
            />
            <path
              d="M200,200 L205,200 M202.5,197.5 L202.5,202.5"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="star woodcut-path float-pulse-opacity-delay"
            />

            {/* Additional smaller stars */}
            <path
              d="M50,60 L50,50 L52,57 L45,54 L55,54 L48,57 Z"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="insight-star woodcut-path float-pulse-opacity"
            />
            <path
              d="M180,60 L180,50 L182,57 L175,54 L185,54 L178,57 Z"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="insight-star woodcut-path float-pulse-opacity-delay"
            />
            <path
              d="M60,190 L60,180 L62,187 L55,184 L65,184 L58,187 Z"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="insight-star woodcut-path float-pulse-opacity"
            />
            <path
              d="M190,190 L190,180 L192,187 L185,184 L195,184 L188,187 Z"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="insight-star woodcut-path float-pulse-opacity-delay"
            />

            {/* Detail line work along orbits */}
            <path
              d="M120,120 L150,100 M120,120 L90,140 M120,120 L140,150 M120,120 L100,90"
              stroke="#e5e7eb"
              strokeWidth="0.3"
              className="orbit-connect woodcut-path float-rotate-slow"
            />

            {/* Orbital ellipses */}
            <ellipse
              cx="120"
              cy="120"
              rx="80"
              ry="40"
              transform="rotate(30, 120, 120)"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="orbital-ellipse woodcut-path float-rotate-slow"
            />

            <ellipse
              cx="120"
              cy="120"
              rx="70"
              ry="50"
              transform="rotate(75, 120, 120)"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.4"
              className="orbital-ellipse woodcut-path float-rotate-reverse-slow"
            />

            <ellipse
              cx="120"
              cy="120"
              rx="60"
              ry="30"
              transform="rotate(110, 120, 120)"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.3"
              className="orbital-ellipse woodcut-path float-rotate"
            />

            {/* Larger orbital paths distributed around the illustration */}
            <ellipse
              cx="120"
              cy="120"
              rx="110"
              ry="70"
              transform="rotate(15, 120, 120)"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.6"
              className="orbital-ellipse-large woodcut-path float-rotate-reverse"
            />

            <ellipse
              cx="120"
              cy="120"
              rx="100"
              ry="90"
              transform="rotate(55, 120, 120)"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="orbital-ellipse-large woodcut-path float-rotate-slow"
            />

            <ellipse
              cx="120"
              cy="120"
              rx="90"
              ry="60"
              transform="rotate(140, 120, 120)"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.55"
              className="orbital-ellipse-large woodcut-path float-rotate"
            />

            {/* Arcing orbital paths to match sketch */}
            {/* Top curved orbital paths */}
            <path
              d="M30,80 Q120,0 210,70"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.7"
              className="orbital-arc woodcut-path float-up-down-small"
            />

            <path
              d="M45,90 Q120,25 195,85"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.6"
              className="orbital-arc woodcut-path float-up-down-small-delay"
            />

            <path
              d="M60,100 Q120,45 180,100"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.55"
              className="orbital-arc woodcut-path float-up-down-small"
            />

            {/* Bottom curved path */}
            <path
              d="M70,160 Q120,190 170,160"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="orbital-arc woodcut-path float-rotate-slow"
            />

            {/* Hash marks on orbits */}
            <path
              d="M100,160 L105,160 M110,160 L115,160 M120,160 L125,160"
              stroke="#e5e7eb"
              strokeWidth="0.4"
              className="orbit-hash woodcut-path float-left-right-small"
            />

            <path
              d="M70,90 L75,90 M80,90 L85,90"
              stroke="#e5e7eb"
              strokeWidth="0.4"
              className="orbit-hash woodcut-path float-left-right-small"
            />

            <path
              d="M145,90 L150,90 M155,90 L160,90"
              stroke="#e5e7eb"
              strokeWidth="0.4"
              className="orbit-hash woodcut-path float-left-right-small"
            />

            {/* Small plus marks */}
            <path
              d="M170,120 L175,120 M172.5,117.5 L172.5,122.5"
              stroke="#e5e7eb"
              strokeWidth="0.4"
              className="plus-mark woodcut-path float-pulse-opacity"
            />

            <path
              d="M80,175 L85,175 M82.5,172.5 L82.5,177.5"
              stroke="#e5e7eb"
              strokeWidth="0.4"
              className="plus-mark woodcut-path float-pulse-opacity"
            />

            <path
              d="M65,130 L70,130 M67.5,127.5 L67.5,132.5"
              stroke="#e5e7eb"
              strokeWidth="0.4"
              className="plus-mark woodcut-path float-pulse-opacity"
            />

            <path
              d="M180,150 L185,150 M182.5,147.5 L182.5,152.5"
              stroke="#e5e7eb"
              strokeWidth="0.4"
              className="plus-mark woodcut-path float-pulse-opacity"
            />

            <path
              d="M120,75 L125,75 M122.5,72.5 L122.5,77.5"
              stroke="#e5e7eb"
              strokeWidth="0.4"
              className="plus-mark woodcut-path float-pulse-opacity"
            />

            <path
              d="M150,185 L155,185 M152.5,182.5 L152.5,187.5"
              stroke="#e5e7eb"
              strokeWidth="0.4"
              className="plus-mark woodcut-path float-pulse-opacity"
            />

            {/* Small star elements in corners */}
            <path
              d="M65,85 L67,83 M63,83 L65,85 M67,87 L65,85 M65,85 L63,87"
              stroke="#e5e7eb"
              strokeWidth="0.4"
              className="star-mark woodcut-path float-pulse-opacity"
            />

            <path
              d="M175,85 L177,83 M173,83 L175,85 M177,87 L175,85 M175,85 L173,87"
              stroke="#e5e7eb"
              strokeWidth="0.4"
              className="star-mark woodcut-path float-pulse-opacity"
            />

            <path
              d="M65,175 L67,173 M63,173 L65,175 M67,177 L65,175 M65,175 L63,177"
              stroke="#e5e7eb"
              strokeWidth="0.4"
              className="star-mark woodcut-path float-pulse-opacity"
            />

            <path
              d="M175,175 L177,173 M173,173 L175,175 M177,177 L175,175 M175,175 L173,177"
              stroke="#e5e7eb"
              strokeWidth="0.4"
              className="star-mark woodcut-path float-pulse-opacity"
            />

            {/* AC signature in the bottom right */}
            <path
              d="M187,182 L185,185 L188,185"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.3"
              className="signature woodcut-path"
            />

            <path
              d="M190,182 C191,185 193,185 193,182"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.3"
              className="signature woodcut-path"
            />

            {/* Improved sun center with radiating lines */}
            <circle
              cx="120"
              cy="120"
              r="8"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="sun-center woodcut-path float-pulse"
            />

            <circle
              cx="120"
              cy="120"
              r="4"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.4"
              className="sun-inner woodcut-path float-pulse-opacity"
            />

            {/* Radiating sun lines */}
            <path
              d="M120,108 L120,102 M126,110 L132,105 M130,120 L136,120 M126,130 L132,135 M120,132 L120,138 M114,130 L108,135 M110,120 L104,120 M114,110 L108,105"
              stroke="#e5e7eb"
              strokeWidth="0.4"
              className="sun-rays woodcut-path float-pulse-opacity"
            />

            {/* Outer cosmic boundary */}
            <circle
              cx="120"
              cy="120"
              r="115"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.3"
              strokeDasharray="3,5"
              className="cosmic-boundary woodcut-path float-pulse-slow"
            />

            {/* Small celestial bodies moving along the orbits */}
            <circle
              cx="180"
              cy="105"
              r="3"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.6"
              className="celestial-body woodcut-path float-rotate-slow"
            />

            <circle
              cx="65"
              cy="135"
              r="2"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="celestial-body woodcut-path float-rotate-reverse"
            />

            <circle
              cx="130"
              cy="65"
              r="2.5"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="celestial-body woodcut-path float-rotate"
            />

            {/* Central sun details */}
            <circle
              cx="120"
              cy="120"
              r="10"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="sun-core woodcut-path float-pulse"
            />
            <circle
              cx="120"
              cy="120"
              r="5"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.3"
              className="sun-core-inner woodcut-path float-pulse-opacity"
            />

            {/* Fine detail flare lines radiating from center */}
            <path
              d="M110,110 L105,105 M130,110 L135,105 M110,130 L105,135 M130,130 L135,135"
              stroke="#e5e7eb"
              strokeWidth="0.3"
              className="flare-lines woodcut-path float-pulse-opacity-delay"
            />

            {/* Small comets */}
            <path
              d="M60,100 C65,95 70,90 75,95"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="comet woodcut-path float-diagonal-small"
            />
            <path
              d="M180,100 C175,95 170,90 165,95"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="comet woodcut-path float-diagonal-reverse-small"
            />

            {/* Subtle constellation connections */}
            <path
              d="M75,75 L120,60 L165,75 M75,165 L120,180 L165,165"
              stroke="#e5e7eb"
              strokeWidth="0.2"
              strokeDasharray="2,3"
              className="constellation woodcut-path float-pulse-opacity"
            />

            {/* Additional decorative elements */}
            <circle
              cx="120"
              cy="30"
              r="3"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="decorative-node woodcut-path float-up-down-small"
            />
            <circle
              cx="120"
              cy="210"
              r="3"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="decorative-node woodcut-path float-up-down-small"
            />
            <circle
              cx="30"
              cy="120"
              r="3"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="decorative-node woodcut-path float-left"
            />
            <circle
              cx="210"
              cy="120"
              r="3"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="decorative-node woodcut-path float-right"
            />

            {/* Sun rays in fine detail */}
            <g className="sun-rays">
              <path
                d="M120,120 L120,140 M120,120 L130,138 M120,120 L138,130"
                stroke="#e5e7eb"
                strokeWidth="0.25"
                className="ray-detail woodcut-path float-pulse-opacity"
              />
              <path
                d="M120,120 L120,100 M120,120 L110,102 M120,120 L102,110"
                stroke="#e5e7eb"
                strokeWidth="0.25"
                className="ray-detail woodcut-path float-pulse-opacity-delay"
              />
            </g>

            {/* Dürer-style signature in corner */}
            <g
              className="woodcut-signature"
              transform="translate(205, 215) scale(0.3)"
            >
              <path
                d="M0,20 L10,0 L20,20 M5,10 L15,10"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1"
                className="float-pulse-opacity"
              />
              <path
                d="M25,0 C30,0 35,5 35,10 C35,15 30,20 25,20 C20,20 20,15 20,10 L35,10"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1"
                className="float-pulse-opacity-delay"
              />
            </g>
          </svg>
        );

      case 2: // "Interfaces, Interfaces, & Interfaces"
        return (
          <svg
            ref={svgRef}
            viewBox="0 0 240 240"
            className={`woodcut-svg woodcut-interfaces ${
              position === "left" ? "woodcut-left" : "woodcut-right"
            }`}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
            }}
          >
            {/* Border frame inspired by Dürer's woodcuts */}
            <rect
              x="10"
              y="10"
              width="220"
              height="220"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="2"
              className="woodcut-frame"
            />

            {/* Background with hatching patterns like Dürer's woodcuts */}
            <g className="woodcut-background-hatching float-opacity">
              <path
                d="M20,20 L40,20 M20,25 L50,25 M20,30 L60,30 M20,35 L70,35 M20,40 L80,40"
                stroke="#e5e7eb"
                strokeWidth="0.5"
                strokeOpacity="0.6"
              />
              <path
                d="M160,20 L220,20 M170,25 L220,25 M180,30 L220,30 M190,35 L220,35 M200,40 L220,40"
                stroke="#e5e7eb"
                strokeWidth="0.5"
                strokeOpacity="0.6"
              />
              <path
                d="M20,200 L40,200 M20,205 L50,205 M20,210 L60,210 M20,215 L70,215"
                stroke="#e5e7eb"
                strokeWidth="0.5"
                strokeOpacity="0.6"
              />
              <path
                d="M160,200 L220,200 M170,205 L220,205 M180,210 L220,210 M190,215 L220,215"
                stroke="#e5e7eb"
                strokeWidth="0.5"
                strokeOpacity="0.6"
              />
            </g>

            {/* Interface 1: Window like Dürer's architectural elements */}
            <rect
              x="40"
              y="40"
              width="160"
              height="100"
              rx="3"
              ry="3"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="2"
              className="woodcut-interface-1 float-pulse-slow"
            />
            <line
              x1="40"
              y1="60"
              x2="200"
              y2="60"
              stroke="#e5e7eb"
              strokeWidth="2"
              className="woodcut-interface-1"
            />
            <circle
              cx="50"
              cy="50"
              r="3"
              fill="#e5e7eb"
              className="woodcut-interface-1 woodcut-dot float-pulse"
            />
            <circle
              cx="65"
              cy="50"
              r="3"
              fill="#e5e7eb"
              className="woodcut-interface-1 woodcut-dot float-pulse-delay"
            />
            <circle
              cx="80"
              cy="50"
              r="3"
              fill="#e5e7eb"
              className="woodcut-interface-1 woodcut-dot float-pulse-delay-more"
            />

            {/* Interface 1 title bar text */}
            <path
              d="M100,50 L110,50 M115,50 L125,50 M130,50 L140,50 M145,50 L155,50"
              stroke="#e5e7eb"
              strokeWidth="1"
              className="woodcut-interface-title float-opacity"
            />

            {/* Crosshatching for window interior in Dürer style */}
            <g className="woodcut-window-hatch float-opacity">
              <path
                d="M50,70 L60,70 M50,80 L70,80 M50,90 L80,90 M50,100 L90,100 M50,110 L100,110 M50,120 L110,120"
                stroke="#e5e7eb"
                strokeWidth="0.5"
              />
              <path
                d="M120,70 L130,70 M120,80 L140,80 M120,90 L150,90 M120,100 L160,100 M120,110 L170,110 M120,120 L180,120"
                stroke="#e5e7eb"
                strokeWidth="0.5"
              />
            </g>

            {/* Window scrollbar */}
            <rect
              x="190"
              y="65"
              width="5"
              height="70"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="woodcut-scrollbar"
            />
            <rect
              x="190"
              y="70"
              width="5"
              height="20"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="woodcut-scrollbar-thumb float-up-down-small"
            />

            {/* Interface content elements - icons and blocks */}
            <rect
              x="60"
              y="75"
              width="15"
              height="15"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="woodcut-icon float-diagonal-small"
            />
            <path
              d="M63,80 L72,80 M63,85 L72,85"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="woodcut-icon-detail"
            />

            <rect
              x="85"
              y="75"
              width="15"
              height="15"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="woodcut-icon float-diagonal-reverse-small"
            />
            <circle
              cx="92.5"
              cy="82.5"
              r="5"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="woodcut-icon-detail float-pulse"
            />

            <rect
              x="110"
              y="75"
              width="15"
              height="15"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="woodcut-icon float-diagonal-small"
            />
            <path
              d="M114,82.5 L121,82.5 M117.5,79 L117.5,86"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="woodcut-icon-detail float-rotate-slow"
            />

            <rect
              x="60"
              y="100"
              width="40"
              height="10"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="woodcut-textblock float-left-right-small"
            />

            <rect
              x="110"
              y="100"
              width="40"
              height="10"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="woodcut-textblock float-left-right-small-delay"
            />

            {/* Interface 2: Mobile Device - styled as a scroll/book in Dürer fashion */}
            <rect
              x="70"
              y="150"
              width="50"
              height="70"
              rx="5"
              ry="5"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="2"
              className="woodcut-interface-2 float-up-down-small"
            />
            <line
              x1="70"
              y1="170"
              x2="120"
              y2="170"
              stroke="#e5e7eb"
              strokeWidth="1"
              className="woodcut-interface-2 float-pulse-opacity"
            />
            <line
              x1="70"
              y1="180"
              x2="120"
              y2="180"
              stroke="#e5e7eb"
              strokeWidth="1"
              className="woodcut-interface-2 float-pulse-opacity-delay"
            />
            <line
              x1="70"
              y1="190"
              x2="120"
              y2="190"
              stroke="#e5e7eb"
              strokeWidth="1"
              className="woodcut-interface-2 float-pulse-opacity"
            />

            {/* Mobile device camera and speaker */}
            <circle
              cx="95"
              cy="160"
              r="2"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="woodcut-camera float-twinkle"
            />
            <path
              d="M85,160 L90,160 M100,160 L105,160"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="woodcut-speaker float-pulse-opacity"
            />

            {/* Mobile app icons */}
            <rect
              x="75"
              y="200"
              width="10"
              height="10"
              rx="1"
              ry="1"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="woodcut-app-icon float-pulse"
            />
            <rect
              x="90"
              y="200"
              width="10"
              height="10"
              rx="1"
              ry="1"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="woodcut-app-icon float-pulse-delay"
            />
            <rect
              x="105"
              y="200"
              width="10"
              height="10"
              rx="1"
              ry="1"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="woodcut-app-icon float-pulse-delay-more"
            />

            {/* Interface 3: Code Window as manuscript/document */}
            <rect
              x="140"
              y="150"
              width="70"
              height="70"
              rx="0"
              ry="0"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="2"
              className="woodcut-interface-3 float-diagonal-small"
            />
            <line
              x1="145"
              y1="165"
              x2="205"
              y2="165"
              stroke="#e5e7eb"
              strokeWidth="1"
              className="woodcut-interface-3 woodcut-code-line float-pulse-opacity"
            />
            <line
              x1="145"
              y1="175"
              x2="205"
              y2="175"
              stroke="#e5e7eb"
              strokeWidth="1"
              className="woodcut-interface-3 woodcut-code-line float-pulse-opacity-delay"
            />
            <line
              x1="145"
              y1="185"
              x2="205"
              y2="185"
              stroke="#e5e7eb"
              strokeWidth="1"
              className="woodcut-interface-3 woodcut-code-line float-pulse-opacity"
            />
            <line
              x1="145"
              y1="195"
              x2="205"
              y2="195"
              stroke="#e5e7eb"
              strokeWidth="1"
              className="woodcut-interface-3 woodcut-code-line float-pulse-opacity-delay"
            />
            <line
              x1="145"
              y1="205"
              x2="185"
              y2="205"
              stroke="#e5e7eb"
              strokeWidth="1"
              className="woodcut-interface-3 woodcut-code-line float-pulse-opacity"
            />

            {/* Code indentation and syntax details */}
            <path
              d="M150,165 L155,165 M160,165 L170,165"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="woodcut-code-syntax float-opacity"
            />
            <path
              d="M155,175 L165,175 M170,175 L180,175"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="woodcut-code-syntax float-opacity-delay"
            />
            <path
              d="M155,185 L160,185 M165,185 L175,185"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="woodcut-code-syntax float-opacity"
            />
            <path
              d="M150,195 L160,195 M165,195 L175,195"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="woodcut-code-syntax float-opacity-delay"
            />

            {/* Line numbers */}
            <text
              x="143"
              y="160"
              fontSize="3"
              fill="#e5e7eb"
              className="woodcut-line-number float-pulse-opacity"
            >
              1
            </text>
            <text
              x="143"
              y="170"
              fontSize="3"
              fill="#e5e7eb"
              className="woodcut-line-number float-pulse-opacity-delay"
            >
              2
            </text>
            <text
              x="143"
              y="180"
              fontSize="3"
              fill="#e5e7eb"
              className="woodcut-line-number float-pulse-opacity"
            >
              3
            </text>
            <text
              x="143"
              y="190"
              fontSize="3"
              fill="#e5e7eb"
              className="woodcut-line-number float-pulse-opacity-delay"
            >
              4
            </text>
            <text
              x="143"
              y="200"
              fontSize="3"
              fill="#e5e7eb"
              className="woodcut-line-number float-pulse-opacity"
            >
              5
            </text>

            {/* Dürer monogram */}
            <g
              className="woodcut-signature"
              transform="translate(205, 215) scale(0.3)"
            >
              <path
                d="M0,20 L10,0 L20,20 M5,10 L15,10"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1"
              />
              <path
                d="M25,0 C30,0 35,5 35,10 C35,15 30,20 25,20 C20,20 20,15 20,10 L35,10"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            </g>
          </svg>
        );

      case 3: // "Fluent in Animation"
        return (
          <svg
            ref={svgRef}
            viewBox="0 0 240 240"
            className={`woodcut-svg woodcut-animation ${
              position === "left" ? "woodcut-left" : "woodcut-right"
            }`}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
            }}
          >
            {/* Border frame inspired by Dürer's woodcuts */}
            <rect
              x="10"
              y="10"
              width="220"
              height="220"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="2"
              className="woodcut-frame"
            />

            {/* Background with Dürer-style landscape elements */}
            <g className="woodcut-landscape">
              <path
                d="M10,180 Q60,160 120,180 Q180,200 230,180 L230,230 L10,230 Z"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="0.5"
              />
              <path
                d="M20,190 L30,190 M40,195 L60,195 M70,200 L90,200 M100,205 L120,205 M130,200 L150,200 M160,195 L180,195 M190,190 L210,190"
                stroke="#e5e7eb"
                strokeWidth="0.5"
              />
            </g>

            {/* Four Horsemen-inspired wave formation */}
            <path
              d="M30,100 Q60,60 90,100 Q120,140 150,100 Q180,60 210,100"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="2.5"
              className="woodcut-wave-animation"
            />

            {/* Hatching for dynamic flow like Dürer's woodcuts */}
            <g className="woodcut-dynamic-hatching">
              <path
                d="M35,90 L45,110 M45,85 L55,105 M55,80 L65,100 M65,75 L75,95 M75,70 L85,90"
                stroke="#e5e7eb"
                strokeWidth="0.5"
              />
              <path
                d="M100,120 L110,140 M110,125 L120,145 M120,130 L130,150 M130,125 L140,145 M140,120 L150,140"
                stroke="#e5e7eb"
                strokeWidth="0.5"
              />
              <path
                d="M160,75 L170,95 M170,70 L180,90 M180,65 L190,85 M190,60 L200,80 M200,60 L210,80"
                stroke="#e5e7eb"
                strokeWidth="0.5"
              />
            </g>

            {/* Cross-directional hatching */}
            <g className="woodcut-cross-hatching">
              <path
                d="M40,100 L60,80 M50,110 L70,90 M60,120 L80,100 M70,130 L90,110"
                stroke="#e5e7eb"
                strokeWidth="0.5"
              />
              <path
                d="M110,80 L130,60 M120,90 L140,70 M130,100 L150,80 M140,110 L160,90"
                stroke="#e5e7eb"
                strokeWidth="0.5"
              />
              <path
                d="M170,100 L190,80 M180,110 L200,90 M190,120 L210,100"
                stroke="#e5e7eb"
                strokeWidth="0.5"
              />
            </g>

            {/* Secondary wave elements with varying stroke widths */}
            <path
              d="M30,130 Q60,100 90,130 Q120,160 150,130 Q180,100 210,130"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1.5"
              strokeDasharray="4,2"
              className="woodcut-wave-animation-delay"
            />
            <path
              d="M30,70 Q60,40 90,70 Q120,100 150,70 Q180,40 210,70"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="3,3"
              className="woodcut-wave-animation-delay-more"
            />

            {/* Circular elements like in Dürer's horsemen */}
            <circle
              cx="60"
              cy="60"
              r="6"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
              className="woodcut-particle-1"
            />
            <circle
              cx="100"
              cy="100"
              r="8"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
              className="woodcut-particle-2"
            />
            <circle
              cx="140"
              cy="80"
              r="7"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
              className="woodcut-particle-3"
            />
            <circle
              cx="90"
              cy="130"
              r="5"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
              className="woodcut-particle-4"
            />

            {/* Inner circle details like Dürer's intricate patterns */}
            <path
              d="M57,60 L63,60 M60,57 L60,63"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="woodcut-particle-detail"
            />
            <path
              d="M97,100 L103,100 M100,97 L100,103"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="woodcut-particle-detail"
            />
            <path
              d="M137,80 L143,80 M140,77 L140,83"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="woodcut-particle-detail"
            />

            {/* Dürer-inspired cloud formations */}
            <path
              d="M20,30 C25,20 35,20 40,30 C45,40 35,50 25,45 C15,40 15,35 20,30 Z"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
              className="woodcut-cloud"
            />
            <path
              d="M180,35 C190,25 200,25 210,35 C215,45 205,55 195,50 C185,45 175,45 180,35 Z"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
              className="woodcut-cloud"
            />
          </svg>
        );

      case 4: // "Physical Copies also Available"
        return (
          <svg
            ref={svgRef}
            viewBox="0 0 240 240"
            className={`woodcut-svg woodcut-physical ${
              position === "left" ? "woodcut-left" : "woodcut-right"
            }`}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
            }}
          >
            {/* Border frame inspired by Dürer's woodcuts */}
            <rect
              x="10"
              y="10"
              width="220"
              height="220"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="2"
              className="woodcut-frame"
            />

            {/* Background with Dürer-style hatching */}
            <g className="woodcut-background-hatch float-opacity">
              <path
                d="M20,20 L40,20 M20,25 L50,25 M20,30 L60,30 M20,35 L70,35 M20,40 L80,40"
                stroke="#e5e7eb"
                strokeWidth="0.3"
                strokeOpacity="0.6"
                className="float-left"
              />
              <path
                d="M160,20 L220,20 M170,25 L220,25 M180,30 L220,30 M190,35 L220,35 M200,40 L220,40"
                stroke="#e5e7eb"
                strokeWidth="0.3"
                strokeOpacity="0.6"
                className="float-right"
              />
              <path
                d="M20,200 L40,200 M20,205 L50,205 M20,210 L60,210 M20,215 L70,215"
                stroke="#e5e7eb"
                strokeWidth="0.3"
                strokeOpacity="0.6"
                className="float-diagonal-small"
              />
              <path
                d="M160,200 L220,200 M170,205 L220,205 M180,210 L220,210 M190,215 L220,215"
                stroke="#e5e7eb"
                strokeWidth="0.3"
                strokeOpacity="0.6"
                className="float-diagonal-reverse-small"
              />
            </g>

            {/* Main shipping box */}
            <g className="shipping-box float-rotate">
              {/* Box bottom */}
              <rect
                x="50"
                y="90"
                width="140"
                height="100"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="2"
                className="box-bottom float-pulse-slow"
              />

              {/* Box front flap */}
              <path
                d="M50,90 L30,70 L170,70 L190,90"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1.5"
                className="box-front-flap float-up-down-small"
              />

              {/* Box side flaps */}
              <path
                d="M50,90 L30,70 L30,170 L50,190"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1.5"
                className="box-side-flap float-left-right-small"
              />
              <path
                d="M190,90 L170,70 L170,170 L190,190"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1.5"
                className="box-side-flap float-left-right-small-delay"
              />

              {/* Box inner details - cross hatching for depth */}
              <path
                d="M55,95 L65,95 M70,95 L80,95 M85,95 L95,95 M100,95 L110,95 M115,95 L125,95 M130,95 L140,95 M145,95 L155,95 M160,95 L170,95 M175,95 L185,95"
                stroke="#e5e7eb"
                strokeWidth="0.5"
                className="box-detail-lines float-opacity"
              />
              <path
                d="M55,105 L70,105 M80,105 L95,105 M105,105 L120,105 M130,105 L145,105 M155,105 L170,105 M175,105 L185,105"
                stroke="#e5e7eb"
                strokeWidth="0.5"
                className="box-detail-lines float-opacity-delay"
              />

              {/* Shipping label */}
              <rect
                x="60"
                y="110"
                width="50"
                height="30"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1"
                className="shipping-label float-pulse"
              />
              <path
                d="M65,115 L105,115 M65,125 L95,125 M65,135 L100,135"
                stroke="#e5e7eb"
                strokeWidth="0.75"
                className="label-text float-opacity"
              />
            </g>

            {/* Items in/around the box */}
            <g className="box-contents">
              {/* Resume/document stack */}
              <rect
                x="120"
                y="100"
                width="60"
                height="45"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1"
                className="resume-stack float-diagonal float-pulse-opacity"
              />
              <path
                d="M125,110 L175,110 M125,120 L175,120 M125,130 L175,130 M125,140 L160,140"
                stroke="#e5e7eb"
                strokeWidth="0.5"
                className="resume-lines float-opacity"
              />

              {/* Second document peeking out */}
              <rect
                x="125"
                y="95"
                width="60"
                height="10"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1"
                className="second-doc float-left float-pulse-opacity-delay"
              />
              <path
                d="M130,100 L180,100"
                stroke="#e5e7eb"
                strokeWidth="0.5"
                className="doc-line float-opacity"
              />

              {/* Business card */}
              <rect
                x="70"
                y="150"
                width="30"
                height="20"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1"
                className="business-card float-right float-pulse"
              />
              <path
                d="M75,155 L95,155 M75,160 L90,160 M75,165 L93,165"
                stroke="#e5e7eb"
                strokeWidth="0.5"
                className="card-text float-opacity"
              />

              {/* Portfolio book */}
              <path
                d="M115,150 L165,150 L165,175 L115,175 Z"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1.5"
                className="portfolio-book float-diagonal-reverse float-pulse-slow"
              />
              <path
                d="M140,150 L140,175"
                stroke="#e5e7eb"
                strokeWidth="1"
                className="book-spine float-up-down-small"
              />
              <path
                d="M120,155 L135,155 M120,160 L135,160 M120,165 L135,165 M120,170 L135,170"
                stroke="#e5e7eb"
                strokeWidth="0.5"
                className="book-pages-left float-opacity"
              />
              <path
                d="M145,155 L160,155 M145,160 L160,160 M145,165 L160,165 M145,170 L160,170"
                stroke="#e5e7eb"
                strokeWidth="0.5"
                className="book-pages-right float-opacity-delay"
              />
            </g>

            {/* Items outside the box */}
            <g className="outside-items">
              {/* Envelope */}
              <path
                d="M40,40 L90,40 L90,70 L40,70 Z"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1"
                className="envelope float-left float-pulse-slow"
              />
              <path
                d="M40,40 L65,55 L90,40"
                stroke="#e5e7eb"
                strokeWidth="0.75"
                className="envelope-flap float-up-down-small"
              />
              <path
                d="M45,50 L85,50 M45,60 L85,60"
                stroke="#e5e7eb"
                strokeWidth="0.5"
                className="envelope-details float-opacity"
              />

              {/* Postage stamp */}
              <rect
                x="75"
                y="45"
                width="10"
                height="10"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="0.5"
                className="postage-stamp float-pulse"
              />
              <path
                d="M77,47 C77,47 78,46 80,47 C82,48 83,47 83,47 M77,49 C77,49 79,51 83,49 M77,51 C77,51 78,53 80,53 C82,53 83,51 83,51"
                stroke="#e5e7eb"
                strokeWidth="0.3"
                className="stamp-design float-pulse-opacity"
              />

              {/* Certificate/diploma */}
              <path
                d="M150,40 C145,38 145,38 145,45 L145,65 C145,72 145,72 150,70 L180,70 C185,72 185,72 185,65 L185,45 C185,38 185,38 180,40 Z"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1"
                className="certificate float-right float-pulse-slow"
              />
              <path
                d="M150,45 L180,45 M150,50 L180,50 M150,55 L170,55 M150,60 L175,60 M150,65 L165,65"
                stroke="#e5e7eb"
                strokeWidth="0.5"
                className="certificate-text float-opacity"
              />
              <circle
                cx="175"
                cy="62"
                r="5"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="0.5"
                className="certificate-seal float-rotate-slow"
              />
            </g>

            {/* Packing material */}
            <g className="packing-material">
              <path
                d="M55,180 C60,175 65,180 70,175 C75,180 80,175 85,180"
                stroke="#e5e7eb"
                strokeWidth="0.5"
                className="packing-paper float-up-down-small"
              />
              <path
                d="M175,180 C170,175 165,180 160,175 C155,180 150,175 145,180"
                stroke="#e5e7eb"
                strokeWidth="0.5"
                className="packing-paper float-up-down-small-delay"
              />
              <path
                d="M100,175 C105,170 110,175 115,175 C120,170 125,175"
                stroke="#e5e7eb"
                strokeWidth="0.5"
                className="packing-paper float-up-down-small"
              />
            </g>

            {/* Shipping/mailing elements */}
            <g className="shipping-elements">
              {/* Address tag */}
              <rect
                x="30"
                y="180"
                width="25"
                height="15"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="0.75"
                className="address-tag float-diagonal float-pulse"
              />
              <path
                d="M35,185 L50,185 M35,190 L45,190"
                stroke="#e5e7eb"
                strokeWidth="0.5"
                className="address-text float-opacity"
              />

              {/* Decorative string/twine */}
              <path
                d="M40,65 C45,50 120,40 130,65 C140,95 100,100 90,75 C85,60 105,55 120,70"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="0.5"
                className="twine float-pulse-slow"
              />
            </g>

            {/* Dürer-style decorative elements */}
            <g className="decorative-elements">
              <path
                d="M25,25 C30,20 40,20 45,25 C50,30 50,40 45,45 C40,50 35,50 30,45 C25,40 25,35 30,30 Z"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="0.75"
                className="decorative-corner float-rotate-slow"
              />
              <path
                d="M215,25 C210,20 200,20 195,25 C190,30 190,40 195,45 C200,50 210,50 215,45 C220,40 220,35 215,25 Z"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="0.75"
                className="decorative-corner float-rotate-reverse-slow"
              />
              <path
                d="M25,215 C30,220 40,220 45,215 C50,210 50,200 45,195 C40,190 35,190 30,195 C25,200 25,210 30,215 Z"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="0.75"
                className="decorative-corner float-rotate-slow"
              />
              <path
                d="M215,215 C210,220 200,220 195,215 C190,210 190,200 195,195 C200,190 210,190 215,195 C220,200 220,210 215,215 Z"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="0.75"
                className="decorative-corner float-rotate-reverse-slow"
              />
            </g>

            {/* Woodcut signature */}
            <g
              className="woodcut-signature"
              transform="translate(205, 215) scale(0.3)"
            >
              <path
                d="M0,20 L10,0 L20,20 M5,10 L15,10"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1"
              />
              <path
                d="M25,0 C30,0 35,5 35,10 C35,15 30,20 25,20 C20,20 20,15 20,10 L35,10"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            </g>
          </svg>
        );

      case 5: // "Sometimes Full Stack"
        return (
          <svg
            ref={svgRef}
            viewBox="0 0 240 240"
            className={`woodcut-svg woodcut-fullstack ${
              position === "left" ? "woodcut-left" : "woodcut-right"
            }`}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
            }}
          >
            {/* Border frame inspired by Dürer's woodcuts */}
            <rect
              x="10"
              y="10"
              width="220"
              height="220"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="2"
              className="woodcut-frame"
            />

            {/* Background with Dürer-style hatching */}
            <g className="woodcut-background-hatch float-opacity">
              <path
                d="M30,205 L210,205 M30,210 L210,210 M30,215 L210,215"
                stroke="#e5e7eb"
                strokeWidth="0.5"
                strokeOpacity="0.6"
              />
              <path
                d="M20,30 L20,200 M25,30 L25,200 M210,30 L210,200 M215,30 L215,200"
                stroke="#e5e7eb"
                strokeWidth="0.5"
                strokeOpacity="0.6"
              />
            </g>

            {/* Server tower like Dürer's architectural elements */}
            <rect
              x="70"
              y="40"
              width="100"
              height="160"
              rx="0"
              ry="0"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="2"
              className="woodcut-server-frame"
            />

            {/* Server components with Dürer's detailed linework */}
            <rect
              x="80"
              y="50"
              width="80"
              height="20"
              rx="0"
              ry="0"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1.5"
              className="woodcut-server woodcut-server-1"
            />
            <rect
              x="80"
              y="80"
              width="80"
              height="20"
              rx="0"
              ry="0"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1.5"
              className="woodcut-server woodcut-server-2"
            />
            <rect
              x="80"
              y="110"
              width="80"
              height="20"
              rx="0"
              ry="0"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1.5"
              className="woodcut-server woodcut-server-3"
            />
            <rect
              x="80"
              y="140"
              width="80"
              height="20"
              rx="0"
              ry="0"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1.5"
              className="woodcut-server woodcut-server-4"
            />
            <rect
              x="80"
              y="170"
              width="80"
              height="20"
              rx="0"
              ry="0"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1.5"
              className="woodcut-server woodcut-server-5"
            />

            {/* Server details in Dürer's crosshatching style */}
            <g className="woodcut-server-detail">
              <path
                d="M85,55 L95,55 M100,55 L110,55 M115,55 L125,55 M130,55 L140,55 M145,55"
                stroke="#e5e7eb"
                strokeWidth="0.75"
              />
              <path
                d="M85,60 L100,60 M105,60 L120,60 M125,60 L140,60"
                stroke="#e5e7eb"
                strokeWidth="0.75"
              />
              <path
                d="M85,85 L95,85 M100,85 M115,85 L125,85 M130,85 L140,85 M145,85 L155,85 M160,85 L170,85 M175,85 L185,85"
                stroke="#e5e7eb"
                strokeWidth="0.75"
              />
              <path
                d="M85,90 L100,90 M105,90 L120,90 M125,90 L140,90"
                stroke="#e5e7eb"
                strokeWidth="0.75"
              />
              <path
                d="M85,115 L95,115 M100,115 M115,115 L125,115 M130,115 L140,115 M145,115 L155,115 M160,115 L170,115 M175,115 L185,115"
                stroke="#e5e7eb"
                strokeWidth="0.75"
              />
              <path
                d="M85,120 L100,120 M105,120 L120,120 M125,120 L140,120"
                stroke="#e5e7eb"
                strokeWidth="0.75"
              />
              <path
                d="M85,145 L95,145 M100,145 L110,145 M115,145 L125,145 M130,145 L140,145 M145,145 L155,145 M160,145 L170,145 M175,145 L185,145"
                stroke="#e5e7eb"
                strokeWidth="0.75"
              />
              <path
                d="M85,150 L100,150 M105,150 L120,150 M125,150 L140,150 M145,150 L155,150 M160,150 L170,150 M175,150 L185,150"
                stroke="#e5e7eb"
                strokeWidth="0.75"
              />
            </g>

            {/* Connection lines in Dürer's detailed manner */}
            <path
              d="M50,60 L70,60 M50,90 L70,90 M50,120 L70,120 M50,150 L70,150 M50,180 L70,180"
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="2,2"
              className="woodcut-connection-left"
            />
            <path
              d="M170,60 L190,60 M170,90 L190,90 M170,120 L190,120 M170,150 L190,150 M170,180 L190,180"
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="2,2"
              className="woodcut-connection-right"
            />

            {/* Vertical connections between server units */}
            <path
              d="M90,70 L90,80 M110,70 L110,80 M130,70 L130,80 M150,70 L150,80"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              strokeDasharray="1,1"
              className="woodcut-connection woodcut-connection-1"
            />
            <path
              d="M90,100 L90,110 M110,100 L110,110 M130,100 L130,110 M150,100 L150,110"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              strokeDasharray="1,1"
              className="woodcut-connection woodcut-connection-2"
            />
            <path
              d="M90,130 L90,140 M110,130 L110,140 M130,130 L130,140 M150,130 L150,140"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              strokeDasharray="1,1"
              className="woodcut-connection woodcut-connection-3"
            />
            <path
              d="M90,160 L90,170 M110,160 L110,170 M130,160 L130,170 M150,160 L150,170"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              strokeDasharray="1,1"
              className="woodcut-connection woodcut-connection-4"
            />

            {/* Dürer-style decorative elements */}
            <path
              d="M40,40 C45,35 55,35 60,40 C65,45 65,55 60,60 C55,65 45,65 40,60 C35,55 35,45 40,40 Z"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
              className="woodcut-decorative-element"
            />
            <path
              d="M180,40 C185,35 195,35 200,40 C205,45 205,55 200,60 C195,65 185,65 180,60 C175,55 175,45 180,40 Z"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
              className="woodcut-decorative-element"
            />

            {/* Data packets with Dürer-style detailed work */}
            <circle
              cx="50"
              cy="60"
              r="3"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="woodcut-data-packet woodcut-data-packet-1"
            />
            <circle
              cx="190"
              cy="90"
              r="3"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="woodcut-data-packet woodcut-data-packet-2"
            />
            <circle
              cx="50"
              cy="120"
              r="3"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="woodcut-data-packet woodcut-data-packet-3"
            />
            <circle
              cx="190"
              cy="150"
              r="3"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="woodcut-data-packet woodcut-data-packet-4"
            />
            <circle
              cx="50"
              cy="180"
              r="3"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="woodcut-data-packet woodcut-data-packet-5"
            />

            {/* Cross marks inside circles like in Dürer's works */}
            <path
              d="M48,60 L52,60 M50,58 L50,62"
              stroke="#e5e7eb"
              strokeWidth="0.5"
            />
            <path
              d="M188,90 L192,90 M190,88 L190,92"
              stroke="#e5e7eb"
              strokeWidth="0.5"
            />
            <path
              d="M48,120 L52,120 M50,118 L50,122"
              stroke="#e5e7eb"
              strokeWidth="0.5"
            />
            <path
              d="M188,150 L192,150 M190,148 L190,152"
              stroke="#e5e7eb"
              strokeWidth="0.5"
            />
            <path
              d="M48,180 L52,180 M50,178 L50,182"
              stroke="#e5e7eb"
              strokeWidth="0.5"
            />
          </svg>
        );

      case 6: // "Intelligence alongside AI"
        return (
          <svg
            ref={svgRef}
            viewBox="0 0 240 240"
            className={`woodcut-svg woodcut-intelligence ${
              position === "left" ? "woodcut-left" : "woodcut-right"
            }`}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
            }}
          >
            {/* Border frame */}
            <rect
              x="20"
              y="20"
              width="200"
              height="200"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
              className="border-frame woodcut-path float-pulse-slow"
            />

            {/* Fine hatching in background */}
            <g className="woodcut-background-hatch float-opacity">
              <path
                d="M30,30 L50,30 M35,35 L55,35 M40,40 L60,40"
                stroke="#e5e7eb"
                strokeWidth="0.3"
                strokeOpacity="0.6"
                className="float-left"
              />
              <path
                d="M180,30 L200,30 M175,35 L195,35 M170,40 L190,40"
                stroke="#e5e7eb"
                strokeWidth="0.3"
                strokeOpacity="0.6"
                className="float-right"
              />
              <path
                d="M30,200 L50,200 M35,195 L55,195 M40,190 L60,190"
                stroke="#e5e7eb"
                strokeWidth="0.3"
                strokeOpacity="0.6"
                className="float-diagonal-small"
              />
              <path
                d="M180,200 L200,200 M175,195 L195,195 M170,190 L190,190"
                stroke="#e5e7eb"
                strokeWidth="0.3"
                strokeOpacity="0.6"
                className="float-diagonal-reverse-small"
              />
            </g>

            {/* Dividing line between human and AI */}
            <line
              x1="120"
              y1="30"
              x2="120"
              y2="210"
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="5,3"
              className="divider woodcut-path float-up-down-small"
            />

            {/* Human side - left */}
            <g className="human-side">
              {/* Human figure */}
              <circle
                cx="70"
                cy="70"
                r="20"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1.2"
                className="human-head woodcut-path float-diagonal-small"
              />
              <path
                d="M70,90 L70,130"
                stroke="#e5e7eb"
                strokeWidth="1"
                className="human-body woodcut-path float-up-down-small"
              />
              <path
                d="M50,110 L90,110"
                stroke="#e5e7eb"
                strokeWidth="1"
                className="human-arms woodcut-path float-rotate-slow"
              />
              <path
                d="M70,130 L60,160"
                stroke="#e5e7eb"
                strokeWidth="1"
                className="human-leg woodcut-path float-diagonal-reverse-small"
              />
              <path
                d="M70,130 L80,160"
                stroke="#e5e7eb"
                strokeWidth="1"
                className="human-leg woodcut-path float-diagonal-small"
              />

              {/* Facial features with abstract patterns */}
              <path
                d="M60,70 L80,70 M65,65 L75,65 M65,75 L75,75"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="0.75"
                className="head-detail woodcut-path float-pulse-opacity"
              />

              <path
                d="M60,60 L80,60 M60,80 L80,80"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="0.5"
                className="head-pattern woodcut-path float-opacity"
              />
            </g>

            {/* Human brain elements */}
            <circle
              cx="70"
              cy="70"
              r="12"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="brain-outline woodcut-path float-pulse-slow"
            />
            <path
              d="M65,70 C65,65 75,65 75,70 C75,75 65,75 65,70"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="brain-fold woodcut-path float-left"
            />
            <path
              d="M70,65 C65,65 65,75 70,75 C75,75 75,65 70,65"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="brain-fold woodcut-path float-right"
            />

            {/* Book/knowledge */}
            <path
              d="M40,110 L55,100 L55,125 L40,135 Z"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
              className="book woodcut-path float-right"
            />
            <path
              d="M55,100 L70,110 L70,135 L55,125 Z"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
              className="book woodcut-path float-left"
            />
            <path
              d="M42,115 L53,105 M42,125 L53,115"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="book-lines woodcut-path float-pulse-opacity"
            />

            {/* Coffee mug */}
            <path
              d="M30,150 C30,145 35,145 35,150 L35,160 C25,160 25,160 30,160 Z"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="mug woodcut-path float-up-down-small"
            />
            <path
              d="M35,150 L40,150 L40,155 L38,160"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="mug-handle woodcut-path float-diagonal-small"
            />

            {/* Human work/creation */}
            <rect
              x="45"
              y="150"
              width="30"
              height="40"
              rx="2"
              ry="2"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.8"
              className="canvas woodcut-path float-up-down-small"
            />
            <path
              d="M50,160 L70,160 M50,170 L70,170 M50,180 L70,180"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="canvas-detail woodcut-path float-diagonal-reverse-small"
            />
            <path
              d="M55,155 C60,165 65,155 70,165"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="art-line woodcut-path float-pulse-opacity"
            />

            {/* Art palette */}
            <path
              d="M95,105 C100,100 105,105 105,110 C105,115 100,120 95,115 C90,110 90,110 95,105 Z"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="art-palette woodcut-path float-rotate-slow"
            />
            <path
              d="M95,108 L97,110 M100,113 L102,111"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="palette-detail woodcut-path float-opacity"
            />

            {/* Additional human tools - pencil */}
            <path
              d="M30,140 L45,130 M45,130 L48,133"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="pencil woodcut-path float-diagonal-small"
            />

            {/* Music note - humanistic element */}
            <path
              d="M40,80 C37,83 35,85 35,88 C35,92 40,92 40,88 L40,75"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="music-note woodcut-path float-up-down-small"
            />
            <path
              d="M40,75 L45,73"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="note-flag woodcut-path float-diagonal-small"
            />

            {/* Thought connections from human */}
            <path
              d="M85,50 C95,40 105,45 110,55"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              strokeDasharray="2,2"
              className="thought-connection woodcut-path float-up-down-small"
            />
            <path
              d="M85,70 C95,70 105,70 115,70"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              strokeDasharray="2,2"
              className="thought-connection woodcut-path float-right"
            />
            <path
              d="M85,90 C95,100 105,95 110,85"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              strokeDasharray="2,2"
              className="thought-connection woodcut-path float-left"
            />

            {/* AI side - right */}
            {/* Computer/AI representation */}
            <rect
              x="160"
              y="50"
              width="40"
              height="60"
              rx="5"
              ry="5"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1.2"
              className="ai-processor woodcut-path float-pulse-opacity"
            />

            {/* Base of computer */}
            <rect
              x="145"
              y="105"
              width="30"
              height="10"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1.5"
              className="computer-base woodcut-path float-right"
            />

            {/* Keyboard */}
            <rect
              x="140"
              y="125"
              width="40"
              height="15"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
              className="keyboard woodcut-path float-up-down-small"
            />
            <path
              d="M145,130 L175,130 M145,135 L175,135"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="keyboard-keys woodcut-path float-pulse-opacity"
            />
            <path
              d="M150,130 L150,135 M155,130 L155,135 M160,130 L160,135 M165,130 L165,135 M170,130 L170,135"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="keyboard-keys-vertical woodcut-path float-pulse-opacity-delay"
            />

            {/* Screen content - circuit pattern */}
            <path
              d="M165,60 L195,60 M165,70 L185,70 M175,60 L175,80"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="circuit-pattern woodcut-path float-left"
            />
            <path
              d="M165,80 L175,80 M175,80 L175,90 M175,90 L185,90"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="circuit-pattern-2 woodcut-path float-right"
            />
            <circle
              cx="160"
              cy="85"
              r="3"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="circuit-node woodcut-path float-pulse-opacity"
            />
            <circle
              cx="150"
              cy="95"
              r="3"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="circuit-node woodcut-path float-pulse-opacity-delay"
            />
            <path
              d="M150,95 L160,85"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="circuit-connection woodcut-path float-pulse-opacity"
            />

            {/* Neural network nodes */}
            <circle
              cx="150"
              cy="50"
              r="5"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.8"
              className="network-node woodcut-node-1"
            />
            <circle
              cx="180"
              cy="40"
              r="5"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.8"
              className="network-node woodcut-node-2"
            />
            <circle
              cx="210"
              cy="60"
              r="5"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.8"
              className="network-node woodcut-node-3"
            />
            <circle
              cx="150"
              cy="100"
              r="5"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.8"
              className="network-node woodcut-node-4"
            />
            <circle
              cx="180"
              cy="120"
              r="5"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.8"
              className="network-node woodcut-node-5"
            />
            <circle
              cx="210"
              cy="90"
              r="5"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.8"
              className="network-node woodcut-node-6"
            />

            {/* Neural connections */}
            <line
              x1="150"
              y1="50"
              x2="180"
              y2="40"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="network-connection woodcut-path float-pulse-opacity"
            />
            <line
              x1="180"
              y1="40"
              x2="210"
              y2="60"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="network-connection woodcut-path float-pulse-opacity-delay"
            />
            <line
              x1="150"
              y1="50"
              x2="150"
              y2="100"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="network-connection woodcut-path float-up-down-small"
            />
            <line
              x1="180"
              y1="40"
              x2="180"
              y2="120"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="network-connection woodcut-path float-right"
            />
            <line
              x1="210"
              y1="60"
              x2="210"
              y2="90"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="network-connection woodcut-path float-left"
            />
            <line
              x1="150"
              y1="100"
              x2="180"
              y2="120"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="network-connection woodcut-path float-diagonal-small"
            />
            <line
              x1="180"
              y1="120"
              x2="210"
              y2="90"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="network-connection woodcut-path float-diagonal-reverse-small"
            />

            {/* Data visualization */}
            <rect
              x="145"
              y="150"
              width="30"
              height="20"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
              className="data-viz woodcut-path float-left-right-small"
            />
            <path
              d="M150,155 L150,165 M155,160 L155,165 M160,157 L160,165 M165,153 L165,165 M170,159 L170,165"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="data-bars woodcut-path float-up-down-small"
            />

            {/* Server */}
            <rect
              x="185"
              y="75"
              width="20"
              height="40"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="server woodcut-path float-pulse-slow"
            />
            <path
              d="M187,80 L203,80 M187,85 L203,85 M187,90 L203,90 M187,95 L203,95 M187,100 L203,100 M187,105 L203,105"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="server-detail woodcut-path float-pulse-opacity"
            />

            {/* Microchip */}
            <rect
              x="185"
              y="150"
              width="15"
              height="15"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="microchip woodcut-path float-up-down-small"
            />
            <path
              d="M187,153 L198,153 M187,157 L198,157 M187,161 L198,161"
              stroke="#e5e7eb"
              strokeWidth="0.4"
              className="chip-circuits woodcut-path float-right"
            />
            <path
              d="M200,153 L205,153 M200,157 L205,157 M200,161 L205,161"
              stroke="#e5e7eb"
              strokeWidth="0.3"
              className="chip-pins woodcut-path float-left"
            />

            {/* Binary code */}
            <path
              d="M190,120 L195,120 M190,125 L195,125 M200,120 L205,120 M200,130 L205,130 M190,135 L195,135 M200,135 L205,135"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="binary-code woodcut-path float-opacity"
            />

            {/* Circuit patterns */}
            <path
              d="M130,150 L145,150 L145,165 L160,165 L160,180 L175,180 L175,195 L190,195"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="circuit-path woodcut-circuit"
            />
            <path
              d="M130,170 L140,170 L140,180 L150,180 L150,190 L160,190 L160,200 L170,200"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="circuit-path woodcut-path float-diagonal-small"
            />

            {/* Connection between human and AI */}
            <path
              d="M90,80 L140,80 M90,90 L140,90 M90,100 L140,100"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              strokeDasharray="3,2"
              className="connections woodcut-path float-pulse-opacity"
            />

            {/* Solution/output at bottom center */}
            <rect
              x="95"
              y="175"
              width="50"
              height="25"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
              className="solution woodcut-path float-up-down-small"
            />
            <path
              d="M100,185 L140,185 M100,195 L140,195"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="solution-lines woodcut-path float-opacity"
            />

            {/* Connecting lines to solution */}
            <path
              d="M70,150 C70,165 85,175 95,175"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="human-connection woodcut-path float-pulse-opacity"
            />
            <path
              d="M160,150 C160,165 145,175 145,175"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="ai-connection woodcut-path float-pulse-opacity-delay"
            />

            {/* Document with combined output */}
            <path
              d="M95,200 L120,190 L145,200"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="output-doc woodcut-path float-up-down-small"
            />
            <path
              d="M100,205 L120,195 L140,205"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="output-doc woodcut-path float-up-down-small-delay"
            />

            {/* Stars of insight */}
            <path
              d="M70,50 L70,40 L72,47 L65,44 L75,44 L68,47 Z"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="insight-star woodcut-path float-pulse-opacity"
            />
            <path
              d="M160,50 L160,40 L162,47 L155,44 L165,44 L158,47 Z"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="insight-star woodcut-path float-pulse-opacity-delay"
            />
            <path
              d="M110,65 L110,55 L112,62 L105,59 L115,59 L108,62 Z"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="insight-star woodcut-path float-pulse-opacity"
            />
            <path
              d="M130,65 L130,55 L132,62 L125,59 L135,59 L128,62 Z"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="insight-star woodcut-path float-pulse-opacity-delay"
            />

            {/* Flourish details */}
            <path
              d="M30,30 C35,35 40,30 45,35"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="flourish woodcut-path float-diagonal-small"
            />
            <path
              d="M210,30 C205,35 200,30 195,35"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="flourish woodcut-path float-diagonal-reverse-small"
            />
            <path
              d="M30,210 C35,205 40,210 45,205"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="flourish woodcut-path float-right"
            />
            <path
              d="M210,210 C205,205 200,210 195,205"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.75"
              className="flourish woodcut-path float-left"
            />

            {/* Celestial elements */}
            <path
              d="M30,55 C33,50 37,50 40,55 C43,60 37,65 33,63 C29,60 27,60 30,55 Z"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="celestial-cloud woodcut-path float-rotate-slow"
            />
            <path
              d="M190,55 C193,50 197,50 200,55 C203,60 197,65 193,63 C189,60 187,60 190,55 Z"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              className="celestial-cloud woodcut-path float-rotate-reverse-slow"
            />

            {/* Dürer monogram subtly placed in corner */}
            <g
              className="woodcut-signature"
              transform="translate(205, 205) scale(0.3)"
            >
              <path
                d="M0,20 L10,0 L20,20 M5,10 L15,10"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1"
                className="float-diagonal-small"
              />
              <path
                d="M25,0 C30,0 35,5 35,10 C35,15 30,20 25,20 C20,20 20,15 20,10 L35,10"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1"
                className="float-diagonal-reverse-small"
              />
            </g>
          </svg>
        );

      case 7: // Fallback illustration for any extra cards
        return null;

      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`${
        position === "left"
          ? "woodcut-left-container"
          : "woodcut-right-container"
      }`}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: position === "left" ? "0 0 0 0" : "0 0 0 0",
      }}
      onMouseEnter={restartAnimations}
    >
      <div
        style={{
          borderRadius: "1rem",
          border: "1px solid #e5e7eb",
          backgroundColor: "rgba(229, 231, 235, 0.05)",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {renderIllustration()}
      </div>
    </div>
  );
}

export default WoodcutIllustration;
