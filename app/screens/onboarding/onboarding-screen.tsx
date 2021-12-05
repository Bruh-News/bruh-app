import React, { ReactNode, useRef } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, View, ViewStyle } from "react-native"
import { Screen, Button, Card, Text } from "../../components"
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

const BUTTON: ViewStyle = {
  marginVertical: 8
}

const ACTIONS: ViewStyle = {
  justifyContent: "flex-end"
}

const CARD: ViewStyle = {
  minHeight: 300,
  justifyContent: "space-between"
}

const TITLE: ViewStyle = {

}

export const OnboardingScreen = observer(function OnboardingScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const carouselRef = useRef();

  const cards: Array<{
    title: string,
    subtitle: string,
    actions: ReactNode
  }> = [
    {
      title: "Bruh",
      subtitle: "You gotta sign in",
      actions: (
        <>
          <Button style={BUTTON} text="Log In" />
          <Button style={BUTTON} text="Sign Up" />
        </>
      )
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
