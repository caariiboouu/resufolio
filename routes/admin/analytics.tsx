import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { analyticsStore } from "../../utils/analytics.ts";
import AnalyticsDashboard from "../../islands/AnalyticsDashboard.tsx";

// Allowed IP addresses
const ALLOWED_IPS = [
  "72.192.106.200",
  "127.0.0.1",
  "::1",
  "localhost",
  "cuthriell.com",
];

interface AnalyticsPageData {
  stats: {
    views24h: number;
    totalViews: number;
    uniqueVisitors: number;
    topPages: { path: string; count: number }[];
  };
  authorized: boolean;
  detectedIp: string;
}

export const handler: Handlers<AnalyticsPageData> = {
  GET(req, ctx) {
    const ip = req.headers.get("x-forwarded-for") ||
      req.headers.get("host")?.split(":")[0] || "unknown";
    console.log("Client IP:", ip);
    console.log("Headers:", Object.fromEntries(req.headers.entries()));

    // Check if the IP is in the allowed list or if the host contains cuthriell.com
    const host = req.headers.get("host") || "";
    const authorized = ALLOWED_IPS.includes(ip) ||
      host.includes("cuthriell.com");

    // Only send stats if the IP is authorized
    const stats = authorized ? analyticsStore.getStats() : {
      views24h: 0,
      totalViews: 0,
      uniqueVisitors: 0,
      topPages: [],
    };

    return ctx.render({ stats, authorized, detectedIp: ip });
  },
};

export default function AnalyticsPage({ data }: PageProps<AnalyticsPageData>) {
  const { stats, authorized, detectedIp } = data;

  // If not authorized, show access denied
  if (!authorized) {
    return (
      <>
        <Head>
          <title>Access Denied</title>
        </Head>
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="p-8 bg-white rounded shadow-md">
            <h1 className="text-2xl font-semibold text-red-500 mb-4">
              Access Denied
            </h1>
            <p>You are not authorized to view this page.</p>
            <p className="mt-2 text-gray-600">Detected IP: {detectedIp}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Analytics Dashboard</title>
      </Head>
      <AnalyticsDashboard stats={stats} />
    </>
  );
}
