import { StyleSheet } from "react-native";
import Button from "../../Button";
import css from "../../../styles";


export default function SaviorInitiatorButton({ 
  navigate, 
  containerStyle={}, 
  ...props
 }) {

  const onPress = () => navigate("sprive");

  return (
    <Button 
      text="Become a Spriver"
      ariaLabel="become a member"
      ariaRole="button"
      onPress={onPress}
      style={styles.memberButton}
      containerStyle={styles.container}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    alignSelf: "center",
    width: 160,
  },

  memberButton: {
    ...css.boxShadow,
    borderColor: css.secondary,
    height: "100%",
    width: "100%",
    borderRadius: 4,
    backgroundColor: css.ecoGreat,
    justifyContent: "center",
    alignItems: "center",
  },

})