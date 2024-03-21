import { StyleSheet, TextInput, View } from "react-native"
import { Circle, G, Svg, Text } from "react-native-svg"
import css from "../../styles"
import Animated, { 
  Easing, useAnimatedProps, useSharedValue, withTiming, createAnimatedPropAdapter, withDelay
 } from "react-native-reanimated";
import { useEffect } from "react";
import { formatCO2e } from "../../utils";
import { useIsFocused } from "@react-navigation/native";


const getStrokeColor = (percentage) => {
  return (
  percentage > 80
    ? css.ecoDanger
    : percentage > 49 ? css.ecoNeutral
    : css.ecoGreat
)}
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const duration = 1000;
const easing = Easing.ease;
export default function Doughnut({
  radius=75, 
  currentEmissions, 
  pledgeCo2e, 
  strokeWidth=15
}) {
 
  if (currentEmissions === undefined) return;
  const circumference = 2 * Math.PI * radius;
  const animatedStroke = useSharedValue(circumference);
  const percentage = Math.min(100, (currentEmissions / pledgeCo2e) * 100);
  const size = radius * 2
  const halfCircle = radius + strokeWidth;
  const viewBox = halfCircle * 2
  const strokeDashOffset = circumference - (circumference * percentage) / 100;
  const isFocused = useIsFocused();

  const PROPS = {
    cy: "50%",
    cx: "50%",
    fill: "none",
    r: radius,
    strokeWidth: strokeWidth,
    stroke: getStrokeColor(percentage)
  }
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: withTiming(animatedStroke.value, { duration, easing })
  }));

  useEffect(() => {
    if (isFocused && currentEmissions !== undefined) {
      animatedStroke.value = strokeDashOffset;
    }
  }, [currentEmissions, pledgeCo2e, isFocused]);

  return (
    <View style={styles.container}>
    <Svg 
      height={size} width={size}
      viewBox={`0 0 ${viewBox} ${viewBox}`}
      preserveAspectRatio="xMidyMid meet"
    >
      <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
        <Circle
          {...PROPS}
          strokeOpacity={0.3}
        />
        <AnimatedCircle
          {...PROPS}
          strokeDasharray={circumference}
          animatedProps={animatedProps}
        />
      </G>
      <Text 
        y="50%"
        dy=".3em"
        x="50%"
        textAnchor="middle"
        fontWeight={600}
        fontSize={radius / 2.5}
        fill={css.secondary}
        children={formatCO2e(currentEmissions).join(" ")}
        underlineColorAndroid="transparent"
        editable={false}
      />
    </Svg>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1
  },

  // label: {
  //   ...StyleSheet.absoluteFillObject,
  //   color: css.secondary,
  //   textAlign: "center",
  //   fontWeight: css.bold,
  // }
})