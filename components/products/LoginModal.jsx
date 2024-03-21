import { Modal, Pressable, StyleSheet, View } from "react-native";
import Login from "../account/Login"
import { Dimensions } from "react-native";
import LoginForm from "../account/LoginForm";
import { useState } from "react";
import css from "../../styles";
import Text from "../Text";


export default function LoginModal() {

  // const modalHeight = Dimensions.get("window").height;
  const [ user, setUser ] = useState({username: "", email: "", password: ""});


  return (
    <View style={styles.modal}>
      <View style={styles.slideIndicator} />
      <Login user={user} setUser={setUser} />
    </View>
  )
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "flex-end",
    height: "90%",
    backgroundColor: css.primary,
  },

  slideIndicator: {
    height: 5,
    width: 70,
    marginTop: 10,
    backgroundColor: css.gray,
    borderRadius: 2.5,
    alignSelf: "center"
  }
})