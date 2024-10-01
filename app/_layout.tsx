import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer from "../features/userSlice";
import favouritesReducer from "../features/favouritesSlice";
import cartReducer from "../features/cartSlice";
import { checkAuthState, checkFirstLaunch } from "@/helpers";
import { GestureHandlerRootView } from "react-native-gesture-handler";

//TO-DO:
// UNCOMMENT NETINFO IMPORTS BEFORE REBUILDING

// complete input validation;
// add slash eye icon for password Authinput;
// get correct facebook icon for welcome screen sign in option;
// get default profile picture for profile screen;
// sync db favourites data to local storage data
// cart screen tab marker UI
// cart item slide animation
// orders screen
// individual product screen
// edit profile screen

//export const baseURL = process.env.EXPO_PUBLIC_BASE_URL;
export const baseURL = "http://192.168.100.7:3000";

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

// redux store
const store = configureStore({
  reducer: {
    user: userReducer,
    favourites: favouritesReducer,
    cart: cartReducer,
  },
});
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;

let firstLaunch: boolean | undefined;
(async () => {
  firstLaunch = await checkFirstLaunch();
})();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [signedIn, setSignedIn] = useState<boolean>();

  //useEffect(() => {
  (async () => {
    const authState = await checkAuthState();
    setSignedIn(authState);
  })();
  //}, []);

  const [loaded] = useFonts({
    "DM-reg": require("../assets/fonts/DMSans_18pt-Regular.ttf"),
    "DM-med": require("../assets/fonts/DMSans_18pt-Medium.ttf"),
    "DM-bold": require("../assets/fonts/DMSans_18pt-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded && firstLaunch !== undefined) {
      SplashScreen.hideAsync();
    }
  }, [loaded, firstLaunch]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          {firstLaunch ? <Stack.Screen name="walkthrough" /> : signedIn ? <Stack.Screen name="(tabs)" /> : <Stack.Screen name="index" />}
        </Stack>
      </GestureHandlerRootView>
    </Provider>
  );
}
