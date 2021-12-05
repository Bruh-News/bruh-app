import { FeedPageModel } from "./feed-page"

test("can be created", () => {
  const instance = FeedPageModel.create({})

  expect(instance).toBeTruthy()
})
