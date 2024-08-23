import { View, Text, Image } from "react-native";

const Header = () => {
  return (
    <View className="flex-row justify-between items-center mt-5 px-5">
      <View>
        <Text className="font-dmb text-[18px]">Hi Chinedu</Text>
        <Text className="font-dm text-grey text-[14px]">It's lunch time!</Text>
      </View>

      <View className="rounded-full w-[40px] h-[40px] bg-redT flex justify-center items-center">
        <Image className="w-5 h-5" source={require("../assets/images/search-icon.png")} />
      </View>
    </View>
  );
};
export default Header;
