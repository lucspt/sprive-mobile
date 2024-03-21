import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Text from "../Text";
import css from "../../styles";
import Button from "../Button";



export default function ScanButton({ navigation }) {
  return (
    <Button onPress={() => navigation.navigate("scan")} interactive={true}>
        <View style={styles.container}>
          <Ionicons style={{ alignSelf: "center" }} name="scan" size={24} color={css.black} />
          <Text color={css.black}>scan</Text>
        </View>
      </Button>
  )
}

const styles = StyleSheet.create({
  container: {
    // padding: 5,
    gap: 5,
    borderRadius: 5,
    backgroundColor: css.secondary,
    alignItems: "center",
    textAlign: "center",
    borderRadius: 35,
    width: 70,
    // position: "absolute",
    // bottom: 0,
    height: 70,
    marginBottom: 10,
    justifyContent: "center",
    alignSelf: "center",
  }
})