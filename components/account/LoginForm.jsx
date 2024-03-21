import { StyleSheet, View } from "react-native";
import TextInput from "../TextInput";
import css from "../../styles";
import Button from "../Button";
import Text from "../Text";
import { useRef } from "react";


export default function LoginForm({ 
  user,
  setUser, 
  style, 
  error,
  onSubmit,
  submitText="Login"
 }) {
  const onChangeText = (name, text) => {
    setUser(prev => {return {...prev, [name]: text}});
  }
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { username, password } = user;

  const onPress = () => {
    if (!username) {
      usernameRef.current.focus()
    } else if (!password) {
      passwordRef.current.focus()
    } else {
      onSubmit();
    }
  }
   
  return (
    <View style={[styles.form, style]}>
      <View style={{ gap: 20, }}>
      <TextInput 
        onChangeText={text => onChangeText("username", text)} 
        value={username}
        reactRef={usernameRef}
        placeholder="Username"
        style={styles.input}
      />
      <TextInput 
        onChangeText={text => onChangeText("password", text)} 
        value={password} 
        reactRef={passwordRef}
        placeholder="Password"
        style={styles.input}
        secureTextEntry={true}
      />
      </View>
      <View>
        { error && <Text style={styles.error}>{error}</Text>}
      </View>
      <Button
        containerStyle={[css.defaultBtn, styles.button]} 
        text={submitText} 
        onPress={onPress}
        disabled={!(username && password)}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    gap: 40,
    justifyContent: "center",
  },
  
  error: {
    alignSelf: "center",
    fontSize: 13.5,
    position: "absolute",
    color: css.ecoDanger
  },
  
  input: {
    color: "white",
    padding: 7,
    fontSize: 13,
    borderRadius: 4,
    paddingVertical: 10,
    backgroundColor: css.highlight,
  },

  button: {
  }
  

})