import { useEffect, useRef, useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

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
        title: "Modern Web Application",
        description:
            "A responsive web app built with React and Node.js, featuring real-time data updates and a sleek user interface.",
        images: colorVariants.map(generatePlaceholderSvg),
    },
    {
        id: 2,
        title: "E-commerce Platform",
        description:
            "A full-featured online store with secure payments, inventory management, and a customizable product catalog.",
        images: colorVariants.map(generatePlaceholderSvg),
    },
    {
        id: 3,
        title: "Mobile Fitness App",
        description:
            "An iOS and Android app that helps users track workouts, set goals, and connect with fitness communities.",
        images: colorVariants.map(generatePlaceholderSvg),
    },
    {
        id: 4,
        title: "Data Visualization Dashboard",
        description:
            "An interactive dashboard that transforms complex data sets into clear, actionable insights using D3.js.",
        images: colorVariants.map(generatePlaceholderSvg),
    },
    {
        id: 5,
        title: "AI-Powered Chatbot",
        description:
            "A sophisticated chatbot leveraging natural language processing to provide customer support and engagement.",
        images: colorVariants.map(generatePlaceholderSvg),
    },
];

function Card(
    { data, onImageClick, onHeightChange }: {
        data: CardData;
        onImageClick: (image: string) => void;
        onHeightChange: (height: number) => void;
    },
) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cardRef.current) {
            onHeightChange(cardRef.current.offsetHeight);
        }
    }, [data]);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            (prevIndex + 1) % data.images.length
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            (prevIndex - 1 + data.images.length) % data.images.length
        );
    };

    return (
        <div ref={cardRef} className="p-4 my-4">
            <div class="border border-gray-300 rounded-lg p-4 bg-gray-200">
                <h2 className="text-2xl mb-2">{data.title}</h2>
                <p className="mb-4">{data.description}</p>
                <div className="relative overflow-hidden h-50">
                    <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{
                            transform: `translateX(-${
                                currentImageIndex * 100
                            }%)`,
                        }}
                    >
                        {data.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`${data.title} - Image ${index + 1}`}
                                className="w-full h-50 flex-shrink-0 object-cover cursor-pointer"
                                onClick={() => onImageClick(image)}
                            />
                        ))}
                    </div>
                    <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl cursor-pointer"
                    >
                        ←
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl cursor-pointer"
                    >
                        →
                    </button>
                </div>
            </div>
        </div>
    );
}

function Lightbox({ image, onClose }: { image: string; onClose: () => void }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

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

export default function PortfolioCards() {
    const [cards, setCards] = useState<CardData[]>(initialCards);
    const [cardHeights, setCardHeights] = useState<number[]>([]);
    const [visibleRange, setVisibleRange] = useState({ start: 0, end: 10 });
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const BUFFER_REM = 5; // Buffer of 5rem
    const BUFFER_PX = BUFFER_REM * 16; // Assuming 1rem = 16px

    useEffect(() => {
        if (!IS_BROWSER) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        loadMoreCards();
                    }
                });
            },
            { threshold: 0.1 },
        );

        const lastCard = containerRef.current?.lastElementChild;
        if (lastCard) observer.observe(lastCard);

        return () => observer.disconnect();
    }, [cards]);

    const loadMoreCards = () => {
        const newCards = [...cards];
        for (let i = 0; i < 5; i++) {
            const nextCard = initialCards[i % initialCards.length];
            newCards.push({ ...nextCard, id: cards.length + i + 1 });
        }
        setCards(newCards);
    };

    const handleScroll = () => {
        if (!containerRef.current) return;
        const { scrollTop, clientHeight } = containerRef.current;

        let accumulatedHeight = 0;
        let startIndex = 0;
        let endIndex = 0;

        // Find the start index
        for (let i = 0; i < cardHeights.length; i++) {
            if (accumulatedHeight + cardHeights[i] > scrollTop - BUFFER_PX) {
                startIndex = i;
                break;
            }
            accumulatedHeight += cardHeights[i];
        }

        // Find the end index
        accumulatedHeight = 0;
        for (let i = 0; i < cardHeights.length; i++) {
            accumulatedHeight += cardHeights[i];
            if (accumulatedHeight > scrollTop + clientHeight + BUFFER_PX) {
                endIndex = i;
                break;
            }
        }

        // Ensure we always render at least one card more than visible
        endIndex = Math.min(
            cardHeights.length - 1,
            Math.max(endIndex, startIndex + 1),
        );

        setVisibleRange({ start: startIndex, end: endIndex + 1 });
    };

    const handleImageClick = (image: string) => {
        setLightboxImage(image);
    };

    const closeLightbox = () => {
        setLightboxImage(null);
    };

    const handleCardHeightChange = (index: number, height: number) => {
        setCardHeights((prevHeights) => {
            const newHeights = [...prevHeights];
            newHeights[index] = height;
            return newHeights;
        });
    };

    const getTotalHeight = () =>
        cardHeights.reduce((sum, height) => sum + height, 0);

    return (
        <>
            <div
                ref={containerRef}
                onScroll={handleScroll}
                className="w-full h-[70vh] min-h-40 overflow-y-auto border border-gray-300 rounded-lg"
            >
                <div
                    className="relative"
                    style={{ height: `${getTotalHeight()}px` }}
                >
                    {cards.slice(visibleRange.start, visibleRange.end).map(
                        (card, index) => {
                            const actualIndex = visibleRange.start + index;
                            const topOffset = cardHeights.slice(0, actualIndex)
                                .reduce((sum, height) => sum + height, 0);
                            return (
                                <div
                                    key={card.id}
                                    className="absolute left-0 right-0"
                                    style={{ top: `${topOffset}px` }}
                                >
                                    <Card
                                        data={card}
                                        onImageClick={handleImageClick}
                                        onHeightChange={(height) =>
                                            handleCardHeightChange(
                                                actualIndex,
                                                height,
                                            )}
                                    />
                                </div>
                            );
                        },
                    )}
                </div>
            </div>
            {lightboxImage && (
                <Lightbox image={lightboxImage} onClose={closeLightbox} />
            )}
        </>
    );
}
