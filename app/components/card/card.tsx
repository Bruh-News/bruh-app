import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { palette } from "../../theme"
import { flatten } from "ramda"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  backgroundColor: palette.black,
  marginVertical: 24,
  marginHorizontal: 48,
  padding: 24,
  borderRadius: 24
}

export interface CardProps {
  style?: StyleProp<ViewStyle>,
  children?: React.ReactElement | React.ReactElement[]
}

/**
 * Reusable card component
 */
export const Card = observer(function Card(props: CardProps) {
  const { style, children } = props
  const styles = flatten([CONTAINER, style])

  return (
    <View style={styles}>
      {children}
    </View>
  )
})
