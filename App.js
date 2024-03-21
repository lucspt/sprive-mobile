import Root from './components/Root';
import SaviorContextProvider from './contexts/SaviorContext';
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";
import css from './styles';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider, createTheme } from '@rneui/themed';
import { preventAutoHideAsync, hideAsync } from "expo-splash-screen"


// const theme = createTheme({
//   lightColors: {},
//   mode: "dark",
//   darkColors: {
//     primary: css.black,
//     secondary: css.secondary,
//     background: css.primary,
//     white: css.black,
//     black: css.secondary,
//     searchBg: css.highlight
//   },
// })

// preventAutoHideAsync();
// setTimeout(hideAsync, 3000);
export default function App() {
  
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      {/* <ThemeProvider theme={theme}> */}
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SaviorContextProvider>
            <Root />
          </SaviorContextProvider>
        </GestureHandlerRootView>
      {/* </ThemeProvider> */}
    </SafeAreaProvider>
  );
}


