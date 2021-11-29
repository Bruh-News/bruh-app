import { ApiResponse } from "apisauce"
import { Api } from "./api"
import * as Types from "./api.types"
import { getGeneralApiProblem } from "./api-problem"

export class UserAPI {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  /**
   * Gets a single user by ID
   */
  async getUser(id: number): Promise<Types.GetUserResult> {
    // make the api call
    const response: ApiResponse<any> = await this.api.apisauce.get(`/getuser?id=${id}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultUser: Types.User = {
        id,
        politicalLeaning: response.data.politicalLeaning,
        age: response.data.age,
        race: response.data.race,
        nationality: response.data.nationality,
        religion: response.data.religion,
        parentalStatus: response.data.parentalStatus,
        gender: response.data.gender,
        email: response.data.email,
        username: response.data.username,
        password: response.data.password
      }
      return { kind: "ok", user: resultUser }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Creates a new user
   */
  async createUser(un : string, email: string, pw: string): Promise<Types.CreateUserResult> {
    // make the api call
    const response: ApiResponse<any> = await this.api.apisauce.post(`/createuser`, {
      un,
      email,
      pw
    });

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

  /**
   * Sets user attributes
   */
  async setUserAttributes(userId : string, attributes: object): Promise<Types.NoPayloadResult> {

    // preparing the payload
    let payload: Array<Types.AttributeRecord>;
    for(const attr in attributes) {
      payload.push({
        userId,
        attributeName: attr,
        attributeValue: attributes[attr]
      });
    }

    // make the api call
    const response: ApiResponse<any> = await this.api.apisauce.post(`/setuserattribute`, payload);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok" }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
