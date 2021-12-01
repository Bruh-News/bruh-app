import { PostModel } from "./post"

test("can be created", () => {
  const instance = PostModel.create({})

  expect(instance).toBeTruthy()
})
