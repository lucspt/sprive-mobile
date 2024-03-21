import Animated, { Easing, useAnimatedProps, useSharedValue, withDelay, withTiming } from "react-native-reanimated"
import { G, Rect, Text } from "react-native-svg"
import css from "../../styles";
import { useEffect } from "react";
import { View } from "react-native";

const AnimatedRect = Animated.createAnimatedComponent(Rect);
export default function AnimatedBar({ 
  height=100, 
  fill=css.ecoNeutral, 
  duration=400,
  easing=Easing.linear,
  delay=0,
  x=0,
  radius=5,
  width=10,
  ...props 
}) {
  const animatedHeight = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    height: withDelay(delay, withTiming(animatedHeight.value, { duration, easing }))
  }));
  useEffect(() => {
    animatedHeight.value = height;
  }, [height]) 
  
  return (
      <AnimatedRect
        fill={fill} 
        rx={radius}
        width={width}
        animatedProps={animatedProps}
        { ...props }
        x={x}
        />
  ) 
}