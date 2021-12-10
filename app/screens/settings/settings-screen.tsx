import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import * as Storage from "../../utils/storage";

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
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const [numPosts, setNumPosts] = useState(7);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  const save = async () => {
    await Storage.saveString("PostsPerPage", numPosts.toString());
    setLoading(false);
  }

  useEffect(() => {
    Storage.loadString("PostsPerPage")
      .then((val) => {
        if(val !== null) {
          setNumPosts(Number.parseInt(val));
        } else {
          throw NaN;
        }
        setLoading(false);
      }).catch(() => {
        setNumPosts(7);
        Storage.saveString("PostsPerPage", "7");
        setLoading(false);
      });
  });

  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text="Settings" />
      {
        loading ?
          <ActivityIndicator color={color.palette.white} size="large" />
        :
          <>
            <TextField
              // style={fieldStyle}
              label="Posts per Page"
              onChangeText={(val) => {
                setTouched(true);
                setNumPosts(Number.parseInt(val))
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
