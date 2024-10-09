import { View, Text, Image, TouchableOpacity } from "react-native";

const Coupon = () => {
  return (
    <View className="w-full h-[45px] my-5 flex-row items-center justify-between border border-solid border-veryLightGrey rounded-md overflow-hidden">
      <View className="flex-[2] flex-row items-center gap-x-2">
        <View className="border-r border-r-veryLightGrey border-r-solid px-2 py-1">
          <Image className="w-8 h-[18px]" source={require("../../assets/images/cart-coupon.png")} />
        </View>
        <Text className="font-dm text-[13px] text-grey">Coupon code</Text>
      </View>

      <TouchableOpacity className="bg-darkGreen items-center justify-center flex-[0.68] h-full">
        <Text className="text-white font-dmMed text-[13px]">Apply</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Coupon;
