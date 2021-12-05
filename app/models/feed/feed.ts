import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { PostModel, PostSnapshot } from "../post/post";
import { PostAPI } from "../../services/api/post-api";
import { withEnvironment } from "../extensions/with-environment";

/**
 * Model description here for TypeScript hints.
 */
export const FeedModel = types
  .model("FeedStore")
  .props({
    feed: types.optional(types.array(PostModel), [])
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveFeed: (page: Array<PostSnapshot>) => {
      self.feed.replace(page);
    }
  }))
  .actions((self) => ({
    getFeed: async (user: number, page: number, pageLength: number) => {
      const postAPI = new PostAPI(self.environment.api);
      const result = await postAPI.getPostsInUserFeed(user, page, pageLength);

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
