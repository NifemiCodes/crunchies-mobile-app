import { View, Text, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState } from "react";
import ProfileOption from "./ProfileOption";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { baseURL, RootState } from "@/app/_layout";
import { useSelector } from "react-redux";
import { Colors } from "@/constants/Colors";

const More = () => {
  const user = useSelector((state: RootState) => state.user.value);
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(["user-token", "user", "favourites"]);
      router.replace("/(auth)/welcome");
    } catch (error: any) {
      console.warn(error);
      Alert.alert("Error logging out", error.message);
    }
  };

  const deleteAccount = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/user/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id }),
      });
      const data = await res.json();
      if (data.status === "OK") {
        await AsyncStorage.multiRemove(["user-token", "user", "favourites"]);
        router.replace("/(auth)/welcome");
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      Alert.alert("Error deleting user account", error.message);
    }
    setLoading(false);
  };

  const confirmDelete = () => {
    return Alert.alert("Are you sure you want to delete your account?", "This action cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => deleteAccount(), style: "destructive" },
    ]);
  };

  return (
    <View className="mt-[14px]">
      <Text className="font-dmb text-[18px] mb-3">More</Text>
      <View>
        <ProfileOption image={require("../../assets/images/chat-icon.png")} optionText="Support" />
        <ProfileOption image={require("../../assets/images/info-icon.png")} optionText="About us" />
        <ProfileOption image={require("../../assets/images/shield-icon.png")} optionText="Privacy & Security" />
        <ProfileOption image={require("../../assets/images/logout-icon.png")} optionText="Log out" pressFunction={logout} />
      </View>
      <TouchableOpacity
        className="mt-3 border border-veryLightGrey rounded-md h-[45px] w-[135px] items-center justify-center self-start"
        onPress={confirmDelete}>
        {loading ? <ActivityIndicator color={Colors.red} size={30} /> : <Text className="font-dm text-[16px] text-red">Delete Account</Text>}
      </TouchableOpacity>
    </View>
  );
};
export default More;
