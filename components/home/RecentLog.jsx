import { Image } from "expo-image"
import { StyleSheet, View } from "react-native"
import css from "../../styles"
import Text from "../Text";
import Rating from "../Rating";
import { formatCO2e } from "../../utils";
import Button from "../Button";

export default function RecentLog({ 
  name, 
  image, 
  rating,
  co2e,
  productId,
  dateFont,
  date,
  ratingFont,
  navigate,
  width,
  fontSize,
 }) {

  return (
    <View style={{ width }}>
    <Button 
      style={styles.container} 
      activeColor={css.widgetBg}
      onPress={() => navigate("product", {productId})}
    >
      <Image
        source="https://static.ewg.org/skindeep_images/8236/823601.jpg"
        style={styles.image}
        alt={`a picture of ${name}`}
      />
      <View style={styles.bottom}>
        <Text 
          style={{fontSize, marginBottom: 10, fontWeight: 700}}
          numberOfLines={1}
        >
          { name }
        </Text>
        <View style={styles.emissions}>
          <Rating rating={rating || "B"} hideText style={{marginTop: 3}}/>
          <Text style={[css.co2eDigit, {fontSize}]}>{ formatCO2e(co2e).join(" ") }</Text>
        </View>
      </View>
    </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
    backgroundColor: css.widgetBg,
    maxWidth: 140,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "center"
  },

  image: {
    height: 110,
    width: 110,
  },

  emissions: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

})