import { StyleSheet, View, useWindowDimensions } from "react-native";
import css from "../../styles";
import Text from "../Text";
import IconButton from "../IconButton";
import { formatCO2e, scaleFont } from "../../utils";
import Doughnut from "./Doughnut";
import { useContext } from "react";
import { SaviorContext } from "../../contexts/SaviorContext";
import SaviorInitiatorButton from "../account/initiator/SaviorInitiatorButton"
import Button from "../Button";

export default function CurrentPledge({ navigate, currentEmissions, currentPledge }) {
  const { isLoggedIn, savior } = useContext(SaviorContext);
  const { width } = useWindowDimensions();
  const importantFontSize = scaleFont(width, 24)

  const detailStyles = {
    fontWeight: 700,
    fontSize: importantFontSize,
    alignSelf: "flex-end"
  }

  const { co2e: pledgeCo2e } = currentPledge || {};
  return (
    <View style={styles.container}>
        {isLoggedIn === false ? 
          (
            <View style={styles.loginOverlay}>
              <Text>Login to start tracking!</Text>
              <Button 
                text="Login" 
                containerStyle={styles.loginButton} 
                onPress={() => navigate("account")}
              />
            </View>
          )
        : savior.spriving ?
        <>
          <View style={styles.title}>
            <Text style={styles.header}>Pledge status</Text>
            <IconButton 
              text="edit" 
              containerStyle={styles.edit}
              style={styles.edit}
              onPress={() => navigate("Pledge")}
              />
          </View>
          <View style={styles.content}>
            <Doughnut 
              currentEmissions={currentEmissions} 
              pledgeCo2e={pledgeCo2e}
              fontSize={importantFontSize}
              />
            <View style={styles.info}>
                <View style={styles.indicatorContainer}>
            {
                currentEmissions > pledgeCo2e 
                ? <Text 
                    style={styles.indicator}
                  >
                    You've gone over by { formatCO2e(currentEmissions - pledgeCo2e).join(" ") }
                  </Text>
                : <Text style={styles.indicator}>{ formatCO2e(pledgeCo2e - currentEmissions).join(" ") } until reached</Text>
              }
                </View>
              <View style={styles.detail}>
                <Text>Your pledge:</Text>
                <View style={{flexDirection: "row", gap: 10, alignItems: "flex-end"}}>
                  <Text style={detailStyles}>{ formatCO2e(pledgeCo2e).join(" ") }</Text>
                  <Text style={{ fontSize: css.smallFont }}>{"a ".concat(currentPledge.frequency)}</Text>
                </View>
              </View>
            </View>
          </View>
        </>
        : (
          <View style={styles.becomeSavior}>
            <Text>Want to track your emissions?</Text>
            <SaviorInitiatorButton navigate={navigate}/>
          </View>
        )
        }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: css.widgetBg,
    paddingHorizontal: css.homeSpacing,
    marginHorizontal: css.homeSpacing,
    ...css.widget,
    height: 220,
    flex: 1,
    gap: 7,
  },

  header: {
    fontWeight: 600,
    fontSize: 18,
  },

  edit: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: css.buttonBg,
    paddingVertical: 2,
    fontSize: css.smallFont,
    paddingHorizontal: 10,
    borderRadius: 10
  },

  title: {
    display: "flex",
    paddingLeft: 5,
    paddingRight: 8,
    alignItems: "center",
    paddingTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  content: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  info: {
    flexShrink: 1,
    paddingRight: 10,
  },
  
  detail: {
    gap: 3,
    flex: 1,
    flexShrink: 1,
    justifyContent: "flex-end",
    alignSelf: "center",
    paddingBottom: 13,
  },

  indicatorContainer: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 1,
    marginTop: 10,
  },

  indicator: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "nowrap",
    fontSize: css.smallFont,
    lineHeight: 22,
    opacity: 0.8,
    color: css.gray
  },

  loginOverlay: {
    height: "100%",
    width: "100%",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  loginButton: {
    borderRadius: 5,
    paddingVertical: 7,
    backgroundColor: css.ecoNeutral,
    alignItems: "center",
    justifyContent: "center",
    width: 120
  },

  becomeSavior: {
    alignSelf: "center",
    flexGrow: 1,
    paddingBottom: 30,
    alignItems: "center",
    justifyContent: "space-evenly",
  }

})