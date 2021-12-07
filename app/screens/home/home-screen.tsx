import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { FooterNav, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CreatePostScreen, FeedScreen, SettingsScreen } from ".."

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const HomeScreen = observer(function HomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const Tab = createBottomTabNavigator();
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={props => <FooterNav {...props} />}>
      <Tab.Screen name="feed" component={FeedScreen} />
      <Tab.Screen name="create" component={CreatePostScreen} />
      <Tab.Screen name="settings" component={SettingsScreen} />
    </Tab.Navigator>
  )
})
