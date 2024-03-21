// import { useIsFocused } from "@react-navigation/native";
import { memo, useCallback, useContext, useEffect, useRef, useState } from "react";
import { fetchData } from "../../utils";
import { SaviorContext } from "../../contexts/SaviorContext";
import { ScrollView, StyleSheet, View } from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import ProductRow from "../products/ProductRow"
import Text from "../Text";
import css from "../../styles";
import NoData from "../NoData";
import SuggestLoginButton from "../SuggestLoginButton";
import ProductsList from "../products/ProductsList";
import { useScrollToTop } from "@react-navigation/native";

RESULTS_PER_PAGE = 15;
async function getStars(
  setState, 
  skip=0, 
  setRefreshing=() => null, 
  setKeepFetchingPages=() => null
) {
  setRefreshing(true);
  const res = await fetchData(`saviors/stars?limit=${RESULTS_PER_PAGE}&skip=${skip}`);
  const { content } = res;
  setState(content.starred);
  setKeepFetchingPages(content.has_more);
  setRefreshing(false);
}

const Starred = memo(function Starred({ navigation }) {
  const { isLoggedIn } = useContext(SaviorContext);
  const [ starredProducts, setStarredProducts ] = useState(null);
  const [ pullRefreshing, setPullRefreshing ] = useState(false);
  const [ page, setPage ] = useState(0);
  const scrollRef = useRef();
  useScrollToTop(scrollRef);
  const [ scrollRefreshing, setScrollRefreshing ] = useState(false);
  const [ keepFetchingPages, setKeepFetchingPages ] = useState(true);

  useEffect(() => {
    if (isLoggedIn && keepFetchingPages) {
        getStars(
          setStarredProducts, 
          RESULTS_PER_PAGE * page, 
          () => null,
          setKeepFetchingPages
        );

        return () => setPage(0);
    }
  }, [isLoggedIn, page]);

  const renderItem = useCallback(({ item }) => (
    <ProductRow 
      navigate={navigation.navigate}
      name={item.name}
      productId={item.resource_id}
      co2e={item.co2e}
    />
  ))

  return (
    // <ScrollView 
    //   style={styles.container}
    //   contentContainerStyle={{ flexGrow: 1 }}
    //   refreshControl={
    //     <RefreshControl 
    //       tintColor={css.spinnerTint}
    //       refreshing={refreshing}
    //       onRefresh={() => getStars(setStarredProducts, 0, setPullRefreshing)}
    //     />
    //   }
    // >
    <View style={[styles.container, {flexGrow: 1,}]}>
      <Text 
      style={[css.header, css.spacingLeft, styles.header]}
      >
        Starred
      </Text>
      {
        isLoggedIn !== false 
          ? 
          ( starredProducts !== null && (
              <ProductsList
                reactRef={scrollRef}
                products={starredProducts} 
                scrollRefreshing={scrollRefreshing} 
                listEmptyComponent={<NoData 
                  titleText="No products starred"
                  style={{ height: "100%", justifyContent: "center"}}
                  buttonText="search products"
                  onPress={() => navigation.navigate("Search", { screen: "search" })}
                  />}
                renderItem={renderItem}
                refreshControlRefreshing={pullRefreshing}
                key="starred"
                onEndReached={() => setPage(prev => prev + 1)}
                onRefresh={() => getStars(setStarredProducts, 0, setPullRefreshing)}
                navigate={navigation.navigate}
              />
            )
        ) : <SuggestLoginButton navigate={navigation.navigate}/>
      }
    </View>
  )
});

export default Starred

const styles = StyleSheet.create({
  container: {
    ...css.screen,
    flexGrow: 1,
    paddingHorizontal: 0
  },

  products: {
    flex: 1,
  },

  header: {
    paddingBottom: 10
  },
})