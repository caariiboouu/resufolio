import { useEffect, useRef, useState } from "preact/hooks";

// Add type definition for PDF.js library
declare global {
  interface Window {
    pdfjsLib: unknown;
  }
}

// Add CSS styles to ensure full-width rendering from start
const modalStyles = {
  modalBackdrop: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 9999,
    display: "block",
  },
  modalContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "calc(100vh - 50px)",
    display: "flex",
    flexDirection: "column",
    margin: 0,
    padding: 0,
    overflow: "hidden",
  },
  contentArea: {
    width: "100%",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f5f5f5",
    overflow: "hidden",
  },
  pdfContainer: {
    width: "100%",
    height: "calc(100vh - 170px)",
    position: "relative",
    display: "block",
    overflow: "hidden",
  },
  iframe: {
    width: "100%",
    height: "100%",
    border: "none",
    margin: 0,
    padding: 0,
    display: "block",
  },
  hiddenIframe: {
    width: "100%",
    height: "100%",
    border: "none",
    margin: 0,
    padding: 0,
    display: "block",
    opacity: 0,
    position: "absolute",
    top: 0,
    left: 0,
  },
};

export default function ResumeViewer({ pdfUrl, isOpen, onClose }: {
  pdfUrl: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [backdropVisible, setBackdropVisible] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(true);
  const [pdfFullyLoaded, setPdfFullyLoaded] = useState(false);

  // Extract filename from path for proper download filename
  const filename = pdfUrl.split("/").pop() || "portfolio-joel-cuthriell.pdf";

  // Check if user is on mobile device
  useEffect(() => {
    const checkMobile = () => {
      // Common mobile detection based on screen width
      setIsMobile((globalThis.innerWidth || 1920) <= 768);
    };

    // Check initially and on resize
    checkMobile();
    globalThis.addEventListener("resize", checkMobile);

    return () => {
      globalThis.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Open in new tab directly on mobile when modal tries to open
  useEffect(() => {
    if (isOpen && isMobile) {
      globalThis.open(pdfUrl, "_blank");
      // Close the modal immediately since we're opening in new tab
      onClose();
    }
  }, [isOpen, isMobile, pdfUrl, onClose]);

  // Handle animation mounting and cleanup
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      // First fade in the backdrop
      setBackdropVisible(true);
      // Reset PDF loaded states when opening
      setPdfLoading(true);
      setPdfFullyLoaded(false);
      // Small delay to ensure DOM is ready for animation
      const timer = setTimeout(() => {
        setMounted(true);
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle closing with animation
  const handleClose = () => {
    setIsClosing(true);
    setBackdropVisible(false);
    // Wait for animation to complete before actually closing
    setTimeout(() => {
      onClose();
      setMounted(false);
      setIsClosing(false); // Reset closing state
    }, 500); // Match the duration of the CSS transition
  };

  // Close modal when clicking outside content area
  const handleBackdropClick = (e: MouseEvent) => {
    if (modalRef.current && e.target === modalRef.current) {
      handleClose();
    }
  };

  // Close on escape key press
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  // Prevent scrolling of body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Handle iframe load event
  const handleIframeLoad = () => {
    setPdfLoading(false);

    // Add a delay to ensure PDF has time to navigate to page 2
    // The #page=2 parameter should already direct it there, but we'll add
    // a small delay to ensure rendering completes before showing
    setTimeout(() => {
      setPdfFullyLoaded(true);
    }, 1000); // 1 second delay to ensure page 2 is shown
  };

  // Don't render anything if modal is closed and not in closing animation
  // Also don't render if on mobile (we'll open in new tab instead)
  if ((!isOpen && !isClosing) || isMobile) return null;

  // Create PDF URL with parameters to disable text extraction and other UI elements
  // Adding #page=2 to start from the second page (skipping first page)
  const enhancedPdfUrl =
    `${pdfUrl}#page=2&toolbar=0&navpanes=0&scrollbar=0&view=FitH&textlayer=0&messages=0&disablehistory=true&disabletextselection=true`;

  return (
    <>
      {/* Modal Backdrop - truly fullscreen with fade-in/out animation */}
      <div
        ref={modalRef}
        onClick={handleBackdropClick}
        className={`transition-opacity duration-500 ${
          backdropVisible ? "opacity-100" : "opacity-0"
        }`}
        style={modalStyles.modalBackdrop}
        aria-modal="true"
        role="dialog"
        aria-labelledby="modal-title"
      >
        {/* Modal Container - fullscreen with margins - animated slide up/down */}
        <div
          className={`bg-white transition-transform duration-500 ease-in-out ${
            mounted && !isClosing ? "translate-y-0" : "translate-y-full"
          }`}
          style={modalStyles.modalContainer}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b bg-[#32564f] text-white w-full">
            <h2 id="modal-title" className="text-lg font-semibold">
              Resume - Joel Cuthriell
            </h2>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="text-white hover:text-gray-200"
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Modal Content - PDF Viewer with multiple methods */}
          <div style={modalStyles.contentArea}>
            <div style={modalStyles.pdfContainer}>
              {/* Loading placeholder - shown until PDF is fully loaded and on page 2 */}
              {!pdfFullyLoaded && (
                <div
                  className="absolute inset-0 flex items-center justify-center z-10"
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <div className="text-center">
                    <div className="w-10 h-10 border-4 border-[#32564f] border-t-transparent rounded-full animate-spin mx-auto mb-2">
                    </div>
                    <p className="text-gray-600">
                      {pdfLoading ? "Loading PDF..." : "Navigating..."}
                    </p>
                  </div>
                </div>
              )}

              {/* PDF embed with parameters - initially hidden until fully loaded */}
              <iframe
                ref={iframeRef}
                src={enhancedPdfUrl}
                style={pdfFullyLoaded
                  ? modalStyles.iframe
                  : modalStyles.hiddenIframe}
                frameBorder="0"
                onLoad={handleIframeLoad}
                title="Resume PDF"
                className={`transition-opacity duration-300 ${
                  pdfFullyLoaded ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="flex flex-col items-center justify-center p-8 h-full">
                  <p className="text-gray-700 mb-4">
                    We're having trouble displaying this PDF inline.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#32564f] text-white rounded hover:bg-[#54ac9b] transition-colors duration-300 text-center"
                    >
                      Open PDF in New Tab
                    </a>
                  </div>
                </div>
              </iframe>
            </div>

            {/* Fallback options at bottom - always visible */}
            <div className="p-4 bg-gray-50 border-t flex flex-wrap justify-center gap-4 w-full">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#32564f] text-white rounded hover:bg-[#54ac9b] transition-colors duration-300"
              >
                Open in New Tab
              </a>
              <a
                href={pdfUrl}
                download={filename}
                className="px-4 py-2 border border-[#32564f] text-[#32564f] rounded hover:bg-gray-200 transition-colors duration-300"
              >
                Download Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
