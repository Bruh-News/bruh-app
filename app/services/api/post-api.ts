import { ApiResponse } from "apisauce"
import { Api } from "./api"
import * as Types from "./api.types"
import { getGeneralApiProblem } from "./api-problem"

export class PostAPI {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  /**
   * Gets a post
   */
  async getPost(id: number): Promise<Types.GetPostResult> {
    // make the api call
    const response: ApiResponse<any> = await this.api.apisauce.get(`/getpost?id=${id}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultPost: Types.Post = {
        userId: response.data.userId,
        postText: response.data.postText,
        dateTime: response.data.dateTime,
        parentId: response.data.parentId,
        media: response.data.media
      }
      return { kind: "ok", post: resultPost }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Gets a post
   */
  async getPostsForUser(id: number): Promise<Types.GetPostsResult> {
    // make the api call
    const response: ApiResponse<any> = await this.api.apisauce.get(`/getallpostsbyuser?id=${id}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultPosts: Array<Types.Post> = response.data;
      return { kind: "ok", posts: resultPosts }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Gets users's feed
   */
  async getPostsInUserFeed(id: number, page: number, pageLength: number): Promise<Types.GetPostsResult> {
    // make the api call
    const response: ApiResponse<any> = await this.api.apisauce.get(`/getpostsinuserfeed?id=${id}&page=${page}&pageLength=${pageLength}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultPosts: Array<Types.Post> = response.data;
      return { kind: "ok", posts: resultPosts }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Creates a new user
   */
  async createPost(post: Types.Post): Promise<Types.CreateResult> {
    // make the api call
    const response: ApiResponse<any> = await this.api.apisauce.post(`/createpost`, post);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const id: number = response.data.id;
      return { kind: "ok", id }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
