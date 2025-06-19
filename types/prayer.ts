export interface PrayerRequest {
    id: string;
    message: string;
    submittedBy: string | null; // null for guests
    status: "pending" | "prayed" | "archived";
    createdAt: string;
  }
  