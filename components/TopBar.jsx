import { Pressable, StyleSheet, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import css from "../styles";
import { useEffect } from "react";
import Button from "./Button";
import IconButton from "./IconButton";


export default function TopBar({ 
  children, 
  navigation, 
  style={}, 
  goBack,
  ...props
 }) {

  
  return (
    <View style={[styles.topBar, style]}>
      <IconButton {...props} onPress={goBack} ariaLabel="back" ariaRole="button">
        <AntDesign name="back" size={24} color={css.white} />
      </IconButton>
        { children && children }
    </View>
  )
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingVertical: 20,
    alignItems: "center"
  },
})