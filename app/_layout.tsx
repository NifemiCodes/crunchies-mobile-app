import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

export interface Card {
  image: any;
  title: string;
  price?: string;
}

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
