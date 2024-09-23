import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import store from "./app/context/store";
import React, { useCallback, useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FONTS, SIZES, COLORS } from "./app/constant";
import StackNavigator from "./app/navigation/StackNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import NetInfo from "@react-native-community/netinfo";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  // Load custom fonts
  useEffect(() => {
    async function loadCustomFonts() {
      try {
        await Font.loadAsync({
          medium: require("./assets/fonts/DMSans-Medium.ttf"),
          regular: require("./assets/fonts/DMSans-Regular.ttf"),
          semi: require("./assets/fonts/DMSans-SemiBold.ttf"),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.warn(error);
      }
    }

    loadCustomFonts();
  }, []);

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        try {
          // Pre-load other assets or make any API calls here
          //await Entypo.loadAsync(); // Load Entypo font
          // Artificially delay for two seconds to simulate a slow loading
          // experience. Please remove this if you copy and paste the code!
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error) {
          console.warn(error);
        } finally {
          // Tell the application to render
          setAppIsReady(true);
        }
      }
    }
    prepare();
  }, [fontsLoaded]);

  // Network connectivity management
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        Toast.show({
          type: "warn",
          text1:"No Internet Connection",
          text2:"Please check your internet connection and try again.",
        });
      } else if (state.isConnected && state.isInternetReachable === false) {
        Toast.show({
          type: "warn",
          text1:"Poor Internet Connection",
          text2:"Your internet connection seems to be weak. Some features may not work properly.",
        });
      }
    });

    return () => unsubscribe();
  }, []);
  
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider onLayout={onLayoutRootView}>
        <Provider store={store}>
          <StatusBar color="dark" />
          {isConnected ? (
            <StackNavigator />
          ) : (
            <View style={styles.offlineContainer}>
              <Text style={styles.offlineText}>No Internet Connection</Text>
            </View>
          )}
          <Toast position="top" topOffset={SIZES.base5} />
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  offlineContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  offlineText: {
    alignSelf: "center",
    justifyContent: "center",
    ...FONTS.body4,
    padding: SIZES.base2,
  },
});
