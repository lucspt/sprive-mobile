import { StyleSheet, View } from "react-native"
import Text from "./Text"
import Button from "./Button"
import css from "../styles";

export default function NoData({ 
  titleText, 
  buttonText="search products", 
  onPress,
  style={}
 }) {

  return (
    <View style={[styles.dataEmpty, style]}>
      <Text style={styles.title}>{titleText}</Text>
      <Button
        text={buttonText}
        textColor={css.white}
        style={styles.button}
        onPress={onPress}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  dataEmpty: {
    gap: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flexGrow: 1,
    paddingBottom: 50,
  },

  title: {
    fontWeight: 700,
    fontSize: 15,
  },

  button: {
    paddingVertical: 7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: css.black,
    paddingHorizontal: 20,
    borderRadius: 4,
    borderWidth: .2,
  }
})