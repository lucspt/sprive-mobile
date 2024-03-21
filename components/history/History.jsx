import { memo, useCallback, useContext, useEffect, useRef, useState } from "react";
import { fetchData } from "../../utils";
import { ActivityIndicator, FlatList, RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import Text from "../Text";
import css from "../../styles";
import ProductRow from "../products/ProductRow";
import { SaviorContext } from "../../contexts/SaviorContext";
import NoData from "../NoData";
import SuggestLoginButton from "../SuggestLoginButton";
import { useIsFocused, useScrollToTop } from "@react-navigation/native";
import StatsBar from "../StatsBar";
import Spinner from "../Spinner";
import ProductsList from "../products/ProductsList";

const LOGS_PER_PAGE = 15
const History = memo(function History({ navigation }) { 
  const [ history, setHistory ] = useState(null);
  const { isLoggedIn } = useContext(SaviorContext);
  const scrollRef = useRef();
  useScrollToTop(scrollRef);
  const [ pullRefresh, setPullRefresh ] = useState(false);
  const [ scrollRefresh, setScrollRefresh ] = useState(false);
  const [ page, setPage ] = useState(0);
  const [ keepFetchingPages, setKeepFetchingPages ] = useState(true);

  async function getData(setRefreshing=() => null, isPullRefresh=false) {
    setRefreshing(true);
    const skip = isPullRefresh
      ? 0 : LOGS_PER_PAGE * page
    const res = await fetchData(
      `saviors/logs?limit=${LOGS_PER_PAGE}&skip=${skip}`
    );
    const { content } = res;
    if (isPullRefresh) {
      setHistory(content.history)
    } else {
      setHistory(prev => (prev || []).concat(content.history));
    }
    setKeepFetchingPages(content.has_more);
    setRefreshing(false);
  }

  useEffect(() => {
    if (isLoggedIn && keepFetchingPages) {
      getData(setScrollRefresh);
    }

    return () => {
      if (!isLoggedIn) setHistory(null)
    }
  }, [isLoggedIn, page]);


  return (
    <View 
      style={[styles.container, {flex: 1}]}
    >
      <Text 
      style={[css.header, css.spacingLeft, styles.header]}
      >
        History
      </Text>
      <View style={styles.history}>
        {
          isLoggedIn === false 
            ? <SuggestLoginButton navigate={navigation.navigate}/>
            : ( history?.length > 0 
                ? (<ProductsList 
                    reactRef={scrollRef}
                    products={history} 
                    scrollRefreshing={scrollRefresh}
                    refreshControlRefreshing={pullRefresh}
                    key="history"
                    onEndReached={() => setPage(prev => prev + 1)}
                    onRefresh={() => getData(setPullRefresh, true)}
                    navigate={navigation.navigate}
                    showTimeElapsed
                   />
                  )
                : history !== null && (
                  <View style={styles.empty}>
                    <NoData 
                      titleText="No results"
                      buttonText="view products"
                      onPress={() => navigation.navigate("products")}
                      />
                  </View>
                )
              )
          }
      </View>
    </View>
  )
});

export default History;

const styles = StyleSheet.create({

  container: {
    ...css.screen,
    flexGrow: 1,
    paddingHorizontal: 0,
    paddingBottom: 0,
  }, 

  header: {
    paddingBottom: 10
  },

  history: {
    flexBasis: "100%",
    gap: 10,
    height: "100%"
  },

  empty: {
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    height: "100%"
  },

  // spinner: {
  //   alignItems: "center",
  //   justifyContent: "center",
  //   alignSelf: "center"
  // }

})
