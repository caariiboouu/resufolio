import { useState } from "preact/hooks";
import WoodcutIllustration from "./WoodcutIllustrations.tsx";

interface CardData {
    id: number;
    title: string;
    description: string;
    images: string[];
}

const colorVariants = [
    { bg: "#f0f0f0", shape: "#d0d0d0", circle: "#a0a0a0", text: "#808080" },
    { bg: "#ffe4e1", shape: "#ffa07a", circle: "#ff6347", text: "#8b4513" },
    { bg: "#e0ffff", shape: "#87cefa", circle: "#4169e1", text: "#191970" },
    { bg: "#f0fff0", shape: "#90ee90", circle: "#32cd32", text: "#006400" },
    { bg: "#fff0f5", shape: "#dda0dd", circle: "#ba55d3", text: "#4b0082" },
];

function generatePlaceholderSvg(colorVariant: typeof colorVariants[number]) {
    const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
      <rect width="300" height="200" fill="${colorVariant.bg}"/>
      <path d="M75 100 L150 25 L225 100 L150 175 Z" fill="${colorVariant.shape}"/>
      <circle cx="100" cy="75" r="15" fill="${colorVariant.circle}"/>
      <text x="150" y="110" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="${colorVariant.text}">300 x 200</text>
    </svg>
  `;

    return `data:image/svg+xml,${encodeURIComponent(svgContent.trim())}`;
}

const initialCards: CardData[] = [
    {
        id: 1,
        title: "Hi,",
        description:
            "I'm a developer and designer living in Tulsa. In my work I operate on a principle that functionally useful things should look as good as they work, and that good looking things should be entirely functional.",
        images: colorVariants.map(generatePlaceholderSvg),
    },
    {
        id: 2,
        title: "Interfaces, Interfaces, & Interfaces",
        description:
            "Currently I'm building SPA and SSR sites with React, Angular, React Native, Vue, Preact, HTMX, and continuing to expand the tools I work with. I'm not sure I'm really tied to a specific framework or stack currently, honing the skill of picking the appropriate stack for the job seems most important rather than being locked into a specific framework.",
        images: colorVariants.map(generatePlaceholderSvg),
    },
    {
        id: 3,
        title: "Fluent in Animation",
        description:
            "It's sort of a niche skill, but when applicable and useful it's quite valuable. Also very fun to work on. Be it complex css transforms, detailed SVGs changing state, or producing video designed to be embedded on sites. I've even produced <a href='https://www.youtube.com/watch?v=n2ru5WyMzLk' target='_blank' rel='noopener noreferrer'>motion graphics for advertisement</a>.",
        images: colorVariants.map(generatePlaceholderSvg),
    },
    {
        id: 4,
        title: "Physical Copies also Available",
        description:
            "Outside of websites and other digital media, I have time designing and producing print media. I've used Photoshop since version 7.0 and it has a fond place in my heart. Many designers in this field use vector applications like Illustrator but I found that being able to play with complex rasterized textures first, and vector shapes as a secondary priority allowed for interesting designs when it came to processes like screenprinting. It also honed my skills in digital asset preparation. You might be surpised at how many fuzzy images on high DPI screens go unnoticed through review in to production.",
        images: colorVariants.map(generatePlaceholderSvg),
    },
    {
        id: 5,
        title: "Sometimes Full Stack",
        description:
            "I've managed sites, servers, databases, and backend code professionally, at a peak of about 30 website servers for an agency. (Usually Ubuntu, MySQL, and PHP) Visiting this world from time to time is fun and good infrastructure is rewarding to architect.",
        images: colorVariants.map(generatePlaceholderSvg),
    },
    {
        id: 6,
        title: "Intelligence alongside AI",
        description:
            "AI is fantastic for gathering and interpereting large amounts of information. I brought a client's site from 20 second page load times down to 1 second loads by using AI to generate tests and rewrite database queries.",
        images: colorVariants.map(generatePlaceholderSvg),
    },
];

function Lightbox({ image, onClose }: { image: string; onClose: () => void }) {
    const [isVisible, setIsVisible] = useState(false);

    useState(() => {
        setIsVisible(true);
        return () => {
            setIsVisible(false);
        };
    });

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 transition-colors duration-300 ease-in-out ${
                isVisible ? "bg-black bg-opacity-80" : "bg-transparent"
            }`}
            onClick={handleClose}
        >
            <img
                src={image}
                alt="Fullscreen view"
                className={`max-w-[90%] max-h-[90%] object-contain transition-all duration-300 ease-in-out ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
            />
        </div>
    );
}

function parseDescription(description: string) {
    if (!description.includes("<a")) {
        return description;
    }

    const parts = [];
    let currentText = "";
    let inTag = false;
    let currentTag = "";
    let i = 0;

    while (i < description.length) {
        if (description.substring(i, i + 2) === "<a" && !inTag) {
            if (currentText) {
                parts.push(currentText);
                currentText = "";
            }
            inTag = true;
            currentTag = "<a";
            i += 2;
        } else if (description.substring(i, i + 4) === "</a>" && inTag) {
            currentTag += "</a>";
            parts.push(currentTag);
            currentTag = "";
            inTag = false;
            i += 4;
        } else {
            if (inTag) {
                currentTag += description[i];
            } else {
                currentText += description[i];
            }
            i++;
        }
    }

    if (currentText) {
        parts.push(currentText);
    }

    return parts.map((part, index) => {
        if (part.startsWith("<a") && part.endsWith("</a>")) {
            // Parse the href and text from the anchor tag
            const hrefMatch = part.match(/href=['"]([^'"]+)['"]/);
            const href = hrefMatch ? hrefMatch[1] : "#";
            
            const targetMatch = part.match(/target=['"]([^'"]+)['"]/);
            const target = targetMatch ? targetMatch[1] : "";
            
            const relMatch = part.match(/rel=['"]([^'"]+)['"]/);
            const rel = relMatch ? relMatch[1] : "";
            
            // Extract the link text
            const textMatch = part.match(/>([^<]+)</);
            const text = textMatch ? textMatch[1] : "Link";
            
            return (
                <a 
                    key={index} 
                    href={href} 
                    target={target || undefined} 
                    rel={rel || undefined}
                    className="text-[#54ac9b] hover:text-[#32564f] underline transition-colors"
                >
                    {text}
                </a>
            );
        }
        return part;
    });
}

export default function PortfolioCards() {
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    const handleImageClick = (image: string) => {
        setLightboxImage(image);
    };

    const closeLightbox = () => {
        setLightboxImage(null);
    };

    return (
        <>
            <div className="space-y-8">
                {initialCards.map((card, index) => (
                    <div 
                        key={card.id} 
                        className="group relative overflow-hidden transition-all duration-300 ease-in-out 
                                hover:transform hover:scale-[1.01] hover:shadow-lg card-hover rounded-lg"
                    >
                        <div className="border border-[#232323] rounded-lg p-4 sm:p-6 
                                      bg-gradient-to-br from-[#1a1a1a] via-[#232323] to-[#1a1a1a]
                                      shadow-md backdrop-blur-sm gradient-animate gradient-border
                                      noise-texture">
                            <div className="relative z-10 card-content">
                                <div className="flex flex-wrap lg:min-h-[240px]">
                                    {index % 2 === 0 ? (
                                        <>
                                            {/* Content on left for even cards */}
                                            <div className="w-full lg:w-2/3 pr-0 lg:pr-4 relative z-10 flex items-center py-4 lg:py-0">
                                                <div>
                                                    <h2 className="text-xl sm:text-2xl font-bold mb-3 
                                                                bg-clip-text text-transparent 
                                                                bg-gradient-to-r from-[#E7DECA] via-[#d4c5a7] to-[#c4b69d]
                                                                text-glow">
                                                        {card.title}
                                                    </h2>
                                                    <p className="text-[#E7DECA] text-sm sm:text-base leading-relaxed opacity-90 
                                                                transition-all duration-300 group-hover:opacity-100">
                                                        {parseDescription(card.description)}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            {/* Illustration on right for even cards */}
                                            <div className="w-full lg:w-1/3 flex justify-center lg:justify-end items-center">
                                                <WoodcutIllustration 
                                                    cardId={card.id} 
                                                    position="right" 
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {/* Illustration on left for odd cards */}
                                            <div className="w-full lg:w-1/3 flex justify-center lg:justify-start items-center order-2 lg:order-1">
                                                <WoodcutIllustration 
                                                    cardId={card.id} 
                                                    position="left" 
                                                />
                                            </div>
                                            
                                            {/* Content on right for odd cards */}
                                            <div className="w-full lg:w-2/3 pl-0 lg:pl-4 relative z-10 order-1 lg:order-2 flex items-center py-4 lg:py-0">
                                                <div>
                                                    <h2 className="text-xl sm:text-2xl font-bold mb-3 
                                                                bg-clip-text text-transparent 
                                                                bg-gradient-to-r from-[#E7DECA] via-[#d4c5a7] to-[#c4b69d]
                                                                text-glow">
                                                        {card.title}
                                                    </h2>
                                                    <p className="text-[#E7DECA] text-sm sm:text-base leading-relaxed opacity-90 
                                                                transition-all duration-300 group-hover:opacity-100">
                                                        {parseDescription(card.description)}
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {lightboxImage && (
                <Lightbox 
                    image={lightboxImage} 
                    onClose={closeLightbox} 
                />
            )}
        </>
    );
}
  