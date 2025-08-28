import { Handlers } from "$fresh/server.ts";
import { analyticsStore } from "../../../utils/analytics.ts";

// Allowed IP addresses that can access analytics data
const ALLOWED_IPS = [
  "72.192.106.200",
  "127.0.0.1",
  "::1",
  "localhost",
  "cuthriell.com",
];

export const handler: Handlers = {
  async GET(req) {
    try {
      const ip = req.headers.get("x-forwarded-for") ||
        req.headers.get("host")?.split(":")[0] || "unknown";

      // Check if the IP is allowed or if the host contains cuthriell.com
      const host = req.headers.get("host") || "";
      const authorized = ALLOWED_IPS.includes(ip) ||
        host.includes("cuthriell.com");

      if (!authorized) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 403,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Get query parameters
      const url = new URL(req.url);
      const dataType = url.searchParams.get("type") || "stats";
      const limit = parseInt(url.searchParams.get("limit") || "100", 10);

      let data;

      // Return the requested data type
      switch (dataType) {
        case "pageviews":
          data = analyticsStore.getPageViews(limit);
          break;
        case "actions":
          data = analyticsStore.getUserActions(limit);
          break;
        case "stats":
        default:
          data = analyticsStore.getStats();
          break;
      }

      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error: unknown) {
      console.error("Analytics data error:", error);
      const errorMessage = error instanceof Error
        ? error.message
        : "Unknown error";
      return new Response(JSON.stringify({ error: errorMessage }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
