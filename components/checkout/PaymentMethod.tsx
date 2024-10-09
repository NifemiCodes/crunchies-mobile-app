import { View, Text, Image, Pressable } from "react-native";

interface PaymentMethod {
  methodIcon: any;
  methodName: string;
  selected: boolean;
  pressFunction: () => void;
}

const PaymentMethod = ({ methodIcon, methodName, selected, pressFunction }: PaymentMethod) => {
  const podIcon = (
    <View className="rounded-[5px] bg-PODbg w-[52px] h-9 items-center justify-center">
      <Image className="w-[23px] h-[26px]" source={require("../../assets/images/payondelivery-icon.png")} />
    </View>
  );

  return (
    <Pressable
      onPress={pressFunction}
      className={`w-full flex-row items-center justify-between border ${selected ? "border-red" : "border-veryLightGrey"} rounded-lg p-[10px] mb-4`}>
      <View className="flex-row items-center gap-x-[10px]">
        {methodName === "Pay On Delivery" ? podIcon : <Image className="w-[52px] h-9" source={methodIcon} />}
        <Text className="font-dm text-[13px] leading-[22px]">{methodName}</Text>
      </View>

      <Image
        className="w-5 h-5"
        source={selected ? require("../../assets/images/radio-filled.png") : require("../../assets/images/radio-empty.png")}
      />
    </Pressable>
  );
};
export default PaymentMethod;
