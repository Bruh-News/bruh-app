import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { FeedModel } from "../feed/feed"
import { UserStoreModel } from "../user-store/user-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
    feedStore: types.optional(FeedModel, {} as any),
    userStore: types.optional(UserStoreModel, {} as any)
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
