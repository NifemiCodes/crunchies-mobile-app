import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderWithBack from "@/components/HeaderWithBack";
import ProfileInfo from "@/components/profileTab/ProfileInfo";
import Account from "@/components/profileTab/Account";
import Notifications from "@/components/profileTab/Notifications";
import More from "@/components/profileTab/More";

const profile = () => {
  const [userInfo, setUserInfo] = useState(Object);
  // get user Data from local storage
  (async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      const userObj = user && JSON.parse(user);
      setUserInfo(userObj);
    } catch (error) {
      console.warn(error);
    }
  })();

  return (
    <SafeAreaView className="flex-1 bg-white px-5 pt-5">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <HeaderWithBack headerText="Profile" />
        <ProfileInfo userName={userInfo.name} userEmail={userInfo.email} />
        <Account />
        <Notifications />
        <More />
      </ScrollView>
    </SafeAreaView>
  );
};
export default profile;
const styles = StyleSheet.create({});
