import { StyleSheet, View } from "react-native";
import Text from "../Text";
import { formatCO2e } from "../../utils";
import css from "../../styles";
import Animated, { 
  Easing,
  useAnimatedStyle, 
  withDelay, 
  withTiming
 } from "react-native-reanimated";
import { useMemo } from "react";

const HEIGHT = 25;
const duration = 100;
const linkDuration = duration * 3;
const easing = Easing.ease;
const exp = Easing.exp
const fadeInDuration = duration * 2;
const ITEM_GAP = 25
const fadeOutDuration = duration - 30
export default function ProductProcess({ 
  activity, 
  co2e, 
  rating, 
  expanded,
  index,
  isLast
}) {
  const indexDelay = duration * index

  const badgeStyle = useAnimatedStyle(() => ({
    transform: [{
      scale: withDelay(indexDelay, withTiming(expanded ? 1 : 0))
    }]
  }))

  const fadeStyle = useAnimatedStyle(() => {
    return expanded
      ? {
        opacity: withDelay(indexDelay,
          withTiming(1, {duration: fadeInDuration, easing: exp})
        )
      } 
      : {
        opacity: withTiming(0, {duration: fadeOutDuration, easing})
      }})

  if (!isLast) {
    processLinkAnim = useAnimatedStyle(() => (
      expanded ? {
      height: withDelay(linkDuration + index + 1, withTiming(HEIGHT + ITEM_GAP))
    } : {
      height: withTiming(0)
    }
    ));
  }
  const _co2e = useMemo(() => formatCO2e(co2e).join(" "), [co2e]);
  return (
    <>
      <Animated.View style={[styles.container, fadeStyle]}>
        <Animated.View 
          style={[styles.dot, { backgroundColor: css[rating] }, badgeStyle]}
        />
        <View style={styles.details}>
          <Text style={styles.activity}>{activity}</Text>
          <Text style={styles.emissions}>{_co2e}</Text>
        </View>
      </Animated.View>
      { !isLast && 
        <Animated.View 
          style={[styles.processLink, processLinkAnim, {backgroundColor: css[rating]}]}
        />
    }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 25,
    height: HEIGHT,
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },

  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },

  details: {
    width: "78%",
    flexDirection: "row",
    alignItems: "center",
    textAlignVertical: "center",
    justifyContent: "space-between",
  },

  activity: {
    fontSize: css.smallFont,
  },

  emissions: {
    ...css.co2eDigit, 
    fontSize: 14,
    alignSelf: "center"
  },

  processLink: {
    width: 5, 
    zIndex: -1,
    borderRadius: 15,
    position: "absolute",
    top: "100%",
    left: 5.5,
    marginTop: -10
  }
})