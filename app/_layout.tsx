import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import { Provider } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

//TO-DO:
// complete input validation;
// add slash eye icon for password Authinput;
// implement proper user feedback system??
// network timeout alert feature??
// get correct facebook icon for welcome screen sign in option;
// use correct liked heart icon;
//get default profile picture for profile screen;

export const baseURL = process.env.EXPO_PUBLIC_BASE_URL;
export interface Card {
  image: any;
  title: string;
  price?: string;
}

// redux store
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;

export const storeData = async (token: string, userData: object) => {
  try {
    await AsyncStorage.setItem("user-token", token);
    await AsyncStorage.setItem("user", JSON.stringify(userData));
  } catch (error) {
    console.warn(error);
  }
};

export const checkAuthState = async () => {
  try {
    const token = await AsyncStorage.getItem("user-token");
    return token ? true : false;
  } catch (error) {
    console.warn(error);
  }
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [signedIn, setSignedIn] = useState<boolean>();
  const [loaded] = useFonts({
    "DM-reg": require("../assets/fonts/DMSans_18pt-Regular.ttf"),
    "DM-med": require("../assets/fonts/DMSans_18pt-Medium.ttf"),
    "DM-bold": require("../assets/fonts/DMSans_18pt-Bold.ttf"),
  });

  useEffect(() => {
    (async () => {
      const authState = await checkAuthState();
      setSignedIn(authState);
    })();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>{signedIn ? <Stack.Screen name="(tabs)" /> : <Stack.Screen name="(auth)/welcome" />}</Stack>
    </Provider>
  );
}
