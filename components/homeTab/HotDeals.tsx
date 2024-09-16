import { Card } from "@/app/_layout";
import { View, Text, ScrollView, Image } from "react-native";

const Deal = ({ image, title, price }: Card) => {
  return (
    <View className="relative rounded-[20px] overflow-hidden">
      <Image className="w-[200px] h-[164px]" source={image} />

      {/* details container */}
      <View className="absolute top-[50%] bottom-2 left-2 right-2 bg-detailsBg px-2 pt-1 rounded-xl gap-y-[6px]" style={{}}>
        <View className="flex-row justify-between items-start">
          <Text className="text-white text-[14px] font-dmMed w-[70%]">{title}</Text>
          <Image className="w-4 h-4" source={require("../../assets/images/heart-full.png")} />
        </View>

        <View className="flex-row gap-x-1 items-start">
          <Text className="text-pink text-[12px] font-dmMed">₦</Text>
          <Text className="text-white text-[18px] font-dmb">{price}</Text>
        </View>
      </View>
    </View>
  );
};

const HotDeals = () => {
  return (
    <View className="gap-y-[10px]">
      <View className="mx-5 flex-row justify-between items-center">
        <Text className="font-dmMed text-[16px] text-darkBlue">Hot Deals 🔥</Text>
        <Text className="font-dmMed text-[12px] text-red">See All</Text>
      </View>

      <View className="ml-5">
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ columnGap: 15 }}>
          <Deal image={require("../../assets/images/pancakes.png")} title="Viral stacking cake with honey" price="9,670" />
          <Deal image={require("../../assets/images/roast-beef.png")} title="Roast beef with black pepper" price="8,000" />
          <Deal image={require("../../assets/images/pancakes.png")} title="Viral stacking cake with honey" price="9,670" />
          <Deal image={require("../../assets/images/roast-beef.png")} title="Roast beef with black pepper" price="8,000" />
          <Deal image={require("../../assets/images/pancakes.png")} title="Viral stacking cake with honey" price="9,670" />
        </ScrollView>
      </View>
    </View>
  );
};
export default HotDeals;
