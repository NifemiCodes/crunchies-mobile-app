import { View, Text } from "react-native";
import ProfileToggleOption from "./ProfileToggleOption";
const Notifications = () => {
  return (
    <View className="mt-[14px]">
      <Text className="font-dmb text-[18px] mb-3">Notifications</Text>
      <View>
        <ProfileToggleOption text="Push Notifications" />
        <ProfileToggleOption text="Promotional Notifications" />
      </View>
    </View>
  );
};
export default Notifications;
