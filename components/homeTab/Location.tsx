import { View, Text, Image, ImageBackground } from "react-native";
const Location = () => {
  return (
    <ImageBackground
      className="mx-5 h-[54px] px-[15px] flex-row justify-between items-center rounded-lg overflow-hidden"
      source={require("../../assets/images/location-bg.png")}
      resizeMode="cover">
      <Image className="w-[30px] h-[30px]" source={require("../../assets/images/location-icon.png")} />

      <View>
        <Text className="font-dm font-medium text-[16px]">Current Location</Text>
        <Text className="font-dm text-grey text-[13px]">3 Ajayi Street Lekki Phase 1 Lagos</Text>
      </View>

      <Image className="w-[6px] h-[12px]" source={require("../../assets/images/arrow-icon.png")} />
    </ImageBackground>
  );
};
export default Location;
