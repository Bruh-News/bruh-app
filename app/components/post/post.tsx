import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { ChatDots, ShareNetwork } from "phosphor-react-native";
import { observer } from "mobx-react-lite"
import { color, palette, typography } from "../../theme"
import { Card, Icon, Text } from "../"
import { flatten } from "ramda"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const USER_NAME: TextStyle = {
  fontWeight: "bold",
  fontSize: 16
}

const SECONDARY: TextStyle = {
  fontWeight: "400",
  color: palette.lightGrey
}

export interface PostProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const Post = observer(function Post(props: PostProps) {
  const { style } = props
  const styles = flatten([CONTAINER, style])

  return (
    <View style={styles}>
      <Card>
        <Text style={USER_NAME}>Sarah</Text>
        <Text style={SECONDARY}>20 April at 4:20PM</Text>
        <Text>The fluoride in the water's turning the frickin' frogs gay!</Text>
        <Text style={SECONDARY}><ChatDots size={24} color={palette.lightGrey}/>7 Comments</Text>
        <Text style={SECONDARY}><ShareNetwork size={24} color={palette.lightGrey} />Share</Text>
      </Card>
    </View>
  )
})
