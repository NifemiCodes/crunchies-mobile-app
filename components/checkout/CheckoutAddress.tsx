import { View, Text, Image, TouchableOpacity } from "react-native";
const CheckoutAddress = () => {
  return (
    <View className="w-full bg-white rounded-lg p-4" style={{ elevation: 5 }}>
      <View className="w-full flex-row items-center justify-between mb-2">
        <Text className="font-dmMed text-[16px] leading-6">Home</Text>
        <TouchableOpacity>
          <Image className="w-4 h-4" source={require("../../assets/images/edit-icon.png")} />
        </TouchableOpacity>
      </View>
      <View>
        <Text className="font-dm text-[13px] text-grey leading-5">Lagos, Lekki Phase 1</Text>
        <Text className="font-dm text-[13px] text-grey leading-5">Freedom Way NO: 3, Floor 27</Text>
      </View>
    </View>
  );
};
export default CheckoutAddress;
