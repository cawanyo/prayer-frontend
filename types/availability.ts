import { UserType } from "./user";

export interface AvailabilityType {
    user: UserType | number,
    date: string,
    state: boolean
}