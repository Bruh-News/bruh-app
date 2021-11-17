import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color, palette } from "../../theme"
import { Divider } from "./divider"

storiesOf("Divider", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <Divider color={palette.lightForest} thickness={1} />
      </UseCase>
    </Story>
  ))
