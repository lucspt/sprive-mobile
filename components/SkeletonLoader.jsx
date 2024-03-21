import { useCallback, useEffect, useMemo, useState } from "react";
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from "react-native-reanimated"
import { StyleSheet, View } from "react-native";
import css from "../styles"
import { LinearGradient } from "expo-linear-gradient";

const { skeletonGradient } = css
export default function SkeletonLoader({ 
  style={},
  easing=Easing.in, 
  duration=1000, 
  bgColor=css.highlight,
  fgColor=css.gray,
  borderRadius=10,
  width,
  delay=700,
  height,
  containerStyle={},
  ...props
  }) {

  const anim = useSharedValue(0);
  const [ _width, setWidth ] = useState(null);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ 
      translateX: interpolate(anim.value, [0, 2], [-_width * 2, _width * 2])
    }],
  }));

  useEffect(() => {
    anim.value = withRepeat(
      withDelay(
        delay, 
        withTiming(2, { duration, easing })
      ),
    -1, 
    false
  )
  }, []);
  
  return (
    <View 
      accessibilityLabel="loading"
      accessibilityRole="none"
      accessible={false}
      style={[ 
        styles.background, 
        {
          backgroundColor: bgColor, 
          width: width, 
          height: height,
          borderRadius: borderRadius
        }, 
        style, 
      ]} 
      onLayout={({ nativeEvent }) => setWidth(nativeEvent.layout.width)}
      {...props}
    >
      <Animated.View 
        style={[
          animatedStyle, 
          styles.foreground,
          {borderRadius: borderRadius},
          containerStyle
          ]}
        >
        <LinearGradient
          colors={skeletonGradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.foreground}
        />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    overflow: "hidden"
  },
  foreground: {
    height: "100%",
  }
})