import { UserType } from "./user"

export interface RDVAvailabilityType {
    id?: number
    date: string,
    start_time: string,
    end_time: string
}

export interface RDVType {
    id: number,
    rdv_availabilities: RDVAvailabilityType[],
    created_by: UserType,
    informations: string,
    date?: string,
    selected_availability?: RDVAvailabilityType,
    state?: "validated" | "pending" | "failed"
}

export interface RestrictedRDVType {
    rdv_availabilities: RDVAvailabilityType[],
    informations: string,
}