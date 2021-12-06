import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment";
import { UserModel, UserSnapshot } from "../user/user";
import { UserAPI } from "../../services/api/user-api"
import * as Storage from "../../utils/storage";

/**
 * Model description here for TypeScript hints.
 */
export const UserStoreModel = types
  .model("UserStore")
  .props({
    user: types.maybeNull(UserModel)
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveUser: (user: UserSnapshot) => {
      self.user = user;
    }
  }))
  .actions((self) => ({
    setUser: async (userId: number) => {
      const userAPI = new UserAPI(self.environment.api);
      const result = await userAPI.getUser(userId);

      if(result.kind === "ok") {
        const user: UserSnapshot = result.user;
        await Storage.saveString("user", userId.toString())
        self.saveUser(user);
      } else {
        __DEV__ && console.tron.log(result.kind);
      }
    }
  }))
  .actions((self) => ({
    registerUser: async (username: string, password: string, email: string) => {
      const userAPI = new UserAPI(self.environment.api);
      const result = await userAPI.createUser(username, email, password);

      if(result.kind === "ok") {
        const userId: number = result.id;
        await self.setUser(userId);
      } else {
        __DEV__ && console.tron.log(result.kind);
      }
    },
    postAttributes: async (attributes: object) => {
      const userAPI = new UserAPI(self.environment.api);
      const result = await userAPI.setUserAttributes(self.user.id.toString(), attributes);

      if(result.kind !== "ok") {
        __DEV__ && console.tron.log(result.kind);
      }
    }
  }))
  .actions((self) => ({
    getUser: async () => {
      if(self.user === null) {
        const userId = await Storage.loadString("user");
        if(userId === null) {
          return null;
        } else {
          await self.setUser(Number.parseInt(userId));
        }
      }
      return self.user;
    }
  }));

type UserStoreType = Instance<typeof UserStoreModel>
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
export const createUserDefaultModel = () => types.optional(UserStoreModel, {})
