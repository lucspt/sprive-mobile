import { useMemo } from "react";
import { Dimensions, View, useWindowDimensions } from "react-native";
import Svg, { G, Text } from "react-native-svg";
import AnimatedBar from "./AnimatedBar";
import css from "../../styles";
import { formatCO2e, scaleFont } from "../../utils";

const CHART_MIN = 0
const { secondary } = css;
const MIN_TRANSLATE = 30
export default function  Chart({ 
  data, 
  labels, 
  containerHeight=300,
  width=null,
  barWidth=20,
  labelSpacing=20,
  paddingBottom=10,
  averageCO2e,
  paddingHorizontal=10,
  yAxisMarginRight=5,
 }) {
  paddingHorizontal = paddingHorizontal * 2;
  const { width: screenWidth } = useWindowDimensions();
  width = width || screenWidth;
  const max = Math.max(...data);

  const TEXT_PROPS = { textAnchor: "end", fill: secondary };

  const yAxisFontSize = scaleFont(screenWidth, 12);
  const labelsFontSize = scaleFont(screenWidth, 11);
  data = [...data, averageCO2e];
  labels = [...labels, "Avg"];
  const CANVAS_DATA = useMemo(() => {
    const interval = max / (data.length - 1);
    const length = (max - CHART_MIN) / interval + 1;
    const yAxis = [CHART_MIN, ...Array.from({ length }, (_, i) => CHART_MIN + i * interval).slice(1)];
    const yAxisLen = labels.length;
    const heightWithSpacing = containerHeight - (labelSpacing + paddingBottom);
    const spacing = heightWithSpacing / yAxisLen;
    const maxSpacing =  spacing * yAxisLen;
    const dataLen = data.length;
    const maxBarHeight = heightWithSpacing - spacing;
    const barSpacing = (width - (30 + barWidth + paddingHorizontal)) / dataLen
    return {
      dataset: {
        data: Array.from(data, (x) => maxBarHeight * (x / max)), 
        spacing: barSpacing
      },
      yAxis: Array.from(yAxis, (tick, i) => (
          { label: formatCO2e(tick, 0).join(" "), y: maxSpacing - (spacing * i)}
        )),
    };
  }, [data, averageCO2e]);

  const { dataset: { data: VALUES, spacing: BAR_SPACING }, yAxis } = CANVAS_DATA;
  const heightWithPadding = containerHeight - paddingBottom;
  const barY = heightWithPadding - labelSpacing;
  const translateChart = BAR_SPACING + yAxisMarginRight
  return (
    <View>
      <Svg  
        height={containerHeight}
        width={width}
        viewBox={`0 0 ${width} ${containerHeight}`}
      >
      <G translateX={paddingHorizontal}>
        <G 
          scaleX="1"
          scaleY="-1"
          y={barY}
          translateX={translateChart}
        >
          {
            VALUES.map((val, index) => (
              <AnimatedBar 
                height={val}
                x={BAR_SPACING * index} 
                key={index}
                radius={3}
                width={barWidth}
                label={labels[index]}
                delay={100 * index}
              />
            ))
          }
        </G>
        <G >
          {
            yAxis.map(({ label, y }) => (
              <Text
                {...TEXT_PROPS}
                textAnchor="end"
                x={MIN_TRANSLATE}
                key={`${label}_${y}`}
                fontSize={yAxisFontSize}
                y={y}
              >
                { label }
              </Text>
            ))
          }
        </G>
        <G translateX={translateChart + (barWidth / 2)}>
          {
            labels.map((label, index) => (
              <Text
                {...TEXT_PROPS}
                x={BAR_SPACING * index}
                key={`${label}-${index}`}
                y={heightWithPadding}
                textAnchor="middle"
                fontSize={labelsFontSize}
              >
                { label }
              </Text>
            ))
          }
        </G>
        </G>
      </Svg>
    </View>
  )
}