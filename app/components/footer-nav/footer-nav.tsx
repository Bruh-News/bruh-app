import * as React from "react"
import { Dimensions, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Button, Text } from "../"
import { flatten } from "ramda"
import { House, List, Plus } from "phosphor-react-native"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  backgroundColor: color.palette.black,
}
const ROW: ViewStyle = {
  justifyContent: "space-around",
  flexDirection: "row",
  backgroundColor: color.palette.black,
  height: 64,
  overflow: "visible"
}
const BUTTON: ViewStyle = {
  backgroundColor: null
}
const MAIN_BUTTON: ViewStyle = {
  borderRadius: 1000,
  position: "absolute",
  bottom: 0,
  width: 80,
  height: 80,
  margin: 0,
  left: (Dimensions.get('screen').width / 2 - 40),
  right: 0,
  justifyContent: 'center',
  alignSelf: 'center'
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

/**
 * Describe your component here
 */
export const FooterNav = ({state, descriptors, navigation}) => {

  return (
    <View style={CONTAINER}>
      <View style={ROW}>
        <Button
            style={BUTTON}
            children={
                <House color={state.index === 0 ? color.palette.blue : color.palette.white} />
            }
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: "feed",
                canPreventDefault: true
              });

              if(state.index !== 0 && !event.defaultPrevented) {
                navigation.navigate({ name: state.routes[0].name, merge: false })
              }
            }}
        />
        <Button
            style={MAIN_BUTTON}
            children={
                <Plus size="80" color={color.palette.white} />
            }
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: "create-post",
                canPreventDefault: true
              });

              if(state.index !== 1 && !event.defaultPrevented) {
                navigation.navigate({ name: state.routes[1].name, merge: false })
              }
            }}
        />
        <Button
            style={BUTTON}
            children={
                <List color={state.index === 2 ? color.palette.blue : color.palette.white} />
            }
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: "settings",
                canPreventDefault: true
              });

              if(state.index !== 2 && !event.defaultPrevented) {
                navigation.navigate({ name: state.routes[2].name, merge: false })
              }
            }}
        />
      </View>
    </View>
  )
}
