import { View, Text, Image, ImageBackground } from "react-native";
import type { UserLocation } from "@/app/_layout";

const Location = ({ location }: { location: UserLocation | string }) => {
  return (
    <ImageBackground
      className="mx-5 h-[54px] px-[15px] flex-row justify-between items-center rounded-lg overflow-hidden"
      source={require("../../assets/images/location-bg.png")}
      resizeMode="cover">
      <View className="flex-[2] flex-row items-center">
        <Image className="w-[30px] h-[30px] mr-4" source={require("../../assets/images/location-icon.png")} />

        <View>
          <Text className="font-dm font-medium text-[16px]">Current Location</Text>
          <Text className="font-dm text-grey text-[13px]">
            {typeof location === "string" ? location : `${location.name} ${location.city} ${location.region}`}
          </Text>
        </View>
      </View>

      <View className="flex[1]">
        <Image className="w-[6px] h-[12px]" source={require("../../assets/images/arrow-icon.png")} />
      </View>
    </ImageBackground>
  );
};
export default Location;
