import { memo, useContext, useEffect } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import css from "../styles";
import Text from "./Text";
import { formatCO2e } from "../utils";
import { FontAwesome } from '@expo/vector-icons';
import { BorderlessButton, Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { 
  Easing,
  useAnimatedStyle, 
  useSharedValue,
  withTiming,
  withDelay,
  runOnJS,
  SlideInLeft,
  SlideInRight,
 } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

const easing = Easing.ease
const expEasing = Easing.exp
const duration = 200
BAR_HIDE = 100
BUTTON_HIDE = -100
BUTTON_SHOW = 15
BAR_SHOW = 0
// const entering = SlideInRight.delay(400).duration(300).damping(0).stiffness(0)
const AnimatedButton = Animated.createAnimatedComponent(BorderlessButton);
async function setShouldHide(shouldHide) {
  await AsyncStorage.setItem("hideStats", JSON.stringify(shouldHide));
}

const StatsBar = memo(function StatsBar({ 
  currentCO2e, 
  setShowing=() => null, 
  currentCO2eLabel,
  pledgeCO2e,
  productCO2e,
 }) {

  const posOffset = useSharedValue(BAR_HIDE);
  const showButton = useSharedValue(BUTTON_HIDE);
  const scale = useSharedValue(1);
  const width = useWindowDimensions().width - 15;
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateY: posOffset.value}, 
      { scale: scale.value }
    ],
  }));

  const showButtonStyle = useAnimatedStyle(() => ({ right: showButton.value }));
  
  const onShowHide = (isShowing) => {
    if (isShowing) {
      setShouldHide(false);
      setShowing(true);
    } else {
      setShouldHide(true);
      setShowing(false);
    }
  }


  useEffect(() => {
    async function hideIfShould() {
      const shouldHide = await AsyncStorage.getItem("hideStats");
        if (JSON.parse(shouldHide)) {
          posOffset.value = BAR_HIDE;
          showButton.value = BUTTON_SHOW;
          setShowing(false);
        } else {
          posOffset.value = withDelay(css.productScreenAnimDelay,
            withTiming(BAR_SHOW, { duration }, (shown) => {
            shown && runOnJS(setShowing)(true);
          }));
          showButton.value = withTiming(BUTTON_HIDE, { easing, duration });
        }
      }
      hideIfShould();
  }, []);

  const hide = Gesture.Pan()
  .onBegin(() => {
    scale.value = withTiming(1.01, {
      easing,
      duration: 150
    })
  })
  .onEnd(e => {
    if (e.translationY > 0) {
      posOffset.value = withTiming(
        BAR_HIDE, { easing: expEasing, duration }, (isHidden) => {
          if (isHidden) {
            runOnJS(onShowHide)(false);
          }
      });
      showButton.value = withDelay(180, 
        withTiming(BUTTON_SHOW, { easing, duration })
      );
    }
  })
  .onFinalize(() => {
    scale.value = withTiming(1, {
      easing: Easing.ease,
      duration: 200
    })
  })

  function showEmissions() {
    posOffset.value = withDelay(180, 
      withTiming(
        BAR_SHOW, { easing, duration }, () => {
          runOnJS(onShowHide)(true);
    }));
    showButton.value = withDelay(70,
      withTiming(BUTTON_HIDE, { easing, duration })
    );
  } 

  let remainingCO2e;
  if (pledgeCO2e === undefined) {
    remainingCO2e = "N/A"
  } else {
    remainingCO2e = currentCO2e > pledgeCO2e ? `0 kg` : formatCO2e(pledgeCO2e - currentCO2e, 1).join(" ");
  }

  currentCO2e = formatCO2e(currentCO2e, 0).join(" ");

  return (
    <View>
      <GestureDetector gesture={hide}>
        <Animated.View style={[styles.container, animatedStyle, {width: width}]}>
          <View 
            style={styles.statRow} 
            accessibilityActions={["press and swipe downwards"]}
            accessibilityLabel="hide emissions tracker"
            accessible
            accessibilityRole="summary"
            >
            <Text style={styles.stat}>{ currentCO2eLabel }</Text>
            <Text style={styles.stat}>{currentCO2e}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.stat}>Pledge remaining</Text>
            <Text style={styles.stat}>{remainingCO2e || "N/A"}</Text>
          </View>
        </Animated.View>
      </GestureDetector>
      <AnimatedButton 
        style={[styles.showButton, showButtonStyle]}
        onPress={showEmissions}
      >
        <View
          accessible
          accessibilityLabel="show emissions tracker"
          accessibilityRole="button"
        >
          <FontAwesome name="angle-double-up" size={32} color={css.secondary} />
        </View>
      </AnimatedButton>
    </View>
  )
});

const styles = StyleSheet.create({

  container: {
    ...css.boxShadow,
    position: "absolute",
    flexGrow: 1,
    backgroundColor: css.black,
    shadowRadius: 3,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 80,
    bottom: 0,
    borderRadius: 5,
    alignSelf: "center",
    justifyContent: "space-evenly"
  },

  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  stat: {
    fontWeight: 700,
    fontSize: 15
  },

  showButton: {
    alignItems: "center",
    position: "absolute",
    bottom: 15,
    right: 15,
    justifyContent: "center",
    alignSelf: "flex-end",
  }
})

export default StatsBar