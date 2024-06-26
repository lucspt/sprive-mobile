import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import Text from "../Text";
import Rating from "../Rating";
import { formatCO2e } from "../../utils";
import { memo } from "react";
import { Entypo } from "@expo/vector-icons"
import css from "../../styles";
import Button from "../Button"; 
import { getTimeElapsed } from "../../utils";

const ProductRow = memo(function ProductRow({ 
  productId, 
  name, 
  image, 
  co2e, 
  rating, 
  navigate,
  containerStyle,
  created_at=null,
 }) {
  
  return (
      <Button
        style={{...styles.container, ...containerStyle}}
        accessibilityLabel={name}
        accessibilityRole="button"   
        onPress={() => navigate("product", { productId })}
        >
        <Image
          source={image}
          style={styles.image}
          alt={`a picture of ${name}`}
          contentFit="contain"
        />
        <View style={styles.details}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <View style={styles.chevron}>
            <Entypo name="chevron-right" color={css.secondary} size={18} />
          </View>
          <View style={styles.emissions}>
            <View style={styles.rating}>
              {created_at && (
                <Text 
                  style={styles.date} 
                  numberOfLines={1}
                >
                  {getTimeElapsed(created_at)}
                </Text>
            )}
            <Rating rating={rating || "B"} />
            </View>
            <Text style={styles.co2e}>{formatCO2e(co2e).join(" ")}</Text>
          </View>
        </View>
      </Button>
    )
});

export default ProductRow;

export const styles = StyleSheet.create({
  container: {
    gap: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    flexGrow: 1,
    width: "100%",
  },

  name: {
    fontWeight: 800,
    fontSize: 15,
    paddingTop: 14
  },

  details: {
    fontSize: 12,
    justifyContent: "space-between",
    flexGrow: 1,
    paddingBottom: 10,
    paddingRight: 20
  },

  emissions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  co2e: {
    fontWeight: 800,
    fontSize: 15,
  },

  image: {
    height: 90,
    width: 90,
    marginLeft: 15,
    alignSelf: "stretch",
    backgroundColor: css.white,
  },

  chevron: {
    alignItems: "flex-end", 
  },

  rating: {
    minWidth: 90,
    maxHeight: 40,
  },

  date: {
    fontSize: 12,
    color: css.gray,
    paddingBottom: 5
  }
})