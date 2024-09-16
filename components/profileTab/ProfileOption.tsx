import { View, Text, Image, TouchableOpacity } from "react-native";

interface profileOptionType {
  image: any;
  optionText: string;
  pressFunction?: () => void;
}

const ProfileOption = ({ image, optionText, pressFunction }: profileOptionType) => {
  return (
    <TouchableOpacity onPress={pressFunction} className="flex-row items-center justify-between py-4" hitSlop={5}>
      <View className="flex-row items-center gap-x-3">
        <Image source={image} className="w-6 h-6" />
        <Text className="font-dm text-[16px]">{optionText}</Text>
      </View>

      <Image source={require("../../assets/images/arrow-icon.png")} className="w-[6px] h-3" />
    </TouchableOpacity>
  );
};
export default ProfileOption;
