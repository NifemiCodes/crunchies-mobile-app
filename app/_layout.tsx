import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer from "../features/userSlice";
import favouritesReducer from "../features/favouritesSlice";
import cartReducer from "../features/cartSlice";
import checkoutReducer from "../features/checkoutSlice";
import ordersReducer from "../features/ordersSlice";
import passwordReducer from "../features/passwordSlice";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

//TO-DO:
// forgot password function
// add slash eye icon for password Authinput;
// get correct facebook icon for welcome screen sign in option;
// get default profile picture for profile screen;

export const baseURL = process.env.EXPO_PUBLIC_BASE_URL;
export const wsURL = process.env.EXPO_PUBLIC_WS_URL;

export interface Card {
  image: any;
  title: string;
  price?: string;
}
export interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
}
export interface CartProduct {
  id: string;
  name: string;
  image: string;
  price: string;
  productCount: number;
}
export interface UserLocation {
  city: string | null;
  name: string | null;
  region: string | null;
  street?: string | null;
}
export interface OrderProduct extends CartProduct {
  date: string;
  time: string;
}

// redux store
const store = configureStore({
  reducer: {
    user: userReducer,
    favourites: favouritesReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: ordersReducer,
    password: passwordReducer,
  },
});
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [loaded] = useFonts({
    "DM-reg": require("../assets/fonts/DMSans_18pt-Regular.ttf"),
    "DM-med": require("../assets/fonts/DMSans_18pt-Medium.ttf"),
    "DM-bold": require("../assets/fonts/DMSans_18pt-Bold.ttf"),
    "Manrope-reg": require("../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-med": require("../assets/fonts/Manrope-Medium.ttf"),
  });

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasLaunched = await AsyncStorage.getItem("has-launched");
      if (hasLaunched === null) {
        setIsFirstLaunch(true);
        await AsyncStorage.setItem("has-launched", "true");
      } else {
        setIsFirstLaunch(false);
      }
      setLoading(false);
    };
    checkFirstLaunch();
  }, []);

  useEffect(() => {
    if (loaded && !loading) {
      console.log(isFirstLaunch);
      SplashScreen.hideAsync();
    }
  }, [loaded, loading]);

  if (!loaded || loading) {
    return null;
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>{isFirstLaunch ? <Stack.Screen name="walkthrough" /> : <Stack.Screen name="index" />}</Stack>
      </GestureHandlerRootView>
    </Provider>
  );
}
