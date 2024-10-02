import { View, Text } from "react-native";
import ProfileOption from "./ProfileOption";
import { router } from "expo-router";

const Account = () => {
  return (
    <View className="mt-[10px]">
      <Text className="font-dmb text-[18px] mb-3">My Account</Text>
      <View>
        <ProfileOption
          image={require("../../assets/images/profile-icon-red.png")}
          optionText="My Profile"
          pressFunction={() => router.push("/editProfile")}
        />
        <ProfileOption image={require("../../assets/images/orders-icon-red.png")} optionText="My Orders" />
        <ProfileOption image={require("../../assets/images/ticket-icon.png")} optionText="Promocode" />
      </View>
    </View>
  );
};
export default Account;
