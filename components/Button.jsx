import {  View } from "react-native"
import Text from "./Text"
import css from "../styles"
import { RectButton } from 'react-native-gesture-handler';
export default function Button({ 
  text, 
  ariaRole="button", 
  ariaLabel,
  onPress, 
  children, 
  textColor=css.secondary,
  textStyle={},
  activeColor=css.secondary,
  containerStyle={},
  style={},
  buttonProps={},
  onLongPress=null,
  ...props
}) {
    
  return  (
    <RectButton 
      onPress={onPress} 
      underlayColor={activeColor} 
      style={containerStyle}
      onLongPress={onLongPress}
      {...buttonProps}
    >
      <View 
        accessible 
        accessibilityRole={ariaRole}
        accessibilityLabel={ariaLabel}
        {...props}
        style={style}
      >
        { children && children }
        {text && <Text style={{color: textColor, ...textStyle}}>{text}</Text>}
      </View>
    </RectButton>
  ) 
}