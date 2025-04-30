// Simple in-memory analytics store
export interface PageView {
  id: string;
  path: string;
  userAgent: string;
  referrer: string;
  timestamp: number;
  ip: string;
  screenSize: string;
}

export interface UserAction {
  id: string;
  action: string;
  path: string;
  element: string;
  timestamp: number;
  ip: string;
}

// In-memory storage for analytics data
// This will reset when the server restarts
class AnalyticsStore {
  private pageViews: PageView[] = [];
  private userActions: UserAction[] = [];
  
  addPageView(pageView: PageView): void {
    this.pageViews.push(pageView);
    
    // Limit storage to prevent memory issues (keep last 1000 page views)
    if (this.pageViews.length > 1000) {
      this.pageViews = this.pageViews.slice(-1000);
    }
  }
  
  addUserAction(userAction: UserAction): void {
    this.userActions.push(userAction);
    
    // Limit storage to prevent memory issues (keep last 1000 actions)
    if (this.userActions.length > 1000) {
      this.userActions = this.userActions.slice(-1000);
    }
  }
  
  getPageViews(limit: number = 100): PageView[] {
    return this.pageViews.slice(-limit).reverse();
  }
  
  getUserActions(limit: number = 100): UserAction[] {
    return this.userActions.slice(-limit).reverse();
  }
  
  getStats() {
    // Calculate last 24 hours
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    
    const views24h = this.pageViews.filter(view => view.timestamp >= oneDayAgo).length;
    const totalViews = this.pageViews.length;
    
    // Get unique visitors by IP
    const uniqueIPs = new Set(this.pageViews.map(view => view.ip));
    const uniqueVisitors = uniqueIPs.size;
    
    // Most viewed pages
    const pageCounts = this.pageViews.reduce((acc, view) => {
      acc[view.path] = (acc[view.path] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topPages = Object.entries(pageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([path, count]) => ({ path, count }));
    
    return {
      views24h,
      totalViews,
      uniqueVisitors,
      topPages
    };
  }
}

// Export a singleton instance
export const analyticsStore = new AnalyticsStore(); 