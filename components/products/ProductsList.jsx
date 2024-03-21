import { memo, useCallback } from "react"
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet } from "react-native";
import css from "../../styles";
import ProductRow from "./ProductRow";


const ProductsList = function ProductsList({ 
  products, 
  onRefresh, 
  refreshControlRefreshing,
  onEndReached,
  onEndReachedThreshold=0.2,
  scrollRefreshing,
  navigate,
  // renderItem,
  showTimeElapsed,
  reactRef,
  ...props
 }) {

  let _renderItem;
  if (showTimeElapsed) {
    _renderItem = (item) => (
      <ProductRow
        navigate={navigate}
        name={item.name} 
        productId={item.product_id}
        image={item.image} 
        rating={item.rating || "B"}
        co2e={item.co2e}
        created={item.created}
      />
    )  
  } else {
    _renderItem = (item) => (
      <ProductRow
      navigate={navigate}
      name={item.name} 
      productId={item.product_id}
      image={item.image} 
      rating={item.rating || "B"}
      co2e={item.co2e}
      />
    )
  };
  const renderItem = useCallback(({ item }) => _renderItem(item), []);
  
  return (
    <FlatList
      ref={reactRef}
      data={products}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshControlRefreshing} 
          onRefresh={onRefresh}
          tintColor={css.gray}
        />
      }
      ListFooterComponent={
      scrollRefreshing && <ActivityIndicator style={styles.spinner} color={css.spinnerTint}/> 
      }
      contentContainerStyle={{ gap: 8,  paddingBottom: 50 }}
      style={{paddingBottom: 50, flex: 1}}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      {...props}
    /> 
  )
};

export default ProductsList

const styles = StyleSheet.create({
  spinner: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
  }
})