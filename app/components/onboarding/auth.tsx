import React, { useState } from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, TextField } from "../"
import { flatten } from "ramda"

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
  onSubmit?: (userId: string, error?: string) => void
}

/**
 * Fields for authentication
 */
export const Auth = observer(function Auth(props: AuthProps) {
  const { style, signIn, fieldStyle } = props
  const styles = flatten([CONTAINER, style])
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const authenticate = () => {
    console.log("AUTHENTICATING");
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
      />
      <TextField
        style={fieldStyle}
        label="Password"
        onChangeText={setPassword}
        value={password}
        autoCompleteType="password"
        secureTextEntry={true}
        textContentType="password"
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
          />
        : null
      }
      <Button
        style={fieldStyle}
        text={signIn ? "Log In" : "Register"}
        onPress={() => authenticate()}
      />
    </View>
  )
})
