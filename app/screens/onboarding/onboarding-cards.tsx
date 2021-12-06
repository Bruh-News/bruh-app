import React, { ReactNode, useState } from "react";
import { ActivityIndicator } from "react-native";
import { TextField, Button } from "../../components";
import { color } from "../../theme";

export interface OnboardingCard {
    title: string,
    subtitle: string,
    actions: ReactNode
}

const Submit = (props: {
    loadingState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
    id: string,
    value: string
}) => {
    const submitAttribute = () => {
        console.log("SUBMIT ATTRIBUTE " + props.id + ": " + props.value);
    }

    return (
        <Button
            text={props.loadingState[0] ? null : "Next"}
            children={
                props.loadingState[0] ?
                    <ActivityIndicator color={color.palette.white} size="large" />
                : null
            }
            onPress={() => submitAttribute()}
            disabled={props.loadingState[0]}
        />
    )
}

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
                    label="Political Leaning"
                    onChangeText={setPL}
                    value={pl}
                    editable={!loadingState[0]}
                />
                <Submit loadingState={loadingState} id="politicalleaning" value={pl}/>
            </>
        )

    }
    
}

export const questions: Array<OnboardingCard> = [
    politicalLeaning
]