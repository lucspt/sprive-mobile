import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Account from "./Account";
import Edit from "./Edit";
import Login from "./Login";
import { useContext } from "react";
import { SaviorContext } from "../../contexts/SaviorContext";
import CreateAcount from "./CreateAccount";
import { View } from "react-native";
import { Entypo } from "@expo/vector-icons"
import css from "../../styles";
import EditEmail from "./EditField";
import EditUsername from "./EditUsername";
import SaviorInitiator from "./initiator/SaviorInitiator";


const Stack = createNativeStackNavigator();

export default function AccountStack() {
  const { isLoggedIn, savior: { spriving } } = useContext(SaviorContext);

  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false
      }}
      initialRouteName={isLoggedIn ? "main" : "login"}
    >
      <Stack.Screen 
        component={Account}
        name="main"
      />
      <Stack.Screen
        component={Edit}
        name="edit" 
        options={{
          gestureEnabled: true, 
          fullScreenGestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{
          gestureEnabled: true,
          animationDuration: 230,
          animation: "slide_from_bottom",
          gestureDirection: "horizontal",
          fullScreenGestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="signup"
        component={CreateAcount}
        options={{
          gestureEnabled: false,
          animation: "slide_from_bottom",
        }}
      />
      { !spriving && 
        <Stack.Screen
          name="sprive"
          component={SaviorInitiator}
          options={{
            animation: "slide_from_bottom",
            gestureEnabled: false,
          }}
        />
      }
    </Stack.Navigator>
  )
}