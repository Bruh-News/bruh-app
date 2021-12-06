import React, { ReactNode, useRef, useState } from "react"
import _ from "lodash";
import { observer } from "mobx-react-lite"
import { Dimensions, View, ViewStyle } from "react-native"
import { Screen, Button, Card, Text, Auth } from "../../components"
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.offWhite,
  flex: 1,
  flexDirection: "column",
  justifyContent:"center"
}

const SCROLL_CONTAINER: ViewStyle = {
  justifyContent: "center"
}

const BUTTON: ViewStyle = {
  marginVertical: 8
}

const ACTIONS: ViewStyle = {
  justifyContent: "flex-end"
}

const CARD: ViewStyle = {
  minHeight: Dimensions.get("screen").height - 400,
  justifyContent: "space-between"
}

const TITLE: ViewStyle = {

}

interface OnboardingCardInterface {
  title: string,
  subtitle: string,
  actions: ReactNode
}

export const OnboardingScreen = observer(function OnboardingScreen() {
  const [signIn, setSignIn] = useState(false);
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const carouselRef = useRef<Carousel>(null);

  const cards: Array<OnboardingCardInterface> = [
    {
      title: "Bruh",
      subtitle: "You gotta sign in",
      actions: (
        <>
          <Button
            style={BUTTON}
            text="Log In"
            onPress={() => {
              if(_.get(carouselRef, "current.snapToNext") !== null) {
                setSignIn(true);
                carouselRef.current.snapToNext();
              }
            }}
          />
          <Button
            style={BUTTON}
            text="Sign Up"
            onPress={() => {
              if(_.get(carouselRef, "current.snapToNext") !== null) {
                carouselRef.current.snapToNext()
              }
            }}
          />
        </>
      )
    },
    {
      title: signIn ? "Log In" : "Register",
      subtitle: signIn ? "Welcome back!" : "Join the movement!",
      actions: <Auth fieldStyle={BUTTON} signIn={signIn} />
    }
  ]
  const index = 0;
  const item = cards[0];

  return (
    <Screen style={ROOT} preset="scroll">
      <Carousel
        ref={carouselRef}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width}
        data={cards}
        scrollEnabled={false}
        slideStyle={SCROLL_CONTAINER}
        renderItem={({item}, index) => (
          <Card key={index} style={CARD}>
            <View style={TITLE}>
              <Text preset="header" text={item.title} />
              <Text preset="default" text={item.subtitle} />
            </View>
            <View style={ACTIONS}>
              {item.actions}
            </View>
          </Card>
        )}
      />
    </Screen>
  )
})
