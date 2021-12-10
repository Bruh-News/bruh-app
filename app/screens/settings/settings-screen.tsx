import React, { useEffect, useState } from "react"
import RNRestart from "react-native-restart";
import { observer } from "mobx-react-lite"
import { ActivityIndicator, TextStyle, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import * as Storage from "../../utils/storage";
import { useStores } from "../../models"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.offWhite,
  flex: 1,
  padding: 16
}
const TITLE: TextStyle = {
  color: color.palette.forest
}
const SUBMIT: ViewStyle = {
  marginTop: 8
}

export const SettingsScreen = observer(function SettingsScreen() {
  // Pull in one of our MST stores
  const { userStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const [numPosts, setNumPosts] = useState("");
  const [loading, setLoading] = useState(true);
  const [touched, setTouched] = useState(false);

  const save = async () => {
    setLoading(true);
    await userStore.saveSettings(Number.parseInt(numPosts));
    RNRestart.Restart();
  }

  useEffect(() => {
    (async () => {
      const setting = await userStore.getSettings();
      setNumPosts(setting.toString());
      setLoading(false);
    })();
  }, []);

  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" style={TITLE} text="Settings" />
      {
        loading ?
          <ActivityIndicator color={color.palette.white} size="large" />
        :
          <>
            <TextField
              // style={fieldStyle}
              label="Posts per Page"
              onChangeText={(val) => {
                if(val !== null) {
                  setTouched(true);
                  setNumPosts(val)
                }
              }}
              value={numPosts.toString()}
              keyboardType="numeric"
              editable={!loading}
            />
            <Button
              style={{
                ...SUBMIT,
                backgroundColor: touched ? color.palette.lightForest : color.palette.lightGrey
              }}
              disabled={!touched}
              children={
                loading ?
                  <ActivityIndicator color={color.palette.white} size="large" />
                : null
              }
              text="Save Changes"
              onPress={save}
            />
          </>
      }
    </Screen>
  )
})
