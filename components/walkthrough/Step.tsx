import { View, Text, Dimensions, Image } from "react-native";
import { walkthroughDataType } from "@/app/walkthrough";

const Step = ({ image, subtitle, title, text }: walkthroughDataType) => {
  const screenWidth = Dimensions.get("window").width;

  return (
    <View className="justify-center items-center gap-y-4 p-[40px]" style={{ width: screenWidth }}>
      <Image source={image} className="w-full h-[50%]" />

      {/* text */}
      <View className="gap-y-[23px]">
        <View className="gap-y-1">
          <Text className="font-dmb text-[16.22px] text-red text-center leading-[21px] tracking-[-0.39px]">{subtitle}</Text>
          <Text className="font-dmb text-[20.99px] text-[#1c1c1e] text-center leading-[26.7px] tracking-[0.33px]">{title}</Text>
        </View>

        <Text className="font-dm text-[14.31px] text-[#636366] text-center leading-[19.1px] tracking-[-0.23px]">{text}</Text>
      </View>
    </View>
  );
};
export default Step;
