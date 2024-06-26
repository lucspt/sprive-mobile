import { StyleSheet, View } from "react-native";
import css from "../../styles";
import EditEmail from "./EditEmail";
import EditUsername from "./EditUsername";


export default function Edit({ navigation, route }) {
  const { params: { field } } = route

  return field === "email" 
    ? <EditEmail navigation={navigation} /> 
    : field === "username" && <EditUsername navigation={navigation}/>
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 5,
  },

  form: {
    gap: 40,
    flex: 1
  },

  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 30,
    paddingHorizontal: 20,
  },

  label: {
    flex: 0.4,
    alignSelf: "flex-end",
    paddingBottom: 5
  },

  input: {
    borderBottomColor: "#252525",
    backgroundColor: css.primary,
    borderBottomWidth: 2,
    flex: 1,
  },

  save: {
    fontWeight: 800,
    fontSize: 18,

  }
})