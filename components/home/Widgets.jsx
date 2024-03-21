import { StyleSheet, View } from "react-native"
import Text from "../Text"
import { formatCO2e } from "../../utils"
import css from "../../styles";
import { useContext } from "react";
import { SaviorContext } from "../../contexts/SaviorContext";
import { Image } from "expo-image";
import Widget from "./Widget";

DATA_NA = {
  today: "N/A",
  sinceMonday: "N/A",
  thisMonth: "N/A",
  thisYear: "N/A",
  total: "N/A",
}
export default function Widgets({ 
  sinceMonday, 
  total,
  today, 
  thisYear,
  thisMonth
}) {
  const { widget, widgetHalf, bigDigit, columnTitle, widgetGap, centerText } = styles;
  const { savior, isLoggedIn } = useContext(SaviorContext);

  const stats = isLoggedIn ?
  ( savior?.spriving 
    ? {
      today: formatCO2e(today).join(" "),
      sinceMonday: formatCO2e(sinceMonday).join(" "),
      thisMonth: formatCO2e(thisMonth).join(" "),
      thisYear: formatCO2e(thisYear).join(" "),
      total: formatCO2e(total).join(" ")
    } : {...DATA_NA, sinceMonday: formatCO2e(sinceMonday).join(" "), }
  ) : DATA_NA;
  
  return (
    <View style={styles.container}>
      <View style={styles.widgetTuple}>
        <View style={[widget, widgetHalf]}>
          <Text style={columnTitle}>Emissions today</Text>
          <Text style={bigDigit}>{stats.today}</Text>
        </View>
        <View style={[widget, widgetHalf]}>
      <Text style={columnTitle}>Since Monday</Text>
      <Text style={bigDigit}>{stats.sinceMonday}</Text>
        </View>
      </View>
      <View style={widget}>
        <View style={styles.longWidget}>
          <View style={widgetGap}>
            <Text style={columnTitle}>This Month</Text>
            <Text style={[bigDigit]}>{stats.thisMonth}</Text>
          </View>
          <View style={[widgetGap]}>
            <Text style={[columnTitle, {textAlign: "center"}]}>This Year</Text>
            <Text style={[bigDigit, centerText]}>{stats.thisYear}</Text>
          </View>
          <View style={[widgetGap, {alignItems: "flex-end"}]}>
            <Text style={[columnTitle, {textAlign: "right"}]}>All time</Text>
            <Text style={[bigDigit]}>{stats.total}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 27,
    paddingHorizontal: css.homeSpacing,
    marginTop: 10,
  },


  bigDigit: {
    fontWeight: 600,
  },

  centerText: {
    textAlign: "center"
  },

  widget: {
    ...css.widget,
    gap: 8,
    justifyContent: "center",
  },

  longWidget: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,

  },
  
  widgetGap: {
    gap: 8,
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "center",
    flex: 1
  },

  widgetHalf: {
    flex: .5
  },
  
  infoDigit: {
    alignSelf: "flex-end"
  },

  columnTitle: {
    fontSize: css.smallFont,
  },

  widgetTuple: {
    flexDirection: "row",
    gap: 30,
    width: "100%",
  }

})