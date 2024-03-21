import { Dimensions, StyleSheet, useWindowDimensions } from "react-native"
import css from "../../styles"
import { View } from "react-native"
import Text from "../Text"
import Animated from "react-native-reanimated";


export default function Feature({ Icon, title, description, entering=null }) {

  const width = useWindowDimensions().width - 120
  return (
    <Animated.View style={[styles.container, { width }]} entering={entering}>
      <Icon />
      <View style={styles.info}>
        <Text style={styles.title}>{ title }</Text>
        <Text style={[styles.description]}>{description}</Text>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    gap: 17
  },

  info: {
    gap: 7,
    maxWidth: 260,
  },

  title: {
    fontWeight: css.bold,
    fontSize: css.mediumFont,
  },

  description: {
    lineHeight: 25
  }
})