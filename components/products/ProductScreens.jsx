import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import Button from "../Button";
import css from "../../styles";
import { useState } from "react";
import Search from "./Search";


export default function ProductScreens({ navigation }) {
  // const [ currentScreen, setCurrentScreen ] = useState(0);
  const currentScreen = useSharedValue(0);
  // 0 == search and 100 == starred, those are the numbers the button group uses 
  const [ width, setWidth ] = useState(null);

  const changeScreens = (screenVal=0) => {
    currentScreen.value = screenVal
  }
  const buttonStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(currentScreen.value)} ]
  }));


  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        <Animated.View 
          style={[buttonStyles, styles.buttonBg]} 
          onLayout={({ nativeEvent }) => setWidth(nativeEvent.layout.width)}
        />
        <Button 
          text="search" 
          activeColor="transparent" 
          onPress={changeScreens}
          style={styles.button}
          containerStyle={styles.button}
        />
        <Button
          text="starred" 
          activeColor="transparent" 
          onPress={() => changeScreens(width)}
          style={styles.button}
          containerStyle={styles.button}
        />
      </View>
      <View style={styles.content}>
        <Search navigation={navigation}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    gap: 20,
  },

  buttonGroup: {
    backgroundColor: css.highlight,
    width: "75%",
    maxWidth: 260,
    borderRadius: 7,
    height: 30,
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
  },

  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonBg: {
    backgroundColor: css.black,
    height: "100%",
    position: "absolute",
    width: "50%",
    borderRadius: 5,
    left: 0
  },

  content: {
    flex: 1
  }
})