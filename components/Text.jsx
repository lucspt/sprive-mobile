import { Text as _Text, useWindowDimensions } from "react-native";
import css from "../styles";
import { scaleFont } from "../utils";

export default function Text({ 
  children, 
  style, 
  color=css.secondary, 
  fontSize=css.defaultFont, 
  scale=true,
  numberOfLines=0,
  ...props 
}) {
  
  if (scale) {
    const { width: screenWidth } = useWindowDimensions();
    fontSize = scaleFont(screenWidth, fontSize);
  }

  const _style = (
    style instanceof Array 
    ?  [{ color, fontSize, }, ...style]
    : { color, fontSize, ...style}
  );


  return (
    <_Text style={_style} numberOfLines={numberOfLines} {...props}> 
      { children }
    </_Text>
  );
};