import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect, useRef } from "react";
import * as SplashScreen from "expo-splash-screen";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer from "../features/userSlice";
import favouritesReducer from "../features/favouritesSlice";
import cartReducer from "../features/cartSlice";
import checkoutReducer from "../features/checkoutSlice";
import { checkFirstLaunch } from "@/helpers";
import { GestureHandlerRootView } from "react-native-gesture-handler";

//TO-DO:
// delete account function
// orders screen
// location function
// date input
// forgot password function
// add slash eye icon for password Authinput;
// get correct facebook icon for welcome screen sign in option;
// get default profile picture for profile screen;
// individual product screen

// cart tab route to new screen --done
// total amount value --done
// home screen header greeting time --done

//export const baseURL = process.env.EXPO_PUBLIC_BASE_URL;
export const baseURL = "http://192.168.43.103:3000";

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
    checkout: checkoutReducer,
  },
});
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;

// let firstLaunch: boolean | undefined;

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const firstLaunch = useRef<boolean>();

  useEffect(() => {
    (async () => {
      firstLaunch.current = await checkFirstLaunch();
    })();
  }, []);

  const [loaded] = useFonts({
    "DM-reg": require("../assets/fonts/DMSans_18pt-Regular.ttf"),
    "DM-med": require("../assets/fonts/DMSans_18pt-Medium.ttf"),
    "DM-bold": require("../assets/fonts/DMSans_18pt-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded && firstLaunch.current !== undefined) {
      console.log(firstLaunch.current);
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          {firstLaunch.current ? <Stack.Screen name="walkthrough" /> : <Stack.Screen name="index" />}
        </Stack>
      </GestureHandlerRootView>
    </Provider>
  );
}
