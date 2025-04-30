import { Handlers } from "$fresh/server.ts";
import { analyticsStore, PageView, UserAction } from "../../utils/analytics.ts";
import { v4 } from "https://deno.land/std@0.140.0/uuid/mod.ts";

export const handler: Handlers = {
  // Endpoint to collect page views
  async POST(req) {
    try {
      const ip = req.headers.get("x-forwarded-for") || "unknown";
      const data = await req.json();
      
      // Handle different types of analytics events
      if (data.type === "pageview") {
        const pageView: PageView = {
          id: v4.generate(),
          path: data.path || "/",
          userAgent: data.userAgent || "unknown",
          referrer: data.referrer || "direct",
          timestamp: Date.now(),
          ip,
          screenSize: data.screenSize || "unknown"
        };
        
        analyticsStore.addPageView(pageView);
      } 
      else if (data.type === "action") {
        const userAction: UserAction = {
          id: v4.generate(),
          action: data.action || "click",
          path: data.path || "/",
          element: data.element || "unknown",
          timestamp: Date.now(),
          ip
        };
        
        analyticsStore.addUserAction(userAction);
      }
      
      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" }
      });
    } catch (error: unknown) {
      console.error("Analytics error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      return new Response(JSON.stringify({ success: false, error: errorMessage }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
}; 