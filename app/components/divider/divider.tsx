import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, palette, typography } from "../../theme"
import { Text } from "../"
import { flatten } from "ramda"

export interface DividerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  thickness?: number,
  color?: string
}

/**
 * Describe your component here
 */
export const Divider = observer(function Divider(props: DividerProps) {
  const { thickness, color } = props

  return (
    <View style={{flex: 1, height: thickness || 1, backgroundColor: color || palette.white}} />
  )
})
