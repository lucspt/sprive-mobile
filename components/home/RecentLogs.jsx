import { FlatList, StyleSheet, View, useWindowDimensions } from "react-native";
import css from "../../styles";
import RecentLog from "./RecentLog";
import { scaleFont } from "../../utils";
import Text from "../Text";
import { useCallback } from "react";

export default function RecentLogs({ logs, navigate }) {
  const { width } = useWindowDimensions();
  const fontSize = scaleFont(width, 14.7);
  const itemWidth = width / 2
  const renderItem = useCallback(({ item }) => (
    <RecentLog
      name={item.name}
      image={item.image}
      rating={item.rating}
      co2e={item.co2e}
      productId={item.product_id}
      fontSize={fontSize}
      navigate={navigate}
      width={itemWidth}
    />
  ), []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recents</Text>
      <FlatList 
        horizontal={true}
        data={logs}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
      />
    </View>
  )
}

const { homeSpacing } = css
const styles = StyleSheet.create({

  container: {
    borderRadius: 10,
    gap: 10,
    paddingBottom: 20,
  },

  header: {
    paddingLeft: homeSpacing,
    fontWeight: css.bold,
    fontSize: css.mediumFont,
  },

  widget: {
    width: "100%",
  },

  list: {
    width: "100%",
    paddingHorizontal: 10,
  },

  listContent: {
    paddingLeft: homeSpacing
  }

})