import { ensureFile } from "https://deno.land/std@0.224.0/fs/ensure_file.ts";

// Simple analytics store with JSON file persistence

const DATA_FILE_PATH = "./analytics_data.json";

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

interface AnalyticsData {
  pageViews: PageView[];
  userActions: UserAction[];
}

// Class to manage analytics data with file persistence
class AnalyticsStore {
  private data: AnalyticsData = { pageViews: [], userActions: [] };
  private writeTimeout: number | null = null;
  private writeScheduled = false;

  constructor() {
    this.loadData();
  }

  private async loadData(): Promise<void> {
    try {
      await ensureFile(DATA_FILE_PATH);
      const fileContent = await Deno.readTextFile(DATA_FILE_PATH);
      if (fileContent.trim()) {
        this.data = JSON.parse(fileContent);
        // Ensure arrays exist
        this.data.pageViews = this.data.pageViews || [];
        this.data.userActions = this.data.userActions || [];
        console.log(
          `Loaded ${this.data.pageViews.length} page views and ${this.data.userActions.length} user actions from ${DATA_FILE_PATH}`,
        );
      } else {
        console.log(
          `${DATA_FILE_PATH} is empty. Initializing with empty data.`,
        );
        this.data = { pageViews: [], userActions: [] };
      }
    } catch (error) {
      console.error(
        `Error loading analytics data from ${DATA_FILE_PATH}:`,
        error,
      );
      // Initialize with empty data if loading fails
      this.data = { pageViews: [], userActions: [] };
    }
  }

  // Debounced write function to avoid excessive writes
  private scheduleWrite(): void {
    if (this.writeScheduled) return; // Already scheduled

    this.writeScheduled = true;
    if (this.writeTimeout) {
      clearTimeout(this.writeTimeout);
    }

    // Wait 5 seconds after the last change to write
    this.writeTimeout = setTimeout(async () => {
      await this.writeData();
      this.writeScheduled = false;
      this.writeTimeout = null;
    }, 5000);
  }

  private async writeData(): Promise<void> {
    try {
      // Keep only the last 1000 entries for each type to prevent file bloat
      this.data.pageViews = this.data.pageViews.slice(-1000);
      this.data.userActions = this.data.userActions.slice(-1000);

      const dataString = JSON.stringify(this.data, null, 2);
      await Deno.writeTextFile(DATA_FILE_PATH, dataString);
      console.log(`Analytics data written to ${DATA_FILE_PATH}`);
    } catch (error) {
      console.error(
        `Error writing analytics data to ${DATA_FILE_PATH}:`,
        error,
      );
    }
  }

  addPageView(pageView: PageView): void {
    // Check if the path starts with /admin - if so, don't track
    if (pageView.path.startsWith("/admin")) {
      console.log("Skipping admin page view tracking for path:", pageView.path);
      return;
    }
    this.data.pageViews.push(pageView);
    this.scheduleWrite();
  }

  addUserAction(userAction: UserAction): void {
    // Check if the path starts with /admin - if so, don't track
    if (userAction.path.startsWith("/admin")) {
      console.log(
        "Skipping admin user action tracking for path:",
        userAction.path,
      );
      return;
    }
    this.data.userActions.push(userAction);
    this.scheduleWrite();
  }

  getPageViews(limit: number = 100): PageView[] {
    // Return data from the in-memory store
    return this.data.pageViews.slice(-limit).reverse();
  }

  getUserActions(limit: number = 100): UserAction[] {
    // Return data from the in-memory store
    return this.data.userActions.slice(-limit).reverse();
  }

  getStats() {
    // Calculate stats based on the in-memory data
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;

    const views24h =
      this.data.pageViews.filter((view) => view.timestamp >= oneDayAgo).length;
    const totalViews = this.data.pageViews.length;

    const uniqueIPs = new Set(this.data.pageViews.map((view) => view.ip));
    const uniqueVisitors = uniqueIPs.size;

    const pageCounts = this.data.pageViews.reduce((acc, view) => {
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
      topPages,
    };
  }
}

// Export a singleton instance
export const analyticsStore = new AnalyticsStore();
