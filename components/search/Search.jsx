import { useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, StyleSheet, View } from "react-native";
import css from "../../styles";
import ScanButton from "./ScanButton";
import ProductRow from "../products/ProductRow";
import { useCallback } from "react";
import SearchBar from "./SearchBar";
import Animated, { 
  useAnimatedStyle, 
  interpolateColor,
  useSharedValue,
  FadeIn,
  FadeOut
} from "react-native-reanimated";
import Text from "../Text";
import Skeleton from "../products/Skeleton";

const endpoint = "http://192.168.1.18:8000/products";
const PRODUCTS_PER_PAGE = 15
export default function Search({ navigation }) {
  const [ focused, setFocused ] = useState(false);
  const [ products, setProducts ] = useState([{_id: 1}]); 
  // so the list empty component doesn't render initially
  const [ search, setSearch ] = useState(null);
  const [ pullRefreshing, setPullRefreshing ] = useState(false);
  const [ keepRefreshing, setKeepRefreshing ] = useState(true);
  const [ scrollRefreshing, setScrollRefreshing ] = useState(false);
  const [ page, setPage ] = useState(0);
  const background = useSharedValue(0);
  const [ showSkeletons, setShowSkeletons ] = useState(1);
  const skeletons = [...Array(5).keys()]


  const getProducts = async (search, skip=PRODUCTS_PER_PAGE * page) => {
    const productsEndpoint = search 
    ? `${endpoint}?activity=${search}?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`
    : endpoint;
    let res = await fetch(productsEndpoint);
    res = await res.json();
    const { content } = res 
    setProducts(content.products);
    setKeepRefreshing(content.has_more);

  }

  useEffect(() => {
    setPage(0);
    search !== "" && setShowSkeletons(1);
    getProducts(search, 0);
    setShowSkeletons(0);
    // const timeout = setTimeout(() => setShowSkeletons(0), 170);
    // return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    if (keepRefreshing) {
      setScrollRefreshing(true);
      getProducts(search);
      setScrollRefreshing(false);
    }
  }, [page])

  const refresh = () => {
    setPullRefreshing(true);
    getProducts(search);
    setPullRefreshing(false);
  };

  const contentBg = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      background.value, 
      [0, 1],
      [css.primary, css.black],
      "RGB", 
      { gamma: 5.5, }
    ),
  }))

  const renderItem = useCallback(({ item }) => (
    <ProductRow
      name={item.name} 
      image={item.image} 
      co2e={item.co2e} 
      productId={item.product_id}
      navigate={navigation.navigate}
    />
  ), [])

  const renderSkeleton = useCallback(({ index }) => (
    <Skeleton key={index} containerStyle={{paddingHorizontal: 10}}/>
  ), [])

  return  ( 
    <View 
      style={[styles.container, {overflow: "hidden"}]}
    >
      <SearchBar 
        search={search} 
        setSearch={setSearch}
        focused={focused} 
        setFocused={setFocused}
        background={background}
      />

  { showSkeletons === 1 && 
        <Animated.FlatList
          scrollEnabled={false}
          entering={FadeIn}
          exiting={FadeOut}
          style={[contentBg, styles.content]}
          contentContainerStyle={{ gap: 10 }}
          data={skeletons}
          renderItem={renderSkeleton}
        />
      }
      <Animated.FlatList
        scrollEnabled={true}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Text color={css.gray}>No results</Text> 
          </View>
        )
        }
        style={[contentBg, styles.content, {display: showSkeletons ? "none" : "flex"}]}

        keyboardShouldPersistTaps="handled"
        onEndReached={() => keepRefreshing && setPage(prev => prev + 1)}
        onEndReachedThreshold={0.2}
        ListFooterComponent={
          scrollRefreshing && <ActivityIndicator style={{marginTop: 8}}/>
        }
        refreshControl={
          <RefreshControl 
            onRefresh={refresh} 
            refreshing={pullRefreshing}
            size="default"
            tintColor="#b3b3b3"
            enabled={true} 
            style={{maxHeight: 30}}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
      {/* {!focused && <ScanButton navigation={navigation}/>} */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },

  content: {
    height: "100%",
    flex: 1,
    paddingTop: 10
  },
  
  empty: {
    flex: 1,
    paddingLeft: 20,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
})