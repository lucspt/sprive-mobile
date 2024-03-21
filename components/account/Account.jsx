import { Platform, StyleSheet, View } from "react-native";
import Button from "../Button";
import css from "../../styles";
import { useContext } from "react";
import { SaviorContext } from "../../contexts/SaviorContext";
import Text from "../Text";
import SaviorDeactivator from "./SaviorDeactivator";
import SaviorInitiatorButton from "./initiator/SaviorInitiatorButton";
import LogoutButton from "./LogoutButton";

export default function Account({ navigation }) {

  const { logout, savior } = useContext(SaviorContext);

  const { navigate } = navigation
  
  return (
    <View style={styles.container}>
      <View style={styles.save}>
      </View>
      <View style={styles.top}>
        <View style={styles.profilePicture}>
          <Text style={styles.profileLetter}>{savior.username.charAt(0)}</Text>
        </View>
      </View>
      <View style={styles.bottom}>
      <View style={styles.form}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Email</Text>
          <Button 
            style={styles.input} 
            containerStyle={styles.fieldButton}
            onPress={() => navigate("edit", { field: "email" })} 
            text={savior.email}
          /> 
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Username</Text>
          <Button 
            containerStyle={styles.fieldButton}
            style={styles.input} 
            onPress={() => navigate("edit", { field: "username" })} 
            text={savior.username}
          />
        </View>
        <View style={styles.member}>
          {savior.spriving 
            ? <SaviorDeactivator />
            : <SaviorInitiatorButton navigate={navigation.navigate}/>
          }
        </View>
      </View>
      <LogoutButton />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },

  top: {
    flex: 1 / 3,
    justifyContent: "center",
    alignItems: "center",
  },

  profilePicture: {
    width: 140,
    alignItems: "center",
    justifyContent: "center",
    height: 140,
    borderRadius: 40,
    backgroundColor: css.black
  },

  profileLetter: {
    fontWeight: 600,
    fontSize: 50,
    color: css.secondary,

  },

  bottom: {
    flex: 1,
    paddingTop: 30,
    justifyContent: "space-between",
  },

  form: {
    width: "100%",
    flex: 1,
  },

  inputWrapper: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 60,
    width: "100%",
    backgroundColor: css.primary,
    borderTopColor: css.black,
    borderBottomColor: css.black,
  },

  label: {
    alignSelf: "flex-end",
    paddingVertical: 10,
    flexBasis: 75
  },

  input: {
    ...css.border,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    backgroundColor: css.primary,
    borderBottomWidth: .4,
    width: "100%",
    paddingVertical: 10,
    justifyContent: "center"
  },

  fieldButton: {
    flex: 1,
  },

  save: {
    fontWeight: 800,
    fontSize: 18,
    height: 40,
    alignSelf: "flex-end",
    paddingRight: 20,
    paddingTop: 15
  },

  member: {
    paddingTop: 120
  },

  invalidWrapper: {
    flexDirection: "column",
    gap: 10,
    paddingTop: 10,
    flex: 1
  },
  
  invalid: {
    position: "absolute",
    bottom: -30,
    fontSize: 11.5,
    color: css.ecoDanger
  }

})