import { View, Text, Alert } from "react-native";
import ProfileOption from "./ProfileOption";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const More = () => {
  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(["user-token", "user", "favourites"]);
      router.replace("/(auth)/welcome");
    } catch (error: any) {
      console.warn(error);
      Alert.alert("Error logging out", error.message);
    }
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
    </View>
  );
};
export default More;
