import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import RoutesBar from "./routes/RoutesBar"
import css from "../styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { enableScreens } from 'react-native-screens';
import StatsBarContextProvider from "../contexts/StatsBarContext";
enableScreens();

export default function Root() {
  return (
    <View>
      <SafeAreaView
      edges={["top"]}
      mode="padding"
      style={{
        color: css.secondary,
        height: "100%",
        width: "100%",
        backgroundColor: css.primary
      }}
      >
      <StatsBarContextProvider>
        <RoutesBar />
      </StatsBarContextProvider>
      <StatusBar style="light"/>
    </SafeAreaView>
    </View>
  )
}