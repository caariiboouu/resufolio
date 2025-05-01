import { useState, useEffect } from "preact/hooks";

interface AnalyticsPageData {
  stats: {
    views24h: number;
    totalViews: number;
    uniqueVisitors: number;
    topPages: { path: string; count: number }[];
  };
}

interface VisitorStats {
  ip: string;
  totalViews: number;
  uniquePages: number;
  firstVisit: number;
  lastVisit: number;
  pages: string[];
  referrers: string[];
  userAgents: string[];
}

export default function AnalyticsDashboard({ stats }: { stats: AnalyticsPageData["stats"] }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [pageViews, setPageViews] = useState<any[]>([]);
  const [userActions, setUserActions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [referrerStats, setReferrerStats] = useState<{source: string, count: number}[]>([]);
  const [visitorStats, setVisitorStats] = useState<VisitorStats[]>([]);
  
  // Function to fetch data from the API
  const fetchData = async (type: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/analytics/data?type=${type}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${type}: ${response.statusText}`);
      }
      const data = await response.json();
      
      if (type === "pageviews") {
        setPageViews(data);
        
        // Calculate referrer stats
        const referrerCounts: Record<string, number> = {};
        data.forEach((view: any) => {
          const referrer = view.referrer || "direct";
          referrerCounts[referrer] = (referrerCounts[referrer] || 0) + 1;
        });
        const sortedReferrers = Object.entries(referrerCounts)
          .map(([source, count]) => ({ source, count }))
          .sort((a, b) => b.count - a.count);
        setReferrerStats(sortedReferrers);
        
        // Calculate visitor stats by IP
        const statsByIp: Record<string, VisitorStats> = {};
        data.forEach((view: any) => {
          const ip = view.ip || 'unknown';
          if (!statsByIp[ip]) {
            statsByIp[ip] = {
              ip: ip,
              totalViews: 0,
              uniquePages: 0,
              firstVisit: view.timestamp,
              lastVisit: view.timestamp,
              pages: [],
              referrers: [],
              userAgents: [],
            };
          }
          statsByIp[ip].totalViews++;
          statsByIp[ip].lastVisit = Math.max(statsByIp[ip].lastVisit, view.timestamp);
          statsByIp[ip].firstVisit = Math.min(statsByIp[ip].firstVisit, view.timestamp);
          if (!statsByIp[ip].pages.includes(view.path)) {
            statsByIp[ip].pages.push(view.path);
            statsByIp[ip].uniquePages++;
          }
          const referrer = view.referrer || 'direct';
          if (!statsByIp[ip].referrers.includes(referrer)) {
             statsByIp[ip].referrers.push(referrer);
          }
          if (!statsByIp[ip].userAgents.includes(view.userAgent)) {
             statsByIp[ip].userAgents.push(view.userAgent);
          }
        });
        
        const sortedVisitorStats = Object.values(statsByIp)
          .sort((a, b) => b.lastVisit - a.lastVisit); // Sort by most recent visit
        setVisitorStats(sortedVisitorStats);
          
      } else if (type === "actions") {
        setUserActions(data);
      }
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
      // Optionally set an error state here to display to the user
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch initial data for overview tab
  useEffect(() => {
    if (activeTab === 'overview' || activeTab === 'pageviews' || activeTab === 'referrers' || activeTab === 'visitors') {
       fetchData('pageviews');
    } else if (activeTab === 'actions') {
       fetchData('actions');
    }
  }, [activeTab]); // Re-fetch when tab changes
  
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-[#32564f]">Analytics Dashboard</h1>
        
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2">
              <button 
                onClick={() => setActiveTab("overview")}
                className={`inline-block p-4 ${
                  activeTab === "overview" 
                    ? "text-[#32564f] border-b-2 border-[#32564f]" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Overview
              </button>
            </li>
            <li className="mr-2">
              <button 
                onClick={() => {
                  setActiveTab("pageviews");
                  fetchData("pageviews");
                }}
                className={`inline-block p-4 ${
                  activeTab === "pageviews" 
                    ? "text-[#32564f] border-b-2 border-[#32564f]" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Page Views
              </button>
            </li>
            <li className="mr-2">
              <button 
                onClick={() => {
                  setActiveTab("referrers");
                  fetchData("pageviews"); // We need pageviews to calculate referrers
                }}
                className={`inline-block p-4 ${
                  activeTab === "referrers" 
                    ? "text-[#32564f] border-b-2 border-[#32564f]" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Referrers
              </button>
            </li>
            <li className="mr-2">
              <button 
                onClick={() => {
                  setActiveTab("visitors");
                  fetchData("pageviews"); // Needs pageviews data
                }}
                className={`inline-block p-4 ${
                  activeTab === "visitors" 
                    ? "text-[#32564f] border-b-2 border-[#32564f]" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Visitors by IP
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  setActiveTab("actions");
                  fetchData("actions");
                }}
                className={`inline-block p-4 ${
                  activeTab === "actions" 
                    ? "text-[#32564f] border-b-2 border-[#32564f]" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                User Actions
              </button>
            </li>
          </ul>
        </div>
        
        {/* Content for each tab */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeTab === "overview" && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#E7DECA] p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#32564f] mb-2">Last 24 Hours</h3>
                  <p className="text-3xl font-bold">{stats.views24h}</p>
                </div>
                <div className="bg-[#E7DECA] p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#32564f] mb-2">Total Page Views</h3>
                  <p className="text-3xl font-bold">{stats.totalViews}</p>
                </div>
                <div className="bg-[#E7DECA] p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#32564f] mb-2">Unique Visitors</h3>
                  <p className="text-3xl font-bold">{stats.uniqueVisitors}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[#32564f]">Top Pages</h3>
                {stats.topPages.length > 0 ? (
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b text-left">Page</th>
                        <th className="py-2 px-4 border-b text-left">Views</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.topPages.map((page, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                          <td className="py-2 px-4 border-b">{page.path}</td>
                          <td className="py-2 px-4 border-b">{page.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-500">No data available yet.</p>
                )}
              </div>
            </div>
          )}
          
          {activeTab === "pageviews" && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-[#32564f]">Recent Page Views</h3>
              {loading ? (
                <div className="text-center py-8">
                  <div className="w-10 h-10 border-4 border-[#32564f] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <p>Loading data...</p>
                </div>
              ) : pageViews.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="py-2 px-3 border-b text-left">Path</th>
                        <th className="py-2 px-3 border-b text-left">Time</th>
                        <th className="py-2 px-3 border-b text-left">Referrer</th>
                        <th className="py-2 px-3 border-b text-left">Screen Size</th>
                        <th className="py-2 px-3 border-b text-left">IP Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageViews.map((view: any) => (
                        <tr key={view.id} className="hover:bg-gray-50">
                          <td className="py-2 px-3 border-b">{view.path}</td>
                          <td className="py-2 px-3 border-b">{new Date(view.timestamp).toLocaleString()}</td>
                          <td className="py-2 px-3 border-b">{view.referrer}</td>
                          <td className="py-2 px-3 border-b">{view.screenSize}</td>
                          <td className="py-2 px-3 border-b">{view.ip}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">No page views data available yet.</p>
              )}
            </div>
          )}
          
          {activeTab === "referrers" && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-[#32564f]">Traffic Sources</h3>
              {loading ? (
                <div className="text-center py-8">
                  <div className="w-10 h-10 border-4 border-[#32564f] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <p>Loading data...</p>
                </div>
              ) : referrerStats.length > 0 ? (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                      <h4 className="text-lg font-semibold mb-4 text-[#32564f]">Top Referrers</h4>
                      <table className="min-w-full">
                        <thead>
                          <tr>
                            <th className="py-2 px-4 border-b text-left">Source</th>
                            <th className="py-2 px-4 border-b text-left">Visits</th>
                            <th className="py-2 px-4 border-b text-left">Percentage</th>
                          </tr>
                        </thead>
                        <tbody>
                          {referrerStats.slice(0, 10).map((referrer, index) => {
                            const totalVisits = referrerStats.reduce((sum, item) => sum + item.count, 0);
                            const percentage = ((referrer.count / totalVisits) * 100).toFixed(1);
                            
                            return (
                              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                                <td className="py-2 px-4 border-b">
                                  {referrer.source === "direct" ? 
                                    "Direct / None" : 
                                    referrer.source}
                                </td>
                                <td className="py-2 px-4 border-b">{referrer.count}</td>
                                <td className="py-2 px-4 border-b">{percentage}%</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow">
                      <h4 className="text-lg font-semibold mb-4 text-[#32564f]">Traffic Distribution</h4>
                      <div className="h-64 flex items-end">
                        {referrerStats.slice(0, 5).map((referrer, index) => {
                          const totalVisits = referrerStats.reduce((sum, item) => sum + item.count, 0);
                          const percentage = (referrer.count / totalVisits) * 100;
                          const barHeight = Math.max(percentage, 5); // Minimum bar height for visibility
                          
                          return (
                            <div 
                              key={index} 
                              className="flex flex-col items-center mx-1 flex-1"
                              title={`${referrer.source}: ${referrer.count} visits (${percentage.toFixed(1)}%)`}
                            >
                              <div 
                                className="w-full bg-[#32564f] rounded-t"
                                style={{ height: `${barHeight}%` }}
                              ></div>
                              <div className="text-xs mt-2 truncate w-full text-center">
                                {referrer.source === "direct" ? "Direct" : 
                                 referrer.source.replace(/https?:\/\/(www\.)?/, "").split("/")[0]}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No referrer data available yet.</p>
              )}
            </div>
          )}
          
          {activeTab === "actions" && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-[#32564f]">Recent User Actions</h3>
              {loading ? (
                <div className="text-center py-8">
                  <div className="w-10 h-10 border-4 border-[#32564f] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <p>Loading data...</p>
                </div>
              ) : userActions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="py-2 px-3 border-b text-left">Action</th>
                        <th className="py-2 px-3 border-b text-left">Element</th>
                        <th className="py-2 px-3 border-b text-left">Path</th>
                        <th className="py-2 px-3 border-b text-left">Time</th>
                        <th className="py-2 px-3 border-b text-left">IP Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userActions.map((action: any) => (
                        <tr key={action.id} className="hover:bg-gray-50">
                          <td className="py-2 px-3 border-b">{action.action}</td>
                          <td className="py-2 px-3 border-b">{action.element}</td>
                          <td className="py-2 px-3 border-b">{action.path}</td>
                          <td className="py-2 px-3 border-b">{new Date(action.timestamp).toLocaleString()}</td>
                          <td className="py-2 px-3 border-b">{action.ip}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">No user actions data available yet.</p>
              )}
            </div>
          )}
          
          {activeTab === "visitors" && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-[#32564f]">Visitors by IP Address</h3>
              {loading ? (
                <div className="text-center py-8">
                  <div className="w-10 h-10 border-4 border-[#32564f] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <p>Loading data...</p>
                </div>
              ) : visitorStats.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="py-2 px-3 border-b text-left">IP Address</th>
                        <th className="py-2 px-3 border-b text-left">Total Views</th>
                        <th className="py-2 px-3 border-b text-left">Unique Pages</th>
                        <th className="py-2 px-3 border-b text-left">First Visit</th>
                        <th className="py-2 px-3 border-b text-left">Last Visit</th>
                        <th className="py-2 px-3 border-b text-left">Pages Visited</th>
                        <th className="py-2 px-3 border-b text-left">Referrers</th>
                        <th className="py-2 px-3 border-b text-left">User Agents</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visitorStats.map((visitor) => (
                        <tr key={visitor.ip} className="hover:bg-gray-50">
                          <td className="py-2 px-3 border-b font-mono">{visitor.ip}</td>
                          <td className="py-2 px-3 border-b text-center">{visitor.totalViews}</td>
                          <td className="py-2 px-3 border-b text-center">{visitor.uniquePages}</td>
                          <td className="py-2 px-3 border-b">{new Date(visitor.firstVisit).toLocaleString()}</td>
                          <td className="py-2 px-3 border-b">{new Date(visitor.lastVisit).toLocaleString()}</td>
                          <td className="py-2 px-3 border-b text-xs">
                            {visitor.pages.map(page => <div key={page}>{page}</div>)}
                          </td>
                          <td className="py-2 px-3 border-b text-xs">
                            {visitor.referrers.map(ref => <div key={ref}>{ref}</div>)}
                          </td>
                          <td className="py-2 px-3 border-b text-xs">
                             {visitor.userAgents.map(ua => <div key={ua} title={ua}>{ua.substring(0, 30)}...</div>)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">No visitor data available yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 