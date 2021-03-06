import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, View, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { useStores } from "../../models"
import Snackbar from "react-native-snackbar"
import { useNavigation } from "@react-navigation/native"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
  margin: 24
}

const CONTAINER: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
  margin: 24,
  justifyContent:"space-between"
}

const BUTTON: ViewStyle = {
  marginVertical: 8,
  justifyContent: "flex-end"
}

const HEADER: ViewStyle = {
  
}

const ACTIONS: ViewStyle = {
  marginVertical: 8,
  justifyContent: "flex-end"
}

export const CreatePostScreen = observer(function CreatePostScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const navigation = useNavigation();
  const { userStore } = useStores();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const post = () => {
    setLoading(true);
    const newPost = {
       postText: text
    }
    userStore.createPost(newPost)
      .then(() => {
        setText("");
        Snackbar.show({
          text: "Successfully created post!",
          duration: Snackbar.LENGTH_LONG
        });
        navigation.navigate('feed');
        setText("");
        setLoading(false);
      }).catch((e) => {
        console.error(e);
        Snackbar.show({
          text: "Error creating post! Please try again later or contact support for assistance.",
          duration: Snackbar.LENGTH_LONG
        });
        setLoading(false);
      });
  }

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <View style={CONTAINER}>
        <View style={HEADER}>
          <Text preset="header" text="Create New Post" />
          <Text preset="default" text="Get your opinion out there!" />
        </View>
        <TextField
          style={BUTTON}
          label="Text"
          onChangeText={setText}
          value={text}
          editable={!loading}
          maxLength={280}
        />
        <View style={ACTIONS}>
          <Button
            style={BUTTON}
            text={
              loading ? null : "Post"
            }
            children={
              loading ?
                <ActivityIndicator color={color.palette.white} size="large" />
              : null
            }
            onPress={() => post()}
            disabled={loading}
          />
        </View>
      </View>
    </Screen>
  )
})
