import { router } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native";
const HeaderWithBack = ({ headerText }: { headerText: string }) => {
  return (
    <View className="flex-row items-center gap-x-4">
      <TouchableOpacity onPress={router.back} hitSlop={7}>
        <Image source={require("../assets/images/back-arrow-icon.png")} className="w-6 h-6" />
      </TouchableOpacity>
      <Text className="font-dmb text-[18px]">{headerText}</Text>
    </View>
  );
};
export default HeaderWithBack;
