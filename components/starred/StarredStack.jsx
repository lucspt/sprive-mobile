import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductsStack from "../products/ProductsStack";
import Starred from "./Starred";

const Stack = createNativeStackNavigator();
export default function StarredStack() {

  return (
    <ProductsStack Stack={Stack} initialRouteName="Starred">
      <Stack.Screen
        name="Starred"
        component={Starred}
      />
    </ProductsStack>
  )
}