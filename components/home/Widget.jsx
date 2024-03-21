import { Modal, StyleSheet, View } from "react-native"
import css from "../../styles"
import Text from "../Text"


export default function Widget({ style, title, digit, isMember }) {

  return (
    <View style={[styles.widget, style]}>
      <Text style={styles.title}>
        { title }
      </Text>
      <Text style={styles.bigDigit}>{digit}</Text>
    </View>
  )
}

const styles = StyleSheet.create({


  widget: {
    ...css.widget,
    gap: 8,
    position: "relative",
    justifyContent: "center",
  },


  bigDigit: {
    fontWeight: 600
  },

  blur: {
    opacity: 0.7,
  },

  title: {
    fontSize: css.smallFont,
  },

  image: {
    position: "absolute",
    height: "100%",
    width: "100%",
    overflow: "hidden",
    backgroundColor: css.black
  },

  blurContainer: {
    backgroundColor: css.black,
    overflow: "hidden",
  },

})
