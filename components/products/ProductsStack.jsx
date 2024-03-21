import RatingsMethodology from "./RatingsMethodology";
import LoginModal from "./LoginModal";
import Product from "./Product";
import SaviorInitiator from "../account/initiator/SaviorInitiator";


// so that we can pass a prop to the screen
const _SaviorInitiatorScreen = (props) => <SaviorInitiator isModal={true} {...props} />
export default function ProductsStack({ Stack, children, initialRouteName, ...props }) {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        fullScreenGestureEnabled: true,
      }}
      initialRouteName={initialRouteName}
      {...props}
    >
      <Stack.Group>
        { children }
        <Stack.Screen
          name="product"
          component={Product} 
        />
        <Stack.Screen 
          name="how-it-works" 
          component={RatingsMethodology} 
          options={{
            gestureEnabled: true,
            gestureDirection: "horizontal",
            fullScreenGestureEnabled: true,
          }}
        />
      </Stack.Group>
      <Stack.Group
       screenOptions={{
         presentation: "modal",
        }}
      >
        <Stack.Screen
            name="sprive"
            component={_SaviorInitiatorScreen}
          />
        <Stack.Screen
          name="login"
          component={LoginModal}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}