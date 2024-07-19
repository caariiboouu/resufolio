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
        title: "Things that I do Professionally",
        description:
            "Hi, I'm Joel. This is a walkthrough of my experience and my thoughts on topics relevant to design and development work. A little background: I got my first exposure to tinkering with websites during a design internship; they had me coming in to cut out large quantities of photos in Photoshop. One day I was tasked with opening Dreamweaver and bolding and italicizing website copy to make it more interesting. I continued to work my way through a few companies to the point that I started doing building site themes from scratch on CMS systems, using responsive-first frameworks in a time that creating separate mobile variants of websites was a thing. As I've built up my career, I've found that straddling both creative and technical disiplines is quite rewarding in my career path and the work I produce.",
        images: colorVariants.map(generatePlaceholderSvg),
    },
    {
        id: 1,
        title: "Interfaces, Interfaces, & Interfaces",
        description:
            "Currently I'm building SPA and SSR sites with React, Angular, React Native, Vue, Preact, and continuing to expand the tools I work with. I've been dabbling in building an app in Flutter and Firebase. Also on my list is to get some time with HTMX and controlling state on the backend. I'm not sure I'm really tied to a specific framework or stack currently, honing the skill of picking the appropriate stack for the job seems most significant, and a philosophy of simple implementations of Functional Programming is one of my most interested areas of focus.",
        images: colorVariants.map(generatePlaceholderSvg),
    },
    {
        id: 2,
        title: "Fluent in Animation",
        description:
            "It's sort of a niche skill, but when applicable and useful it's quite valuable. Also very fun to work on. Be it complex css transforms, detailed SVGs changing state, or producing video designed to be embedded on sites. I've even produced <a href='https://www.youtube.com/watch?v=n2ru5WyMzLk' target='_blank' rel='noopener noreferrer'>motion graphics for advertisement</a>.",
        images: colorVariants.map(generatePlaceholderSvg),
    },
    {
        id: 3,
        title: "Physical Copies also Available",
        description:
            "Outside of websites and other digital media, I have time designing and producing print media. I've used Photoshop since version 7.0 and it has a fond place in my heart. Many designers in this field use vector applications like Illustrator but I found that being able to play with complex rasterized textures first, and vector shapes as a secondary priority allowed for interesting designs when it came to processes like screenprinting. It also honed my skills in digital asset preparation. You might be surpised at how many fuzzy images on high DPI screens go unnoticed through review in to production.",
        images: colorVariants.map(generatePlaceholderSvg),
    },
    {
        id: 4,
        title: "Sometimes Full Stack",
        description:
            "I manage my own sites, servers, databases, and backend code on personal projects. I've also done this at scale professionally, managing about 30 sites for an agency, all on a stack of servers and software I maintained. (Usually Ubuntu, MySQL, and PHP) Visiting this world from time to time is fun and good infrastructure is rewarding to architect.",
        images: colorVariants.map(generatePlaceholderSvg),
    },
    {
        id: 5,
        title: "Intelligence alongside AI",
        description:
            "I'm currently a fan of Claude 3.5 Sonnet. I treat it kind of like a faster version of Googling for Stackoverflow answers, along with carrying out tedious tasks that are akin to data entry. Just like any tool, there's wrong and right ways to use them. I'm starting to see a lot of value in pricipaled use. (That is, not just hoping that it will churn out your work for you that you don't understand.)",
        images: colorVariants.map(generatePlaceholderSvg),
    },
];

function Card(
    { data, onImageClick }: {
        data: CardData;
        onImageClick: (image: string) => void;
    },
) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
        <div className="p-4 my-4">
            <div class="border border-[#232323] rounded-lg p-4">
                <h2 className="text-2xl mb-2">{data.title}</h2>
                <p className="mb-4">{data.description}</p>
                {/* Image carousel code remains commented out */}
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
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);
    const handleImageClick = (image: string) => {
        setLightboxImage(image);
    };

    const closeLightbox = () => {
        setLightboxImage(null);
    };

    return (
        <>
            <div className="w-full h-[70vh] min-h-40 overflow-y-auto border border-[#232323] rounded-lg">
                {initialCards.map((card) => (
                    <div>
                        {/* <Card
                            key={card.id}
                            data={card}
                            onImageClick={handleImageClick}
                        /> */}
                        <div key={card.id} className="border border-[#232323] rounded-lg p-3 m-3">
                            <h1 class="text-2xl font-bold">{card.title}</h1>
                            <p className="text-sm mb-4">
                                {parseDescription(card.description)}
                            </p>
                        </div>
                    </div>
                ))}
                </div>
            {lightboxImage && (
                <Lightbox image={lightboxImage} onClose={closeLightbox} />
            )}
        </>
    );
}

function parseDescription(description: string) {
    const parts = description.split(/(<a.*?<\/a>)/);
    return parts.map((part, index) => {
      if (part.startsWith('<a')) {
        const hrefMatch = part.match(/href=['"](.*?)['"]/);
        const href = hrefMatch ? hrefMatch[1] : '#';
        const text = part.replace(/<\/?a.*?>/g, '');
        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#32564f] hover:text-[#54ac9b] hover:underline"
          >
            {text}
          </a>
        );
      }
      return part;
    });
  }
  