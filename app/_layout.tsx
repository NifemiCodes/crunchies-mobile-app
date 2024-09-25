import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userReducer from "../features/userSlice";
import favouritesReducer from "../features/favouritesSlice";
import cartCounterReducer from "../features/cartCounterSlice";

//TO-DO:
// complete input validation;
// add slash eye icon for password Authinput;
// get correct facebook icon for welcome screen sign in option;
// get default profile picture for profile screen;
// fix home screen ui
// storing the user data;

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
  image: any; // change this to string
  price: string;
}

// redux store
const store = configureStore({
  reducer: {
    user: userReducer,
    favourites: favouritesReducer,
    cartCounter: cartCounterReducer,
  },
});
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;

// store data to local storage
export const storeData = async (token: string, userData: object, favs: string) => {
  try {
    await AsyncStorage.setItem("user-token", token);
    await AsyncStorage.setItem("user", JSON.stringify(userData));
    await AsyncStorage.setItem("favourites", JSON.stringify(favs));
  } catch (error) {
    console.warn(error);
  }
};

// check user authentication state (signed in or signed out)
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

  useEffect(() => {
    (async () => {
      const authState = await checkAuthState();
      setSignedIn(authState);
    })();
  }, []);

  const [loaded] = useFonts({
    "DM-reg": require("../assets/fonts/DMSans_18pt-Regular.ttf"),
    "DM-med": require("../assets/fonts/DMSans_18pt-Medium.ttf"),
    "DM-bold": require("../assets/fonts/DMSans_18pt-Bold.ttf"),
  });

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
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="walkthrough" />
        {/* {signedIn ? <Stack.Screen name="(tabs)" /> : <Stack.Screen name="(auth)/welcome" />} */}
      </Stack>
    </Provider>
  );
}
