import { useCallback, useRef } from "react";
import { StyleSheet, TextInput, View, Platform } from "react-native"
import { Feather, Ionicons } from "@expo/vector-icons"
import Animated, { 
  Easing, 
  useAnimatedStyle, 
  useSharedValue, 
  withDelay, 
  withTiming,
} from "react-native-reanimated";
import css from "../../styles";
import IconButton from "../IconButton";
import Text from "../Text";

const easing = Easing.ease
const duration = 300
const bgDuration = duration * 2

const _leftIcon = () => <Feather name="search" size={20} color={css.gray} style={{marginRight: 5}}/>
const leftBackIcon = (onPress) =>  (
    <IconButton onPress={onPress}>
      <Ionicons name="arrow-back" size={20} color={css.gray} style={{marginRight: 5}} />
    </IconButton>
)
export default function SearchBar({ 
  search, 
  setSearch, 
  focused, 
  setFocused, 
  background,
 }) {
  const inputRef = useRef();
  let cancelStyles = {right: -100};
  let inputStyles = {width: "100%"};

  const onFocus = useCallback(() => {
    setFocused(true);
    background.value = withTiming(1, { duration });
    // barAnim.value = withTiming(1, { duration });
  }, [focused]);

  const onBlur = () => {
    setFocused(false);
    inputRef.current.blur();
    // loadingAnim.value = 0;
    background.value = withTiming(0), { duration: bgDuration };
  }

  const clear = () => {
    setSearch("");
  }


  if (Platform.OS === "ios") {
    inputStyles = useAnimatedStyle(() => ({
      width: withTiming(focused ? "85%" : "100%", { 
        easing, duration: 190
      }),
    }));
    cancelStyles = useAnimatedStyle(() => (
      focused ? {
        right: withDelay(100, withTiming(0), { easing, duration })
      } : {
        right: withTiming(-100, { easing, duration })
      }
      ));
    }

  const headerStyle = useAnimatedStyle(() => ({
    height: withTiming(focused ? 0 : 60, { duration: 400 }),
  }));

  const LeftIcon = Platform.select({
    ios: _leftIcon,
    android: focused ? () => leftBackIcon(onBlur) : _leftIcon
  })

  return (
    <View style={styles.container}>
      <Animated.View style={[headerStyle, css.header, styles.headerContainer]}>
        <Text style={styles.header}>Search</Text>
      </Animated.View>
      <View>
      <Animated.View style={[styles.barWrapper, inputStyles]}>
        <View style={styles.searchBar} buttonStyle={styles.searchBar}>
          <LeftIcon />
            <TextInput 
              ref={inputRef}
              style={styles.input}
              onFocus={onFocus}
              value={search}
              placeholderTextColor={css.gray}
              onChangeText={setSearch}
              placeholder="Product name or description"
              autoCapitalize="none"
              autoComplete="off"
              spellCheck={false}
              autoCorrect={false}
              keyboardAppearance="dark"
              />
          {(focused && search) &&
            <IconButton onPress={clear} ariaLabel="clear" style={styles.clear}>
              <Feather name="x" color={css.gray} size={20} />
            </IconButton>
          }
        </View>
      </Animated.View>
      <Animated.View style={[styles.cancel, cancelStyles]}>
        <IconButton 
          style={{alignItems: "center", justifyContent: "center",}}
          text="Cancel" 
          interactive={true}
          textStyle={{fontSize: 16}}
          onPress={onBlur}
        />
      </Animated.View>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
    gap: 10,
    paddingHorizontal: 10,
  },

  input: {
    backgroundColor: "transparent",
    flex: 1,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    color: css.secondary,
    width: "100%",
    // justifyContent: "center"
  },

  barWrapper: {
    flexDirection: "row",
    // justifyContent: "center",
    // marginTop: 10
  },

  searchBar: {
    backgroundColor: css.highlight,
    alignItems: "center",
    flexDirection: "row",
    fontSize: 15,
    width: "100%",
    gap: 5,
    paddingHorizontal: 10,
    color: "#000",
    marginHorizontal: 5,
    paddingVertical: 8,
    flex: 1,
    ...Platform.select({
      ios: {
        borderRadius: 10,
      },
      android: {
        borderRadius: 0
      }
    })
  },

  header: {
    ...css.header,
    justifyContent: "flex-end",
    display: "flex",
    alignItems: "flex-end",
    paddingLeft: 5,
    color: css.secondary,
  },

  headerContainer: {
    justifyContent: "flex-end",
    paddingTop: css.screenPaddingTop,
  },

  cancel: {
    position: "absolute",
    textAlign: "center",
    height: "100%",
    fontSize: 16,
    // top: 10,
    bottom: 0,
    marginVertical: "auto",
    justifyContent: "center",
    textAlignVertical: "center",
    textAlign: "center"
  },
})