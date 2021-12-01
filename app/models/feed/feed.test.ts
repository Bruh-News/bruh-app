import { FeedModel } from "./feed"

test("can be created", () => {
  const instance = FeedModel.create({})

  expect(instance).toBeTruthy()
})
