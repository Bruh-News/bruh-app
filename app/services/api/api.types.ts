import { GeneralApiProblem } from "./api-problem"
export interface User {
  id: number,
  politicalLeaning: string,
  age: string,
  race: string,
  nationality: string,
  religion: string,
  parentalStatus: string,
  gender: string,
  email: string,
  username: string,
  password: string
}

export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem
export type CreateUserResult = { kind: "ok"; id: number } | GeneralApiProblem
