
import { StyleSheet, View } from "react-native";
import SkeletonLoader from "../SkeletonLoader";
import { styles } from "./ProductRow"
import Animated from "react-native-reanimated";

const imageStyles = styles.image
const { height, width } = imageStyles
const { details, emissions, co2e, container, name } = styles
export default function Skeleton({ containerStyle }) {
  return (
    <Animated.View 
      style={[container, containerStyle]}
    >
      <SkeletonLoader
        width={width}
        height={height}
        style={[imageStyles, {marginVertical: 10}]}
        borderRadius={5}
        containerStyle={{marginVertical: 10}}
      />
      <View style={[details, {marginVertical: 10}]}>
        <SkeletonLoader 
          style={[name, {marginTop: 10}]}
          width={120}
          height={8}
          borderRadius={4}
        />
        <View style={emissions}>
          <SkeletonLoader 
            width={13} 
            height={13} 
            borderRadius={6.5} 
          />
          <SkeletonLoader 
            style={co2e} 
            height={13} 
            width={30}
            borderRadius={0}
          />
        </View>
      </View>
    </Animated.View>
  )
}
