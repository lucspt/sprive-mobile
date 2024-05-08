import { memo, useContext, useEffect,  useState } from "react";
import Text from "../Text"
import { 
  FlatList, 
  StyleSheet, 
  View,
 } from "react-native";
 import { AntDesign } from '@expo/vector-icons';
import ProductStage from "./ProductStage";
import TopBar from "../TopBar";
import css from "../../styles";
import ActionsBar from "./actions/ActionsBar";
import { Image } from "expo-image";
import StatsBar from "../StatsBar";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import IconButton from "../IconButton";
import { fetchData, formatCO2e } from "../../utils";
import { SaviorContext } from "../../contexts/SaviorContext";
import { StatsBarContext } from "../../contexts/StatsBarContext";
import PledgeBreakerWarning from "./PledgeBreakerWarning";

const STAGESORDER = [
  "sourcing",
  "processing",
  "assembly",
  "transport",
];

const ITEM_HEIGHT = 36
const STATS_BAR_HEIGHT = 80;
const PADDING_BOTTOM = STATS_BAR_HEIGHT + 15;

async function getProduct(productId, setProduct) {
  const endpoint = `http://192.168.1.74:8000/products/${productId}`;
  let res = await fetch(endpoint);
  res = await res.json();
  const { content } = res
  if (typeof content.co2e === "number") {
    setProduct(content);
  };
};

async function getStars(setStars)  {
  const res = await fetchData(`saviors/stars?limit=0&skip=0`);
  setStars(res.content?.starred || []);
}

const Product = memo(function Product({ route, navigation }) { 
  const { productId, from } = route?.params;
  const { isLoggedIn, savior, } = useContext(SaviorContext);
  let current_pledge, pledgeFrequency;
  if (savior?.current_pledge) {
    ({ 
      current_pledge, 
      current_pledge: { frequency: pledgeFrequency } 
    } = savior);
  }
  const { getCurrentStats, stats } = useContext(StatsBarContext);
  const [ product, setProduct ] = useState({});
  const [ expandedStage, setExpandedStage ] = useState(null);
  const animatedRef = useAnimatedRef();
  const [ height, setHeight ] = useState(null);
  const [ stars, setStars ] = useState([]);

  const stagesSorted = product?.stages?.sort(
    (a, b) => STAGESORDER.indexOf(a.stage) - STAGESORDER.indexOf(b.stage)
  );

  useEffect(() => {
    if (!product.name) {
      isLoggedIn ?
        Promise.all([
          getProduct(productId, setProduct), 
          getStars(setStars), 
          stats === null ? getCurrentStats() : Promise.resolve()
        ])
        : getProduct(productId, setProduct);
    }
  }, [productId, isLoggedIn]);

  function getStagePercentage(stageCo2e) {
    return (stageCo2e / product.co2e) * 100
  }

  const expandStage = index => {
    setExpandedStage(index);
  }
 
  const collapseStage = () => {
    setExpandedStage(null);
  }

  const actionsBarInfo = {
    image: product.image,
    name: product.name,
    co2e: product.co2e,
    rating: product.rating,
    stars: product.stars,
    productId
  }

  const currentCO2eLabel = pledgeFrequency === "day"
  ? "CO2e today"
  : !pledgeFrequency ? "Current emissions"
  : `CO2e this ${pledgeFrequency}`

  const pledgeCO2e = current_pledge?.co2e;
  const _stats = stats || {};
  const currentCO2e = _stats[pledgeFrequency]
  const { co2e: productCO2e } = product;

  return product && (
    <View style={styles.container}>
      <TopBar goBack={navigation.goBack} backRoute={from}>
      <Text style={styles.title}>{product.name}</Text>
      <IconButton 
        onPress={() => navigation.navigate("how-it-works")}
        ariaLabel={"Go to the ratings methodology page"}
        >
          <AntDesign name="questioncircleo" size={22} color={css.white} />
      </IconButton>
      </TopBar>
      <View style={{ flex: 1 }}>
        { savior.spriving && currentCO2e + productCO2e > pledgeCO2e && 
         <PledgeBreakerWarning 
            currentCo2e={currentCO2e}
            pledgeCo2e={pledgeCO2e}
            productCo2e={product.co2e}
            pledgeFrequency={pledgeFrequency}
          />
        }
      <Animated.ScrollView 
        style={styles.scrollContainer} 
        showsVerticalScrollIndicator={false} 
        ref={animatedRef}
        >
          <View style={styles.summary}>
            <Image

              source={product.image}
              style={styles.image}
              alt={`a picture of ${product.name}`}
            />
          </View>
          <View style={styles.details}>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
              <Text style={styles.subHeader}>Traceback</Text>
              <Text 
                style={[styles.subHeader, { fontSize: css.mediumFont, alignSelf: "flex-end"}]}
              >
                { formatCO2e(product.co2e).join(" ") }
              </Text>
            </View>
            <FlatList
              scrollEnabled={false}
              style={[{ flexGrow: 1, paddingBottom: PADDING_BOTTOM}]}
              initialScrollIndex={0}
              data={stagesSorted}
              contentContainerStyle={{ marginTop: 5 }}
              renderItem={({ item, index }) => (
                <ProductStage 
                  expanded={index === expandedStage}
                  expand={() => expandStage(index)}
                  collapse={collapseStage}
                  containerHeight={height}
                  productRating={product.rating || "B"}
                  name={item.stage} 
                  co2e={item.co2e} 
                  co2ePercentage={getStagePercentage(item.co2e)}
                  processes={item.processes}
                  index={index}
                  />
                  )}
                  keyExtractor={(item) => item.stage}
                />
          </View>
        </Animated.ScrollView>
        <StatsBar 
          currentCO2eLabel={currentCO2eLabel} 
          pledgeCO2e={pledgeCO2e} 
          currentCO2e={currentCO2e} 
          totalCO2e={_stats.total}
        /> 
      <View styles={styles.shadow}>
        <ActionsBar 
          navigate={navigation.navigate}
          pledgeCO2e={pledgeCO2e}
          stars={stars} 
          product={actionsBarInfo}
          getStars={() => getStars(setStars)}
        />
      </View>
    </View>
  </View>
  )
});

export default Product

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },

  scrollWrapper: {
    backgroundColor: "transparent",
    marginBottom: 30
  },

  title: {
    fontSize: 17,
    fontWeight: 700,
    textAlign: "center",
  },


  summary: {
    flex: 2/3,
    alignSelf: "center",
    alignItems: "center",
  },
  
  details: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 25,
    // paddingBottom: 30,
  },

  image: {
    height: 150,
    width: 150,
    marginTop: 30,
  },

  subHeader: {
    fontSize: css.largeFont,
    fontWeight: 800,
    marginVertical: 10,
  }

})