import { View } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import Text from "./Text";
import css from "../styles";


export default function IconButton({ 
  onPress, 
  Icon, 
  text, 
  textStyle={},
  buttonStyle={},
  ariaRole="button",
  ariaLabel, 
  textColor=css.secondary,
  onLongPress=null,
   children, 
   buttonProps={},
  ...props
 }) {

  return (
    <BorderlessButton 
      onPress={onPress} 
      onLongPress={onLongPress || onPress}
      {...buttonProps}
    >
      <View
        {...props}
        accessible 
        accessibilityLabel={ariaLabel} 
        accessibilityRole={ariaRole}
        >
          { children && children }
        {text && <Text style={{color: textColor, ...textStyle}}>{text}</Text>}
      </View>
    </BorderlessButton>
  )
}