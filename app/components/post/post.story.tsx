import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { Post } from "./post"

storiesOf("Post", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <Post post={{
          un: "Sarah",
          postText: "Hello World",
          secondsSinceEpoch: 1634916525
        }}/>
      </UseCase>
    </Story>
  ))
