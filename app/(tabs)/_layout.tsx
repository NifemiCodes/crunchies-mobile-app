import { Colors } from "@/constants/Colors";
import { Tabs } from "expo-router";
import { useRef } from "react";
import { Image, StyleSheet, View } from "react-native";
import Animated, { Easing, useSharedValue, withTiming } from "react-native-reanimated";

const bagIcon = (
  <View className="bg-white rounded-full p-3 absolute">
    <View
      className="bg-red rounded-full h-[52px] w-[52px] justify-center items-center"
      style={{ shadowColor: Colors.red, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.32, shadowRadius: 12, elevation: 10 }}>
      <Image className="w-6 h-6" source={require("../../assets/images/bag-outline-white.png")} />
    </View>
  </View>
);

const TabLayout = () => {
  const homeIcon = useRef<Image>(null);
  const favIcon = useRef<Image>(null);
  const ordersIcon = useRef<Image>(null);
  const ProfileIcon = useRef<Image>(null);

  const left = useSharedValue(10);

  const moveMarker = (tabName: "home" | "fav" | "orders" | "profile" | null) => {
    if (tabName === "home") {
      homeIcon.current?.measureInWindow((x, y, width) => (left.value = withTiming(x - width / 2, { duration: 200, easing: Easing.linear })));
    } else if (tabName === "fav") {
      favIcon.current?.measureInWindow((x, y, width) => (left.value = withTiming(x - width / 2, { duration: 200, easing: Easing.linear })));
    } else if (tabName === "orders") {
      ordersIcon.current?.measureInWindow((x, y, width) => (left.value = withTiming(x - width / 2, { duration: 200, easing: Easing.linear })));
    } else if (tabName === "profile") {
      ProfileIcon.current?.measureInWindow((x, y, width) => (left.value = withTiming(x - width / 2, { duration: 200, easing: Easing.linear })));
    }

    // switch (tabName) {
    //   case "home":
    //     console.log("home");
    //     homeIcon.current?.measureInWindow((x) => (left.value = x));
    //     break;
    //   case "fav":
    //     console.log("fav");
    //     favIcon.current?.measureInWindow((x) => (left.value = x));
    //     break;
    //   case "orders":
    //     console.log("orders");
    //     ordersIcon.current?.measureInWindow((x) => (left.value = x));
    //     break;
    //   case "profile":
    //     console.log("profile");
    //     () => ProfileIcon.current?.measureInWindow((x) => (left.value = x));
    //     break;
    // }
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
                <Image ref={homeIcon} className="w-6 h-6" source={require("../../assets/images/home-outline.png")} />
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
                <Image ref={favIcon} className="w-6 h-6" source={require("../../assets/images/heart-outline.png")} />
              );
            },
            tabBarIconStyle: { marginBottom: 5 },
            tabBarLabel: ({ focused }) => {
              focused ? moveMarker("fav") : null;
              return null;
            },
          }}
        />

        {/* shopping bag */}
        <Tabs.Screen
          name="shopping"
          options={{
            tabBarIcon: () => bagIcon,
            tabBarIconStyle: { top: "-60%" },
            tabBarLabel: () => null,
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
                <Image ref={ordersIcon} className="w-6 h-6" source={require("../../assets/images/orders-outline.png")} />
              );
            },
            tabBarIconStyle: { marginBottom: 5 },
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
                <Image ref={ProfileIcon} className="w-6 h-6" source={require("../../assets/images/profile-outline.png")} />
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
