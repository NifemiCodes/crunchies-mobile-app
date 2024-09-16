import { View, Text, Image } from "react-native";
import ToggleButton from "./ToggleButton";
const ProfileToggleOption = ({ text }: { text: string }) => {
  return (
    <View className="flex-row justify-between items-center py-4">
      <View className="flex-row items-center gap-x-3">
        <Image source={require("../../assets/images/bell-icon.png")} className="w-6 h-6" />
        <Text className="font-dm text-[16px]">{text}</Text>
      </View>
      <ToggleButton />
    </View>
  );
};
export default ProfileToggleOption;
