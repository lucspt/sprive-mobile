import { Pressable, StyleSheet, View } from "react-native";
import Text from "../../Text";
import css from "../../../styles";
import { MaterialIcons } from '@expo/vector-icons';
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { SaviorContext } from "../../../contexts/SaviorContext";
import { fetchData } from "../../../utils";
import Animated, {
   Easing,
   useAnimatedStyle, 
  useSharedValue, 
  withRepeat, 
  withSequence, 
  withTiming
 } from "react-native-reanimated";


const duration = 1000;
const easing = Easing.bezier(0.25, -0.5, 0.25, 1);
const delAngle = 10;
const delDuration = 100;
const delEasing = Easing.elastic(1.5);

export default function Star({ 
  stars,
  productInfo, 
  getStars, 
  onNeedsLogin,
  productId,
  // productStars,
 }) { 
  const { isLoggedIn } = useContext(SaviorContext);
  const [ canStar, setCanStar ] = useState(true);
  const isLiked = stars?.some(x => x.resource_id === productId);
  const [ addAnimation, deleteAnimation ] = [ useSharedValue(0), useSharedValue(0) ]
  // const [ starInc, setStarInc ] = useState(null);
  const animationStyle = useAnimatedStyle(() => ({
     transform: [
      {rotate: `${addAnimation.value * 360}deg`},
      {rotateZ: `${deleteAnimation.value}deg`},
    ]
  }));


  // useEffect(() => {
  //   if (starInc === null && typeof productStars === "number") {
  //     setStarInc(productStars)
  //   }
  // }, [productStars])

  async function star() {
    if (!canStar) return;
    if (isLoggedIn) {
      let res = isLiked
        ? await fetchData(
          `saviors/stars/${productId}`, "DELETE"
        )
        : await fetchData(
          `saviors/stars/${productId}`, "POST", productInfo
        );
        console.log(res)
        // isLiked 
        //   ? setStarInc(prev => prev - 1)
        //   : setStarInc(prev => prev + 1)
        getStars();
        setCanStar(false)
        if (!isLiked) {
          addAnimation.value = withRepeat(withTiming(1, { duration, easing }), 1);
        } else {
          addAnimation.value = 0;
          deleteAnimation.value = withSequence(
            withTiming(-delAngle, { duration: 50, easing: delEasing }),
            withRepeat(
              withTiming(delAngle, {
                duration: delDuration,
                easing: delEasing,
              }),
              3,
              true
            ),
            withTiming(0, { duration: 50, easing: delEasing })
          )
        }
        setTimeout(() => setCanStar(true), 1000)
    } else {
      onNeedsLogin();
    }
  };

  return productId && (
    <View style={styles.content}>
      {/* <Text style={styles.text}>{starInc?.toLocaleString()}</Text> */}
      <Animated.View style={animationStyle}>
        <Pressable onPress={star} >
          <MaterialIcons
            style={styles.star}
            name={isLiked ? "star" : "star-border"}
            size={19} 
            color={css.white}
            />
        </Pressable>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({

  content: {
    flexDirection: "row",
    gap: 5,
    textAlign: "center",
  },

  star: {
    alignSelf: "flex-end"
  },
  
  text: {
    color: css.white,
    fontSize: 13,
    paddingTop: 1
  }
})