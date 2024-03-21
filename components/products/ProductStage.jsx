import { StyleSheet, View, Pressable, } from "react-native";
import { useCallback, useEffect, useMemo } from "react";
import Text from "../Text";
import css from "../../styles";
import { formatCO2e } from "../../utils";
import { 
  Fontisto, 
  FontAwesome6, 
  MaterialCommunityIcons, 
  Entypo
 } from '@expo/vector-icons';
import ProductProcess from "./ProductProcess";
import Animated, { 
  useAnimatedRef,
  useAnimatedStyle, 
  useSharedValue, 
  withDelay,
  withTiming
 } from "react-native-reanimated";
import Button from "../Button";


const icons = {
  "sourcing": <Fontisto name="sourcetree" size={18} color={css.black} />,
  "processing": <MaterialCommunityIcons name="state-machine" size={18} color={css.black} />,
  "assembly": <MaterialCommunityIcons name="tools" size={18} color={css.black} />,
  "transport": <FontAwesome6 name="truck-plane" size={18} color={css.black}/>
};

const ITEM_HEIGHT = 25;
const COLLAPSE_DELAY = 180;
export default function ProductStage({ 
  name, 
  co2e, 
  co2ePercentage, 
  expand, 
  collapse,
  expanded, 
  processes,
  productRating,
  // scroll,
  // index,
  // containerHeight,
 }) {
   
  const animatedRef = useAnimatedRef();
  const heightAnim = useSharedValue(0)
  const targetHeight = processes.length * (ITEM_HEIGHT + 25);
  // const [ scrollTo, setScrollTo ] = useState(null);

  const animatedStyle = useAnimatedStyle(() => ({
    height: heightAnim.value
  }));

  useEffect(() => {
    if (!expanded) {
      heightAnim.value = withDelay(COLLAPSE_DELAY, withTiming(0));
    }
  }, [expanded]);

  // useEffect(() => {
  //   if (scrollTo === null && containerHeight){
  //     runOnUI(() => {
  //       const measurement = measure(animatedRef);
  //       if (measurement !== null) {
  //         const { pageY, height } = measurement
  //         const expandedPageY = pageY + targetHeight
  //         if (expandedPageY + height + LIST_SPACING > containerHeight) {
  //           runOnJS(setScrollTo)(expandedPageY);
  //         }
  //       }
  //     })();
  //   }
  // }, [containerHeight])

  const arrowStyle = useAnimatedStyle(() => ({
    transform: [{
      rotateZ: withTiming(expanded ? "-180deg" : "0deg", {duration: 200})
    }]
  }))

  function onPress () {
    if (expanded) {
      collapse();
      heightAnim.value = withDelay(COLLAPSE_DELAY, withTiming(0));
    } else {
      expand();
      heightAnim.value = withTiming(targetHeight, { duration: 150 });
      // if (scrollTo) {
      //   setTimeout(() => scroll.value = scroll.value + scrollTo, 200);
      // }
    }
  }

  const lastIndex = processes.length - 1
  const renderProcess = useCallback(({ item, index }) => (
    <ProductProcess 
      index={index}
      activity={item.activity} 
      co2e={item.co2e} 
      expanded={expanded}
      rating={productRating}
      isLast={index === lastIndex}
    />
  ))


  return (
    <Pressable 
      ref={animatedRef}
      onPress={onPress} 
      accessible
      accessibilityLabel={`show process level emissions of the ${name} stage`}
      accessibilityRole="button"
    >
      <View style={styles.container}>
          <View style={styles.stageLabel}>
            <View style={styles.stageIndex(productRating)}>
              {icons[name]}
            </View>
            <Text>{name}</Text>
          </View>
          <View style={styles.end}>
            <View style={styles.emissions}>
              <Text style={styles.co2e}>{formatCO2e(co2e).join(" ")}</Text>
              <Text style={styles.percent}>{Math.round(co2ePercentage)}%</Text>
            </View>
            <Animated.View style={[{justifyContent: "center"}, arrowStyle]}>
              <Entypo 
                name="chevron-down"
                size={16} 
                color={css.secondary} 
                style={{alignSelf: "center"}}
                />
            </Animated.View>
          </View>
      </View>
      <Animated.FlatList
        data={processes}
        style={[styles.dropdown, animatedStyle]}
        scrollEnabled={false}
        renderItem={renderProcess} 
          keyExtractor={(item) => item._id}
          />
      </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // maxHeight: 40,
    paddingVertical: 3
  },

  stageLabel: {
    flexDirection: "row",
    gap: 35,
    alignItems: "center"
  },
  
  stageIndex: rating => ({
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: css[rating],
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  }),

  end: {
    flexDirection: "row",
    gap: 25,
    paddingTop: 20,
  },

  emissions: {
    justifyContent: "flex-end",
    gap: 5
  },
  
  co2e: {
    fontSize: css.smallFont,
    fontWeight: 800
  },

  percent: {
    fontSize: 12,
    fontWeight: 700,
    alignSelf: "flex-end"
  },

  dropdown: {
    gap: 25,
    paddingRight: 40,
    paddingHorizontal: 10,
    justifyContent: "center"
  },

})