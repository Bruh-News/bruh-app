import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const PostModel = types
  .model("Post")
  .props({
    uid: types.number,
    postText: types.string,
    secondsSinceEpoch: types.number,
    pid: types.maybe(types.number)
  });

type PostType = Instance<typeof PostModel>
export interface Post extends PostType {}
type PostSnapshotType = SnapshotOut<typeof PostModel>
export interface PostSnapshot extends PostSnapshotType {}
export const createPostDefaultModel = () => types.optional(PostModel, {})
