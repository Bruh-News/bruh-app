import React, { useState } from "react"
import { ActivityIndicator, StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, TextField } from "../"
import { flatten } from "ramda"
import { useStores } from "../../models"
import { color } from "../../theme"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

export interface AuthProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>,
  fieldStyle?: StyleProp<ViewStyle>,
  signIn?: boolean
  onSubmit?: (userId: number, error?: string) => void
}

/**
 * Fields for authentication
 */
export const Auth = observer(function Auth(props: AuthProps) {
  const { style, signIn, fieldStyle, onSubmit } = props
  const styles = flatten([CONTAINER, style])
  const { userStore } = useStores();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const authenticate = () => {
    setLoading(true);
    if(signIn) {
      // TBD
    } else {
      userStore.registerUser(username, password, email)
        .then(() => {
          onSubmit(userStore.user.id);
        })
        .catch((e) => {
          onSubmit(null, e);
        })
        .finally(() => {
          setLoading(false);
        })
    }

  }

  return (
    <View style={styles}>
      <TextField
        style={fieldStyle}
        label="Username"
        onChangeText={setUsername}
        value={username}
        autoCompleteType="username"
        textContentType="username"
        editable={!loading}
      />
      <TextField
        style={fieldStyle}
        label="Password"
        onChangeText={setPassword}
        value={password}
        autoCompleteType="password"
        secureTextEntry={true}
        textContentType="password"
        editable={!loading}
      />
      {
        !signIn ?
          <TextField
            style={fieldStyle}
            label="Email"
            onChangeText={setEmail}
            value={email}
            autoCompleteType="email"
            textContentType="emailAddress"
            editable={!loading}
          />
        : null
      }
      <Button
        style={fieldStyle}
        text={
          loading ?
            null
          :
            signIn ? "Log In" : "Register"
        }
        children={
          loading ?
            <ActivityIndicator color={color.palette.white} size="large" />
          : null
        }
        onPress={() => authenticate()}
        disabled={loading}
      />
    </View>
  )
})
