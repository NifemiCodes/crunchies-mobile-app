import { Card } from "@/app/_layout";
import { View, Text, Image } from "react-native";

const Platter = ({ image, title, price }: Card) => {
  return (
    <View className="flex-row items-center space-x-2">
      <Image className="h-[104px] flex-[1]" source={image} />

      <View className="gap-y-1 flex-[2]">
        <Text className="font-dmMed text-[14px]">{title}</Text>
        <Text className="font-dmb text-[18px]">
          <Text className=" text-red">₦</Text>
          <Text>{price}</Text>
        </Text>
      </View>
    </View>
  );
};

const Trending = () => {
  return (
    <View className="mx-5 gap-y-3">
      <Text className="font-dmMed text-[16px] text-[#171725]">Trending Platters</Text>

      <View>
        <Platter
          image={require("../../assets/images/grilled-fish.png")}
          title="Grilled fish with spicy onion sauce with black roasted beef"
          price="12,700"
        />
      </View>
      <View>
        <Platter
          image={require("../../assets/images/fruit-sandwich.png")}
          title="Grilled fish with spicy onion sauce with black roasted beef"
          price="32,000"
        />
      </View>
      <View>
        <Platter
          image={require("../../assets/images/grilled-fish.png")}
          title="Grilled fish with spicy onion sauce with black roasted beef"
          price="12,700"
        />
      </View>
      <View>
        <Platter
          image={require("../../assets/images/fruit-sandwich.png")}
          title="Grilled fish with spicy onion sauce with black roasted beef"
          price="32,000"
        />
      </View>
    </View>
  );
};
export default Trending;
