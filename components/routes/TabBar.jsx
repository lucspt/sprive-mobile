import { Pressable, StyleSheet, View } from "react-native";
import Text from "../Text";
import css from "../../styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import IconButton from "../IconButton";

export default function TabBar({ state, descriptors, navigation }) {
  const { bottom } = useSafeAreaInsets();

  const onPress = (isFocused, route) => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true
    });

    if (!(isFocused && event.defaultPrevented)) {
      navigation.navigate(route.name, route.params)
    };
  };

  const onLongPress = key => {
    navigation.emit({
      type: "tabLongPress",
      target: key
    });
  };

  return (
    <View style={[styles.bottomBar, {paddingBottom: bottom}]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label = options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined 
          ? options.title
          : route.name;

          const isFocused = state.index === index;
          return (
            <Pressable
              key={label}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={() => onPress(isFocused, route)}
              onLongPress={() => onLongPress(route.key)}
              style={{flex: 1}}
            >
              <View style={styles.icon}>
                { options.tabBarIcon(isFocused ? css.white : css.gray) }
                {/* <Text 
                  style={
                    isFocused 
                      ? {color: css.white, fontSize: 10}
                      : {fontSize: 10, color: css.gray}
                  }
                 >
                  { label }
                </Text> */}
              </View>
            </Pressable>
          )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  bottomBar: {
    paddingTop: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: css.black,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  icon: {
    ...css.route,
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    paddingBottom: 20
  }
})