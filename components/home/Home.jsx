import { ScrollView, StyleSheet, View, useWindowDimensions } from "react-native";
import { Profiler, memo, useContext, useEffect, useRef, useState } from "react";
import { SaviorContext } from "../../contexts/SaviorContext";
import { fetchData, PERIODICAL_EMISSIONS_AGG } from "../../utils";
import css from "../../styles";
import Text from "../Text";
import BarChart from "./BarChart";
import { useIsFocused, useScrollToTop } from "@react-navigation/native";
import NoData from "../NoData";
import Spinner from "../Spinner";
import SuggestLoginButton from "../SuggestLoginButton";
import Widgets from "./Widgets";
import RecentLogs from "./RecentLogs";
import CurrentPledge from "./CurrentPledge";
import { StatsBarContext } from "../../contexts/StatsBarContext";
import { SafeAreaView } from "react-native-safe-area-context";

const TOTAL_EMISSIONS_AGG = {
  query_type: "aggregate",
  collection: "product_logs",
  filters: [
    {$group: {
        _id: "$savior_id",
        co2e: {"$sum": "$co2e"}
    }}
  ]
}

async function getAndFormatStats(getStatsFunc) {
  const res = await getStatsFunc();
  return res[0];
}

const Home =  memo(function Home({ navigation }) { 
  const { isLoggedIn, savior, } = useContext(SaviorContext);
  const { getCurrentStats, stats } = useContext(StatsBarContext);
  const scrollRef = useRef();
  useScrollToTop(scrollRef);
  let current_pledge, pledgeFrequency;
  if (savior?.current_pledge) {
    ({ 
      current_pledge, 
      current_pledge: { frequency: pledgeFrequency } 
    } = savior);
  };
  const [ emissions, setEmissions ] = useState(null);
  const isFocused = useIsFocused();
  const [ refreshing, setRefreshing ] = useState(false); 
  const [ recentLogs, setRecentLogs ] = useState([]); 
  const today = new Date();
  const hours = today.getHours();
  const greeting = (
    hours < 12 ? "Good Morning" : hours < 18 ? "Good Afternoon" : "Good Evening"
  ).concat(
    savior?.spriving ? ", savior" : savior?.username ? `, ${savior.username}` : ""
  );

  const getData = async (setRefreshing=() => null) => {
    try {
      setRefreshing(true)
      const res = await Promise.all([
        fetchData("saviors/logs"),
        getAndFormatStats(getCurrentStats),
      ]) 
      let [ _emissions ] = res;
      ({ content, content: { history: _emissions } } = _emissions);
      const recentLogs = _emissions.slice(0, 4);
      if (_emissions?.length > 0) {
        const co2eByDay = {};
        _emissions.map(({ created, co2e }) => {
          const day = new Date(`${created}Z`).toString().slice(0, 10)
          co2eByDay[day] = (co2eByDay[day] || 0) + co2e
        });

        const co2eValues = Object.values(co2eByDay)
        setEmissions({
          averageCO2e: co2eValues.reduce(
            (acc, val) => acc + val, 0
          ) / co2eValues.length, 
          data: co2eValues.slice(0, 7).reverse(), 
          labels: (
            Object.keys(co2eByDay)
            .map(x => x.slice(0, 3))
            .slice(0, 7)
            .reverse()
          )
        });
        setRecentLogs(recentLogs);
      } else setEmissions([]);
      setRefreshing(false);
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      isFocused && getData();
    } else {
      setEmissions(null)
    }
    
    return () => {
      if (!isLoggedIn) {
        setEmissions(null);
        setRecentLogs(null);
      }
    }
  }, [isLoggedIn, isFocused]);

  const { data, labels, averageCO2e } = emissions || {};
  const _stats = stats || {};
  const BAR_CHART_HEIGHT = 200
  return (
    <View style={styles.screen}>
      <ScrollView 
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 10}}
        scrollEnabled={isLoggedIn}
        refreshControl={ isLoggedIn && 
          <Spinner refreshing={refreshing} onRefresh={() => getData(setRefreshing)} />
        }
      >
      <Text style={styles.header} numberOfLines={1}>{ greeting }</Text>
        <View style={styles.data}>
          <View style={{ height: BAR_CHART_HEIGHT, justifyContent: "center" }}>
          {isLoggedIn === false 
            ?
            <View style={{height: "30%"}}>
              <SuggestLoginButton 
                style={{flex: 1}}
                navigate={navigation.navigate}
                />
            </View>
            : data && 
            ( data.length > 0
              ?
              <BarChart 
              data={data} 
              averageCO2e={averageCO2e}
              labels={labels} 
              containerHeight={BAR_CHART_HEIGHT}
              /> :
              <NoData 
              titleText="No emissions recorded"
              buttonText="view products"
              style={{ height: "100%", }}
              onPress={() => navigation.navigate("search")}
              />
              )
            }
          </View>
          <View style={styles.widgets}>
            <Widgets 
              today={_stats.day}
              thisYear={_stats.year}
              thisMonth={_stats.month}
              sinceMonday={_stats.week}
              total={_stats.total}
            />
            <CurrentPledge 
              navigate={navigation.navigate} 
              currentEmissions={_stats[pledgeFrequency]} 
              currentPledge={current_pledge}
            />
          </View>
          {isLoggedIn !== false && <RecentLogs logs={recentLogs} navigate={navigation.navigate}/>} 
        </View>
      </ScrollView>
    </View>
  )
});

export default Home;

const styles = StyleSheet.create({

  screen: {
    ...css.screen,
    paddingHorizontal: 0,
    flex: 1,
  },

  topBar: {
    alignItems: "flex-end",
    alignSelf: "flex-end",
    paddingRight: 20
  },
  
  header: {
    ...css.header,
    paddingBottom: 10,
    ...css.spacingLeft,
    alignSelf: "flex-start",
  },
  
  data: {
    gap: 20,
  },

  widgets: {
    flex: 1,
    gap: 20,
    // paddingHorizontal: css.homeSpacing
  }

})