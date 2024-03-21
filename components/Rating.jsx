import { StyleSheet, View } from "react-native"
import Text from "./Text"
import { getRatingText, scaleFont  } from "../utils"
import css from "../styles"

export default function Rating({ 
  rating, 
  badgeStyle,
  textStyle={fontSize: 13.7},
  style,
  hideText
 }) {
  
  return (
    <View style={[styles.ratingContainer, style]}>
    <View style={[styles.rating, {backgroundColor: css[rating]}, badgeStyle]} />
      {!hideText && <Text style={textStyle}>{getRatingText(rating || "B")}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  rating: {
    height: 10,
    width: 10,
    borderRadius: 5
  },

  ratingContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start"
  },
  
  text: {
    fontSize: css.defaultFont
  }
})