import { Card } from "@/app/_layout";
import { Colors } from "@/constants/Colors";
import { View, Text, ScrollView, Image } from "react-native";

const Dish = ({ image, title, price }: Card) => {
  return (
    <View
      className="bg-white flex-row w-[191px] gap-x-2 py-[11px] px-2 rounded-[15px]"
      style={{ elevation: 2, shadowColor: Colors.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5.73 }}>
      <Image className="w-[52px] h-[52px]" source={image} />
      <View className="gap-y-[2px]">
        <Text className="font-dm text-[12px]">{title}</Text>
        <Text className="font-dmMed text-[11px]">{price}</Text>
        <Text className="font-dmd text-[11px] text-green">30% off upto 60</Text>
      </View>
    </View>
  );
};

const Recommended = () => {
  return (
    <View className="ml-5 gap-y-1">
      <Text className="font-dmMed text-[16px]">Recommended</Text>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ columnGap: 16, paddingVertical: 2, paddingHorizontal: 10 }}>
        <Dish image={require("../assets/images/deccan.png")} title="Deccan Queen R..." price="₦5,000" />
        <Dish image={require("../assets/images/tiffins.png")} title="Mamoo's Tiffins" price="₦23,700" />
        <Dish image={require("../assets/images/deccan.png")} title="Deccan Queen R..." price="₦5,000" />
        <Dish image={require("../assets/images/tiffins.png")} title="Mamoo's Tiffins" price="₦23,700" />
      </ScrollView>
    </View>
  );
};
export default Recommended;
