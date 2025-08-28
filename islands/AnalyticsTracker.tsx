import { useEffect } from "preact/hooks";

interface AnalyticsTrackerProps {
  trackActions?: boolean;
}

export default function AnalyticsTracker(
  { trackActions = true }: AnalyticsTrackerProps,
) {
  useEffect(() => {
    // Function to send analytics data to the server
    const sendAnalytics = async (data: Record<string, unknown>) => {
      try {
        await fetch("/api/analytics", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } catch (error) {
        // Silent fail - don't disrupt user experience if analytics fails
        console.error("Analytics error:", error);
      }
    };

    // Track page view on component mount
    const trackPageView = () => {
      const pageView = {
        type: "pageview",
        path: globalThis.location?.pathname || "/",
        referrer: globalThis.document?.referrer || "direct",
        userAgent: navigator.userAgent,
        screenSize: `${globalThis.innerWidth || 1920}x${
          globalThis.innerHeight || 1080
        }`,
      };

      sendAnalytics(pageView);
    };

    // Track user actions if enabled
    const setupActionTracking = () => {
      // Use event delegation to track clicks
      document.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        if (!target) return;

        // Get details about the clicked element
        const tagName = target.tagName.toLowerCase();
        const id = target.id || "";
        const classNames = Array.from(target.classList).join(" ");
        const text = target.textContent?.trim().substring(0, 50) || "";
        const href = target instanceof HTMLAnchorElement ? target.href : "";

        // Create a descriptive element identifier
        let elementDesc = tagName;
        if (id) elementDesc += `#${id}`;
        if (classNames) elementDesc += `.${classNames.replace(/\s+/g, ".")}`;
        if (text) elementDesc += `:${text}`;
        if (href) elementDesc += `[href=${href}]`;

        const action = {
          type: "action",
          action: "click",
          path: globalThis.location?.pathname || "/",
          element: elementDesc.substring(0, 100), // Limit length
        };

        sendAnalytics(action);
      });
    };

    // Track initial page view
    trackPageView();

    // Track navigation changes (for SPA navigation)
    let lastUrl = globalThis.location?.href || "";
    const handleUrlChange = () => {
      const currentUrl = globalThis.location?.href || "";
      if (currentUrl !== lastUrl) {
        lastUrl = currentUrl;
        trackPageView();
      }
    };

    // Check for URL changes (simplified approach)
    const urlChangeInterval = setInterval(handleUrlChange, 1000);

    // Set up action tracking if enabled
    if (trackActions) {
      setupActionTracking();
    }

    // Cleanup on unmount
    return () => {
      clearInterval(urlChangeInterval);

      if (trackActions) {
        // Remove event listeners if needed
      }
    };
  }, [trackActions]);

  // This component doesn't render anything
  return null;
}
