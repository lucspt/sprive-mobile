import { createNativeStackNavigator } from "@react-navigation/native-stack"
import History from "./History"
import ProductsStack from "../products/ProductsStack"


const Stack = createNativeStackNavigator()
export default function HistoryStack() {

  return (
    <ProductsStack Stack={Stack} initialRouteName="recents">
      <Stack.Screen name="recents" component={History} />
    </ProductsStack>

  )
}