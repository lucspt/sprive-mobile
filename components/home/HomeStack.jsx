


import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import Pledge from "./Pledge";
import ProductsStack from "../products/ProductsStack"

const Stack = createNativeStackNavigator();

export default function HomeStack() {

  return (
    <ProductsStack Stack={Stack} initialRouteName="home">
      <Stack.Screen
        name="Home"
        component={Home}
        />
      <Stack.Screen
        name="Pledge"
        component={Pledge}
        />
  </ProductsStack>
  )
}