import { StyleSheet, View } from "react-native";
import Star from "./Star";
import css from "../../../styles";
import CO2eLogger from "./CO2eLogger";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { useContext, useEffect } from "react";
import Text from "../../Text";
import { StatsBarContext } from "../../../contexts/StatsBarContext";

function willBreakPledge(currentCO2e, productCO2e, pledgeCO2e) {
  return pledgeCO2e - (currentCO2e + productCO2e)
} 
export default function ActionsBar({ stars, product, navigate, getStars, }) {

  const onNeedsLogin = () => navigate("login");

  const height = useSharedValue(0);

  useEffect(() => {
    height.value = withDelay(css.productScreenAnimDelay, withTiming(60, { duration: 300 }));

    return () => height.value = 0;
  }, []);

  const heightAnim = useAnimatedStyle(() => ({
    height: height.value
  }));

  const { productId, stars: productStars, ...productInfo } = product;

  return (
    <Animated.View style={[styles.container, heightAnim]}>
      <Star 
        stars={stars}
        product={product}
        getStars={getStars}
        productStars={productStars}
        productId={productId}
        productInfo={productInfo}
        onNeedsLogin={onNeedsLogin}
      />
      <CO2eLogger 
        productId={productId} 
        navigate={navigate} 
        productInfo={productInfo}
        onNeedsLogin={onNeedsLogin}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    textAlign: "center",
    flexDirection: "row",
    backgroundColor: css.primary,
    textAlignVertical: "center",
    justifyContent: "flex-end",
    paddingRight: 17,
    ...css.boxShadow,
    shadowColor: css.black,
    flexGrow: 1,
    borderTopColor: css.highlight,
    borderTopWidth: 1,
    gap: 17,
    alignItems: "center",
    shadowRadius: 20,
  },

})