import { View, Text, TouchableOpacity, Image } from "react-native";

interface OrderType {
  image: string;
  title: string;
  price: string;
  itemCount: number;
  date: string;
  time: string;
}

const Order = ({ image, title, price, itemCount, date, time }: OrderType) => {
  return (
    <View className="rounded-md p-3 drop-shadow-sm border border-solid border-veryLightGrey">
      <View className="flex-row gap-x-3 mb-3">
        <View className="h-[70px] flex-[1] rounded-md overflow-hidden">
          <Image className="h-full w-full" source={{ uri: image }} height={70} />
        </View>

        <View className="flex-[2] items-start justify-between">
          <Text className="font-dm text-[14px]">{title}</Text>
          <View className="flex-row gap-x-1 items-center">
            <Text className="font-dm text-grey text-[14px]">{`${itemCount} ${itemCount > 1 ? "items" : "item"}:`}</Text>
            <Text className="font-dmMed text-[14px] text-darkGreen">{price}</Text>
          </View>
          <Text className="font-dm text-[12px] text-grey">{`(${date} . ${time})`}</Text>
        </View>
      </View>

      <View className="flex-row gap-x-3">
        <TouchableOpacity className="flex-1 flex-row bg-red rounded-[5px] h-7 items-center justify-center">
          <Image className="w-[14px] h-[14px] mr-1" source={require("../../assets/images/rotate-icon.png")} />
          <Text className="font-dmMed text-[12px] text-white leading-[18px]">Reorder</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-white rounded-[5px] border border-solid border-darkGreen h-7 items-center justify-center">
          <Text className="font-dmMed text-[12px] text-darkGreen leading-[18px]">Get Help</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Order;
