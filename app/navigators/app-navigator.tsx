/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React, { useEffect, useState } from "react"
import { useColorScheme } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { FeedScreen, OnboardingScreen, SplashScreen } from "../screens"
import { navigationRef } from "./navigation-utilities"
import * as Storage from "../utils/storage";
import { useStores } from "../models"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type NavigatorParamList = {
  feed: undefined,
  onboarding: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()

const AppStack = () => {
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [error, setError] = useState(false);
  const { userStore } = useStores();

  // Delaying load cus some Ignite bloatware somewhere causing recursion errors
  const delayed_setLoading = (val: boolean) => {
    setTimeout(() => {
      setLoading(val);
    }, 500);
  }

  useEffect(() => {
    Storage.loadString("user")
      .then((id) => {
        if(id === null) {
          setSignedIn(false);
          delayed_setLoading(false);
        } else {
          userStore.setUser(Number.parseInt(id))
            .then(() => {
              setSignedIn(true);
            })
            .catch((e) => {
              console.error(e);
              setError(true);
            })
            .finally(() => {
              setLoading(false);
            })
        }
      })
      .catch((e) => {
        console.error(e);
        setError(true);
        delayed_setLoading(false);
      });
  }, [])

  if(loading) {
    return <SplashScreen />
  } else {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={signedIn ? "feed" : "onboarding"}
      >
        {
          signedIn ?
            <>
              <Stack.Screen name="feed" component={FeedScreen} />
            </>
          :
            <>
              <Stack.Screen name="onboarding" component={OnboardingScreen} />
            </>
        }
      </Stack.Navigator>
    )
  }

}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["feed", "onboarding"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
