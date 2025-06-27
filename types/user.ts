export interface UserType {
  id: string;
  username: string,
  first_name: string,
  last_name: string,
  email: string,
  phone: string
}

export type DemandStateType = "pending" | "accepted" | "refused"

export interface UserDemandType {
  requester?:  UserType, 
  submitted_at: string,
  validate_by?:  UserType,
  state: DemandStateType
}
