import { StyleSheet, View } from "react-native"
import css from "../../../styles"
import Button from "../../Button";
import Text from "../../Text";
import Feature from "../Feature";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import IconButton from "../../IconButton";
import { useContext, useEffect, useRef } from "react";
import { SaviorContext } from "../../../contexts/SaviorContext";
import { fetchData } from "../../../utils";
import { ScrollView } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";

const { secondary } = css

const FeatureOneEntering = FadeInDown
.delay(200)
.damping(0)
.stiffness(0)
.withInitialValues({ transform: [{ translateY: 430} ] })
.duration(370);
const FeatureTwoEntering = FadeInDown
.delay(200)
.damping(0)
.stiffness(0)
.withInitialValues({ transform: [{ translateY: 490} ] })
.duration(420);
const ButtonEnter = FadeIn.delay(640);

export default function SaviorInitiator({ navigation, isModal }) {
  const { goBack } = navigation;
  const { setSavior } = useContext(SaviorContext);
  async function startSaving() {
    await fetchData("saviors/sprivers", "POST");
    setSavior(prev => ({...prev, spriving: true}));
  };
  
  return (
    <ScrollView 
      style={{flexShrink: 0}} 
      contentContainerStyle={[styles.container, { paddingTop: isModal ? 50 : 20}]}
      showsVerticalScrollIndicator={false}
    >
      {isModal 
        ? 
        <Button 
          containerStyle={styles.slideDown}
          onPress={goBack} 
          activeColor={css.highlight}
         />
        : 
          <IconButton style={styles.top} onPress={goBack}>
            <Entypo name={"chevron-down"} size={24} color={css.secondary} /> 
          </IconButton>
      }
      <View style={styles.content}>
        <View style={styles.heading}>
          <Text style={[styles.header, {fontSize: css.smallFont}]}>
            BECOME A SPRIVER
          </Text>
          <Text style={[styles.header, styles.largeHeader]} >
            Enhance your Journey Towards Sustainability
          </Text>
        </View>
        <View style={[styles.body, { gap: isModal ? 0 : 50 }]}>
          <View style={styles.features}>
          <Feature 
              title="Limitless logs"
              entering={FeatureTwoEntering}
              description={(
                "Log as many products, as often as you'd like, and let sprive handle the work of remembering it all."
              )}
              Icon={() => <Ionicons name="calculator" size={50} color={secondary} />}
            />
            <Feature 
              title="Track emissions"
              Icon={
               () =>  <MaterialCommunityIcons name="chart-box" size={50} color={secondary} />
              }
              entering={FeatureOneEntering}
              description={(
                "Get access to full tracking of your consumption's emissions, and see its impact in real time"
              )}
            />
            <Feature 
              title="Set goals"
              Icon={
               () =>  <MaterialCommunityIcons name="target" size={50} color={secondary} />
              }
              entering={FeatureOneEntering}
              description={(
                "Whenever you're ready, set your own personalized goals. No matter how big or small they may be, sprive will support them."
              )}
            />
          </View>
            <Animated.View 
              entering={ButtonEnter} 
              style={[styles.buttonWrapper, {marginTop: isModal ? 60 : 0}]}
            >
              <Button
                text="Become a Spriver"
                style={styles.button}
                onPress={startSaving}
                />
              <View style={styles.price}>
                <Text style={styles.priceText}>$13.99</Text>
              </View>
            </Animated.View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    flexShrink: 0,
    paddingHorizontal: 14,
    flexGrow: 1,
  },

  slideDown: {
    backgroundColor: css.highlight,
    position: "absolute",
    top: 10,
    height: 6,
    width: 80,
    borderRadius: 5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    flexShrink: 0,
  },

  top: {
    width: 45,
    borderColor: css.borderColor,
  },

  heading: {
    gap: 4,
  },

  header: {
    fontWeight: css.bold,
    fontSize: css.smallFont
  },

  largeHeader: {
    fontSize: css.largeFont,
    maxWidth: 300
  },

  body: {
    justifyContent: "space-between",
    flexGrow: 1,
    paddingBottom: 40,
    },

  features: {
    paddingTop: 60,
    paddingHorizontal: 10,
    gap: 40
  },

  buttonWrapper: {
    alignItems: "center",
  },

  button: {
    ...css.boxShadow,
    backgroundColor: css.ecoGreat,
    width: 280,
    maxWidth: "80%",
    height: 37,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7
  },

  price: {
    marginTop: 14
  },

  priceText: {
    color: css.gray,
    opacity: 0.5,
  }


})