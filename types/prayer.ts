import { UserType } from "./user";

export type PrayerStateType = "pending" | 'answered' | "failed";

export interface CategoryType {
  name: string
}

export interface PrayerRequestType {
    id: number;
    content: string;
    submiter_name?: string;
    submiter_email?: string;
    submiter_phone?: string;
    submission_date: string;
    state: PrayerStateType;
    user: UserType | null;
    category: CategoryType | null
  }
  
  export interface CommentType {
    content: string,
    prayer: PrayerRequestType,
    submiter_name: string,
    created_at: string
  }