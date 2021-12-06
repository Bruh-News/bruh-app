import React, { ReactNode, useState } from "react";
import RNRestart from "react-native-restart";
import { ViewStyle } from "react-native";
import { TextField, Button, SubmitButton } from "../../components";
import Carousel from "react-native-snap-carousel";

export interface OnboardingCard {
    title: string,
    subtitle: string,
    actions: ReactNode
}

const FIELD: ViewStyle = {
    marginVertical: 8
}

const SUBMIT: ViewStyle = {
    marginTop: 32
}

export const getQuestionCards = (carouselRef: React.MutableRefObject<Carousel>): Array<OnboardingCard> => {

    /**
     * Profile Cards
     */

    // TBD

    /**
     * Attribute Cards
     */

    const politicalLeaning: OnboardingCard = {
        title: "Political Leaning",
        subtitle: "progressive, conservative, anarchist, capitalist, anarchocapitalist? Whatever direction you want.",
        actions: () => {
            const loadingState = useState(false);
            const [pl, setPL] = useState("");

            return (
                <>
                    <TextField
                        style={FIELD}
                        label="Political Leaning"
                        onChangeText={setPL}
                        value={pl}
                        editable={!loadingState[0]}
                    />
                    <SubmitButton
                        style={SUBMIT}
                        loadingState={loadingState}
                        id="politicalleaning"
                        value={pl}
                        onSubmit={() => carouselRef.current.snapToNext()}
                    />
                </>
            )

        }
        
    }

    /**
     * Finishing Card
     */
    const finishingCard: OnboardingCard = {
        title: "You're good to go!",
        subtitle: "Get ready to question your own beliefs and understand the rest of humanity.",
        actions: () => {
            return (
                <Button
                    style={SUBMIT}
                    text="Enter"
                    onPress={() => RNRestart.Restart()}
                />
            )
        }
    }

    return [
        politicalLeaning,
        finishingCard
    ]
}