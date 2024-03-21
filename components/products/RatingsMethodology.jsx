import { StyleSheet, View } from "react-native";
import Text from "../Text";
import TopBar from "../TopBar";

export default function RatingsMethodology({ navigation }) {

  return (
    <View style={styles.container}>
      <TopBar goBack={navigation.goBack} />
      <Text>Hey methodology</Text>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    height: "100%",
    width: "100%"
  }
})