import ProductScanner from "./ProductScanner";
import RatingsMethodology from "../products/RatingsMethodology";
import LoginModal from "../products/LoginModal";
import Product from "../products/Product";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Search from "./Search";
import ProductsStack from "../products/ProductsStack";


const Stack = createNativeStackNavigator();

export default function SearchStack() {

  return (
    <ProductsStack Stack={Stack} initialRouteName="Search">
      <Stack.Screen name="Search" component={Search}/>
        <Stack.Screen 
          name="scan" 
          component={ProductScanner}
          options={{
            animation: "slide_from_bottom",
            gestureDirection: "vertical",
          }}
        />
    </ProductsStack>
  )
}