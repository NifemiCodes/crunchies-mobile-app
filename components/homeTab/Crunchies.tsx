import { View, Text, Image } from "react-native";
import Heart from "../Heart";

interface Product {
  image: any;
  title: string;
  price: string;
  isHot: boolean;
}

const Product = ({ image, title, price, isHot }: Product) => {
  return (
    <View className="gap-y-[10px]">
      <View className="relative w-full rounded-md overflow-hidden">
        {isHot ? <Image className="absolute z-[1] w-[58px] h-5 top-[10px] left-[10px]" source={require("../../assets/images/hot-deal.png")} /> : null}
        <Heart heartStyles="w-5 h-5 absolute z-[1] w-5 h-5 top-[10px] right-[10px]" />
        <Image className="w-full h-40" source={image} />
      </View>

      <View className="gap-y-[2px]">
        <Text className="font-dm text-[14px]">{title}</Text>

        <View className="flex-row justify-between items-center">
          <Text className="font-dmMed text-[14px]">{price}</Text>

          <View className="flex-row items-center gap-x-1">
            <Image className="w-3 h-3" source={require("../../assets/images/truck-icon.png")} />
            <Text className="font-dm text-[12px] tracking-[-0.3px]">Free delivery</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const Crunchies = () => {
  return (
    <View className="mx-5 gap-y-3">
      <Text className="font-dmMed text-[16px] text-[#010101]">All in Crunchies</Text>

      <View className="gap-y-4">
        <View>
          <Product image={require("../../assets/images/heavens-food.png")} title="The Heaven's Food" price="₦32,000" isHot={true} />
        </View>
        <View>
          <Product image={require("../../assets/images/sauce.png")} title="Veggie Delight Cheesesteak" price="₦8,000" isHot={false} />
        </View>
      </View>
    </View>
  );
};
export default Crunchies;
