import { Pressable } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import { fetchData } from "../../../utils";
import {  useContext, useEffect, useState } from "react";
import LoggerModal from "./LoggerModal";
import { SaviorContext } from "../../../contexts/SaviorContext";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat,
  withTiming,
  withSequence,
  Easing,
 } from "react-native-reanimated";
import css from "../../../styles";
import { StatsBarContext } from "../../../contexts/StatsBarContext";
import IconButton from "../../IconButton";

const animationTime = 70
export default function CO2eLogger({ productId, navigate }) {

  const [ logInfo, setLogInfo ] = useState({value: 1, product_id: productId});
  const { getCurrentStats, timesLogged, setTimesLogged } = useContext(StatsBarContext);
  const [ showModal, setShowModal ] = useState(false);
  const shakeOffset = useSharedValue(0);
  const { isLoggedIn, savior } = useContext(SaviorContext);
  const [ canCalculate, setCanCalculate ] = useState(true);
  const shakeAnimation = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeOffset.value }]
  }));

  const calculateEmissions = async () => {
    if (!canCalculate) return
    else if (!isLoggedIn) {
      navigate("login");
    } else if ((!savior.spriving && timesLogged > 3)) {
      setShowModal(false);
      navigate("sprive");
    } else {
      setCanCalculate(false);
      const res = await fetchData(
        `saviors/logs`, 
        "POST",
        logInfo 
      );
      showModal && setShowModal(false);
      setLogInfo(prev => ({...prev, value: 1}));
      notifyCalculation();
      setTimesLogged(prev => prev + 1);
      getCurrentStats();
      setTimeout(() => setCanCalculate(true), 1000)
    }
  }

  const notifyCalculation = () => {
    shakeOffset.value = withSequence(
      withTiming(5, {
        duration: animationTime / 2,
        easing: Easing.linear,
      }),
      withRepeat(
        withTiming(-5, {
        duration: animationTime,
        easing: Easing.linear
      }), 2, true),
      withTiming(0, {
        duration: animationTime / 2,
        easing: Easing.linear
      })
    )
  }

  return (
    <>
      <LoggerModal 
        hide={() => setShowModal(false)}
        visible={showModal}
        setVisible={setShowModal}
        value={logInfo.value.toString()}
        calculateEmissions={calculateEmissions}
        setLogInfo={setLogInfo}
      />
      <Animated.View style={shakeAnimation}>
        <IconButton 
          buttonProps={{activeOpacity: 1}}
          accessibilityLabel="log emissions"
          accessibilityRole="button"
          onLongPress={() => setShowModal(true)}
          onPress={calculateEmissions}
          >
          <MaterialIcons name="co2" size={32} color={css.secondary} />
        </IconButton>
      </Animated.View>
    </>
  )
}
