
import { BarChart as _BarChart } from "react-native-chart-kit"
import { Dimensions, View, useWindowDimensions } from "react-native"
import css from "../../styles";
import { formatCO2e } from "../../utils";

const chartConfig = {
  backgroundGradientFrom: "transparent",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "transparent",
  backgroundGradientToOpacity: 0,
  propsForBackgroundLines: {
    display: "none"
  },
  backgroundGradientToOpacity: 0,
  color: () => css.secondary,
  barPercentage: 0.7,
  useShadowColorFromDataset: false,
  barRadius: 3,
  formatYLabel: (co2e) => formatCO2e(co2e, 0).join(" ")

};

export default function BarChart({ data, labels }) {
  const width = useWindowDimensions.width();
  console.log(data, labels)
  return  (
    <View style={{ height: 200 }}>
      <_BarChart
        data={{
          labels: labels,
          datasets: [{
            data: data,
            colors: Array(data.length).fill(() => css.B),
          }],
        }}
        height={200}
        flatColor={true}
        withCustomBarColorFromData={true}
        width={width}
        yAxisInterval={data}
        chartConfig={chartConfig}
        fromZero={true}
        showBarTops={false}
        />
    </View>
  )
}