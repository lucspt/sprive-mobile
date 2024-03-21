import { ActivityIndicator, View } from "react-native";


export default function SearchSpinner({ refreshing, }) {
  return (
    <View style={{height: 40, justifyContent: "center"}}>
      <ActivityIndicator animating={true} />
    </View>
  )
}
