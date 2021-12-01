import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { PostModel, PostSnapshot, withEnvironment } from "..";
import { PostAPI } from "../../services/api/post-api";

/**
 * Model description here for TypeScript hints.
 */
export const FeedModel = types
  .model("Feed")
  .props({
    posts: types.array(PostModel)
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveFeed: async (posts: PostSnapshot[]) => {
      self.posts.replace(posts);
    }
  }))
  .actions((self) => ({
    getFeed: async (user: number) => {
      const postAPI = new PostAPI(self.environment.api);
      const result = await postAPI.getPostsForUser(user);

      if(result.kind === "ok") {
        self.saveFeed(result.posts);
      } else {
        __DEV__ && console.tron.log(result.kind);
      }
    }
  }));

type FeedType = Instance<typeof FeedModel>
export interface Feed extends FeedType {}
type FeedSnapshotType = SnapshotOut<typeof FeedModel>
export interface FeedSnapshot extends FeedSnapshotType {}
export const createFeedDefaultModel = () => types.optional(FeedModel, {})
