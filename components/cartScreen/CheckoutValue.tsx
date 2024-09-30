import { View, Text } from "react-native";
const CheckoutValue = ({ name, value }: { name: string; value: string }) => {
  return (
    <View className="w-full flex-row items-center justify-between">
      <Text className={"font-dm text-[13px] text-grey leading-5"}>{name}</Text>
      <Text className="font-dm text-[13px] leading-5">{value}</Text>
    </View>
  );
};
export default CheckoutValue;
