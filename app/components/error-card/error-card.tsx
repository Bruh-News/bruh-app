import * as React from "react"
import { Dimensions, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Card, Text } from "../"
import { flatten } from "ramda"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const CARD: ViewStyle = {
  minHeight: Dimensions.get("screen").height - 400,
  justifyContent: "space-between"
}

export interface ErrorCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  error?: string
}

/**
 * Describe your component here
 */
export const ErrorCard = observer(function ErrorCard(props: ErrorCardProps) {
  const { style, error } = props
  const styles = flatten([CONTAINER, style])

  return (
    <View style={styles}>
      <Card style={CARD}>
        <View>
          <Text preset="header" text="Big Yikes!" />
          <Text preset="default" text={error}/>
        </View>
          <Text preset="default" text="Looks like something went wrong there. Try again later or contact support for assistance." />
      </Card>
    </View>
  )
})
