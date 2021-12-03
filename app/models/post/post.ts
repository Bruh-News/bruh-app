import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const PostModel = types
  .model("Post")
  .props({
    dateTime: types.string,
    media: types.maybeNull(types.string),
    parentId: types.maybe(types.number),
    postText: types.string,
    userId: types.number
  });

type PostType = Instance<typeof PostModel>
export interface Post extends PostType {}
type PostSnapshotType = SnapshotOut<typeof PostModel>
export interface PostSnapshot extends PostSnapshotType {}
export const createPostDefaultModel = () => types.optional(PostModel, {})
