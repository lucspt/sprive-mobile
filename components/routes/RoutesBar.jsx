import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import TabBar from "./TabBar"
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import ProductsStack from "../products/ProductsStack";
import { useContext } from "react";
import { SaviorContext } from "../../contexts/SaviorContext";
import HomeStack from "../home/HomeStack";
import AccountStack from "../account/AccountStack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import css from "../../styles";
import HistoryStack from "../history/HistoryStack";
import SearchStack from "../search/SearchStack";
import StarredStack from "../starred/StarredStack";


const navTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: css.primary,
    background: css.primary,
    card: css.primary,
    text: css.secondary,
    border: "transparent",
  }
}
const Routes = createBottomTabNavigator();

export default function RoutesBar() {
  const { isLoggedIn, savior } = useContext(SaviorContext);

  return (
    <NavigationContainer theme={navTheme}>
      <Routes.Navigator 
        sceneContainerStyle={{ flex: 1, height: "100%" }}
        initialRouteName="home"
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
        }}
        tabBar={(props) => <TabBar {...props} />}
      > 
      <Routes.Screen 
        name="home"
        component={HomeStack}
        
        options={{
          tabBarIcon: (color) => (
            <AntDesign name="home" size={24} color={color} />
          )
        }}
      /> 
        <Routes.Screen
          name="search"
          component={SearchStack}
          options={{
            tabBarIcon: (color) => (
              <Feather name="search" size={24} color={color} />
            )
          }}
        />
        <Routes.Screen
          name="starred"
          options={{
            tabBarIcon: (color) => <AntDesign name="staro" size={24} color={color} />
          }}
          component={StarredStack}
        />
      <Routes.Screen
        name="history"
        component={HistoryStack}
        options={{
          tabBarIcon: (color) => <MaterialIcons name="history" size={24} color={color} />
          }}
          />
        <Routes.Screen
          name="account"
          component={AccountStack}
          options={{
            tabBarIcon: (color) => <AntDesign name="user" size={24} color={color} />                  
            }}
            navigationKey={String(isLoggedIn)}
          />
      </Routes.Navigator>
    </NavigationContainer>
  )
}