import { router, Tabs } from "expo-router";
import { Image, StyleSheet, View, Text, Pressable } from "react-native";
import { Colors } from "@/constants/Colors";
import React, { useRef } from "react";
import Animated, { Easing, useSharedValue, withTiming } from "react-native-reanimated";
import { useSelector } from "react-redux";
import { RootState } from "../_layout";

const TabLayout = () => {
  const cartCount = useSelector((state: RootState) => state.cart.value.cartCount);

  const homeIconRef = useRef<Image>(null);
  const favIconRef = useRef<Image>(null);
  const ordersIconRef = useRef<Image>(null);
  const ProfileIconRef = useRef<Image>(null);

  const cartIcon = (
    <Pressable onPress={() => router.push("/cart")} hitSlop={7} className="bg-white rounded-full p-3 absolute top-[-70%] left-[39%]">
      <View
        className="relative bg-red rounded-full h-[52px] w-[52px] justify-center items-center"
        style={{ shadowColor: Colors.red, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.32, shadowRadius: 12, elevation: 10 }}>
        {cartCount > 0 ? (
          <View className="absolute top-[-14%] left-[50%] bg-red w-6 h-6 justify-center items-center rounded-full" style={{ elevation: 4 }}>
            <Text className="text-white font-dm text-[13px]">{cartCount}</Text>
          </View>
        ) : null}
        <Image className="w-6 h-6" source={require("../../assets/images/bag-outline-white.png")} />
      </View>
    </Pressable>
  );

  const left = useSharedValue(10);

  const moveMarker = (tabName: "home" | "fav" | "orders" | "profile" | null) => {
    if (tabName === "home") {
      homeIconRef.current?.measureInWindow((x, y, width) => (left.value = withTiming(x - width / 2, { duration: 200, easing: Easing.linear })));
    } else if (tabName === "fav") {
      favIconRef.current?.measureInWindow((x, y, width) => (left.value = withTiming(x - width / 2, { duration: 200, easing: Easing.linear })));
    } else if (tabName === "orders") {
      ordersIconRef.current?.measureInWindow((x, y, width) => (left.value = withTiming(x - width / 2, { duration: 200, easing: Easing.linear })));
    } else if (tabName === "profile") {
      ProfileIconRef.current?.measureInWindow((x, y, width) => (left.value = withTiming(x - width / 2, { duration: 200, easing: Easing.linear })));
    }
  };

  return (
    <>
      <Tabs screenOptions={{ headerShown: false, tabBarStyle: styles.tabContainer }}>
        {/* home tab */}
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ focused }) => {
              return focused ? (
                <Image className="w-6 h-6" source={require("../../assets/images/home-filled.png")} />
              ) : (
                <Image ref={homeIconRef} className="w-6 h-6" source={require("../../assets/images/home-outline.png")} />
              );
            },
            tabBarIconStyle: { marginBottom: 5 },
            tabBarLabel: ({ focused }) => {
              focused ? moveMarker("home") : null;
              return null;
            },
          }}
        />

        {/* favourites tab */}
        <Tabs.Screen
          name="favourites"
          options={{
            tabBarIcon: ({ focused }) => {
              return focused ? (
                <Image className="w-6 h-6" source={require("../../assets/images/heart-filled.png")} />
              ) : (
                <Image ref={favIconRef} className="w-6 h-6" source={require("../../assets/images/heart-outline.png")} />
              );
            },
            tabBarIconStyle: { marginBottom: 5, marginLeft: -20 },
            tabBarLabel: ({ focused }) => {
              focused ? moveMarker("fav") : null;
              return null;
            },
          }}
        />

        {/* cart screen */}
        <Tabs.Screen
          name="cartTab"
          options={{
            tabBarButton: () => cartIcon,
          }}
        />

        {/* orders tab */}
        <Tabs.Screen
          name="orders"
          options={{
            tabBarIcon: ({ focused }) => {
              return focused ? (
                <Image className="w-6 h-6" source={require("../../assets/images/orders-filled.png")} />
              ) : (
                <Image ref={ordersIconRef} className="w-6 h-6" source={require("../../assets/images/orders-outline.png")} />
              );
            },
            tabBarIconStyle: { marginBottom: 5, marginRight: -20 },
            tabBarLabel: ({ focused }) => {
              focused ? moveMarker("orders") : null;
              return null;
            },
          }}
        />

        {/* profile tab */}
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ focused }) => {
              return focused ? (
                <Image className="w-6 h-6" source={require("../../assets/images/profile-filled.png")} />
              ) : (
                <Image ref={ProfileIconRef} className="w-6 h-6" source={require("../../assets/images/profile-outline.png")} />
              );
            },
            tabBarIconStyle: { marginBottom: 5 },
            tabBarLabel: ({ focused }) => {
              focused ? moveMarker("profile") : null;
              return null;
            },
          }}
        />
      </Tabs>

      <Animated.Image className={`w-[50.62px] h-[13px] absolute bottom-0`} style={{ left }} source={require("../../assets/images/tab-marker.png")} />
    </>
  );
};
export default TabLayout;
const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: Colors.white,
    position: "absolute",
    borderTopWidth: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 68,
    paddingTop: 10,
    elevation: 20,
  },
});
