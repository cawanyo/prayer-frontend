import { UserType } from "./user"

export interface ProgramType {
    name: string,
    date: string,
    start_time: string,
    end_time: string,
    person?: UserType,
    created_by?: UserType
}