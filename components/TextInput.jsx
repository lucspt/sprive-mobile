import { StyleSheet } from "react-native";
import css from "../styles";
import { TextInput as _TextInput } from "react-native";



export default function TextInput({ 
  value, 
  onChangeText, 
  style, 
  placeholder, 
  reactRef, 
  ...props 
}) {
  return (
    <_TextInput
      style={[css.textInput, style]}
      value={value}
      placeholderTextColor={css.gray}
      autoCapitalize="none"
      placeholder={placeholder}
      autoComplete="off"
      spellCheck={false}
      ref={reactRef}
      autoCorrect={false}
      accessibilityElementsHidden={true}
      keyboardAppearance="dark"
      onChangeText={text => onChangeText(text)}
      {...props}
    />
  )
}