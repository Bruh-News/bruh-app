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

export interface AttributeRecord {
  userId: string,
  attributeName: string,
  attributeValue: string
}

export interface Post {
  uid: number,
  postText: string,
  secondsSinceEpoch: number,
  pid: null
}

export type NoPayloadResult= { kind: "ok"; } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem
export type CreateResult = { kind: "ok"; id: number } | GeneralApiProblem
export type GetPostResult = { kind: "ok"; post: Post } | GeneralApiProblem
export type GetPostsResult = { kind: "ok"; posts: Array<Post> } | GeneralApiProblem
