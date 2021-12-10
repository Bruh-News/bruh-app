import React, { useRef, useState } from "react"
import RNRestart from "react-native-restart";
import _ from "lodash";
import { observer } from "mobx-react-lite"
import { Dimensions, View, ViewStyle } from "react-native"
import { Screen, Button, Card, Text, Auth, ErrorCard } from "../../components"
import Carousel from "react-native-snap-carousel";
import { color } from "../../theme"
import { getQuestionCards, OnboardingCard } from "./onboarding-cards";

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
}

const CARD: ViewStyle = {
  minHeight: Dimensions.get("screen").height - 400,
  justifyContent: "space-between"
}

const TITLE: ViewStyle = {

}

export const OnboardingScreen = observer(function OnboardingScreen() {
  const [signIn, setSignIn] = useState(false);
  const [error, setError] = useState(false);
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const carouselRef = useRef<Carousel>(null);

  const cards: Array<OnboardingCard> = [
    {
      title: "Bruh",
      subtitle: "You gotta sign in",
      actions: () => (
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
                carouselRef.current.snapToNext();
              }
            }}
          />
        </>
      )
    },
    {
      title: signIn ? "Log In" : "Register",
      subtitle: signIn ? "Welcome back!" : "Join the movement!",
      actions: () => (
        <Auth fieldStyle={BUTTON} signIn={signIn} onSubmit={(err) => {
          if(err) {
            console.error(err);
            setError(true);
          } else if(signIn) {
            RNRestart.Restart();
          } else {
            carouselRef.current.snapToNext();
          }
        }} />
      )
    },
    ...getQuestionCards(carouselRef)
  ]

  return (
    <Screen style={ROOT} preset="scroll">
      {
        error ?
          <ErrorCard />
        :
          <Carousel
            ref={carouselRef}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width}
            data={cards}
            scrollEnabled={false}
            slideStyle={SCROLL_CONTAINER}
            renderItem={({item}, index) => {
              const Actions = item.actions;
              return (
              <Card key={index} style={CARD}>
                <View style={TITLE}>
                  <Text preset="header" text={item.title} />
                  <Text preset="default" text={item.subtitle} />
                </View>
                <View style={ACTIONS}>
                  <Actions />
                </View>
              </Card>
              )
            }}
          />
      }
    </Screen>
  )
})
