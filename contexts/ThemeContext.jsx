import { createContext, useCallback, useMemo, useState } from "react"
import { Platform } from "react-native";

export const ThemeContext = createContext()

const darkPrimary = "#181b1f";
const darkSecondary = "#eeeeee";
const white = "#fff";
const black = "#000";


export default function ThemeContextProvider({ children }) {

  const [ theme, setTheme ] = useState("dark");

  const toggleTheme = useCallback(
    () => theme === "dark" ? setTheme("light") : setTheme("dark"), 
    [theme]
  );

  const css = useMemo(() => {
    const themedStyles = 
    theme === "dark" 
      ? {
        primary: darkPrimary,
        secondary: darkSecondary
      }
      : {
        primary: white,
        secondary: black,
      }
    return {
      ...themedStyles,

        root: {
          paddingTop: Platform.OS === "android" ? 25 : 50,
          paddingLeft: 10,
          backgroundColor: themedStyles.primary,
          color: themedStyles.secondary,
          height: "100%",
          width: "100%",
        },

        header: {
          fontWeight: 900,
          fontSize: 20
        },
      
        subHeader: {
          fontWeight: 900,
          fontSize: 18
        },
      
        headerContainer: {
          flex: 1,
          width: "100%",
          flexDirection: "row",
          alignItems: "center"
        },
      
        screen: {

        },
      
        bottomBar: {
          flexDirection: "row",
          width: "100%",
          paddingBottom: 15,
          justifyContent: "space-evenly",
          alignItems: "center",
          paddingLeft: 20,
          paddingRight: 20,
        },
      
        active: {
          color: white,
        },
      
        route: {
          alignItems: "center",
          gap: 7,
          fontSize: 10
        },
      
        routeText: {
          fontSize: "inherit"
        },
      
        row: {
          flexDirection: "row",
          flex: 1,
          width: "100%",
        },
        
        defaultBtn: {
          backgroundColor: themedStyles.secondary,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 10,
          paddingTop: 10,
          alignSelf: "flex-start",
          borderRadius: 15,
          color: black,
        },
      
        buttonText: {
          fontSize: 12,
          color: theme === "dark" ? black : white
        },

        searchBar: {
          backgroundColor: themedStyles.secondary,
          borderRadius: 13,
          flexDirection: "row",
          gap: 5,
          color: themedStyles.primary,
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 5,
          paddingBottom: 5
        }
    };
  }, [theme]);

  const context = useMemo(() => ({
    theme,
    css,
    toggleTheme,
  }), [theme]);

  return (
    <ThemeContext.Provider value={context}>
      { children } 
    </ThemeContext.Provider>
  )
}
