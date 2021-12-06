import * as React from "react"
import { ActivityIndicator, StyleProp, ViewStyle } from "react-native"
import { Button } from "../"
import { observer } from "mobx-react-lite"
import { color } from "../../theme"
import { useStores } from "../../models"



export interface SubmitButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>,
  loadingState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  id: string,
  value: string,
  onSubmit?: () => void
}

/**
 * Describe your component here
 */
export const AttributeSubmitButton = observer(function SubmitButton(props: SubmitButtonProps) {
  const { style } = props

  const { userStore } = useStores();
  const submitAttribute = async () => {
      props.loadingState[1](true);
      const attr = {};
      attr[props.id] = props.value;
      await userStore.postAttributes(attr)
      props.loadingState[1](false);
  }

  return (
      <Button
          style={style}
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
})
