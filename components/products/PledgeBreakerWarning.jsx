import { Easing, StyleSheet, View } from "react-native";
import Text from "../Text";
import css from "../../styles";
import { useEffect } from "react";
import Animated, { FlipInXDown, FlipInXUp } from "react-native-reanimated";


const entering = FlipInXUp
.delay(css.productScreenAnimDelay)
.duration(500)
.springify(0)
.easing(Easing.exp)
export default function PledgeBreakerWarning({
  currentCo2e, pledgeCo2e, pledgeFrequency, productCo2e
}) {

  let warning;
  if (currentCo2e > pledgeCo2e) {
    if (pledgeFrequency === "day") {
      warning = "You have passed your pledge today!"
    } else {
      warning = `You have passed your pledge this ${pledgeFrequency}`
    } 
  } else {
    warning = "Logging will break your pledge!"
  }

  return warning && (
    <Animated.View style={styles.container} entering={entering}>
      <Text style={styles.warning}>{ warning }</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({

  container: {
    height: 35,
    width: "95%",
    borderRadius: 7,
    justifyContent: "center",
    backgroundColor: css.black,
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    zIndex: 11
  },

  warning: {
    color: css.ecoDanger,
    fontWeight: 700,

  }
})