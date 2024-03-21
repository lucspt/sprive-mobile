import { View } from "react-native"
import Button from "./Button";
import { StyleSheet } from "react-native";
import Text from "./Text";
import css from "../styles";


export default function SuggestLoginButton({
  text="It's looking empty here...",
  style={},
  navigate,
  ...props
}) {

  return (
    <View {...props} style={[styles.container, style]}>
      <Text style={{fontWeight: 600, fontSize: 16}}>{text}</Text>
      <Button 
        containerStyle={{ borderRadius: 15, }}
        style={[css.defaultBtn, styles.loginButton]} 
        text="Login" 
        onPress={() => navigate("account", {screen: "login"})}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
    height: "100%",
  }
})