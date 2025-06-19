export type Role = "guest" | "user" | "member" | "manager";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
}
