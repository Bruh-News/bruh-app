import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { ChatDots, ShareNetwork } from "phosphor-react-native";
import { observer } from "mobx-react-lite"
import { color, palette, typography } from "../../theme"
import { Card, Icon, Text } from "../"
import { flatten } from "ramda"
import { Divider } from "../divider/divider";

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const USER_NAME: TextStyle = {
  fontWeight: "bold",
  fontSize: 16
}

const USER_DATE: TextStyle = {
  fontWeight: "400",
  color: palette.lightGrey
}

const PROFILE: ViewStyle = {
}

const SECONDARY: TextStyle = {
  fontWeight: "400",
  color: palette.lightGrey,
  paddingLeft: 4
}

const CONTENT: TextStyle = {
  marginVertical: 16
}

const ACTIONS: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 16
}

const ACTION: ViewStyle = {
  alignItems: "center",
  flexDirection: "row"
}

export interface PostProps {
  /**
   * An optional style override useful for padding & margin.
   */
  post: {
    username: string,
    postText: string,
    dateTime: string
  }
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const Post = observer(function Post(props: PostProps) {
  const { style, post } = props
  const styles = flatten([CONTAINER, style])

  return (
    <View style={styles}>
      <Card>
        <View style={PROFILE}>
          <Text style={USER_NAME}>{post.username}</Text>
          <Text style={USER_DATE}>{(new Date(post.dateTime)).toLocaleString()}</Text>
        </View>
        <Text style={CONTENT}>{post.postText}</Text>
        <Divider color={palette.lightGrey} />
        <View style={ACTIONS}>
          <View style={ACTION}>
            <ChatDots size={24} color={palette.lightGrey} />
            <Text style={SECONDARY}>7 Comments</Text>
          </View>
          <View style={ACTION}>
            <ShareNetwork size={24} color={palette.lightGrey} />
            <Text style={SECONDARY}>Share</Text>
          </View>
        </View>
      </Card>
    </View>
  )
})
