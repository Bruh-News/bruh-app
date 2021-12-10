import React from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, ViewStyle } from "react-native"
import { Screen } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
  justifyContent: "center",
  alignItems: "center"
}

export const SplashScreen = observer(function SplashScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <ActivityIndicator color={color.palette.white} size="large" />
    </Screen>
  )
})
