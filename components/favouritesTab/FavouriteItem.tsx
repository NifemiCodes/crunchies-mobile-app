import { View, Text, Image } from "react-native";
import type { Product } from "@/app/_layout";
import AddButton from "../AddButton";
import Heart from "../Heart";

const FavouriteItem = ({ product }: { product: Product | undefined }) => {
  return (
    <View className="w-full h-[96px] mb-4 flex-row p-[10px] items-center border border-veryLightGrey rounded-md">
      <Image
        source={{ uri: product?.image, width: 82, height: 76 }}
        className="flex-[1] w-[82px] h-[76px] mr-4 rounded-md"
        resizeMode="cover"
        resizeMethod="resize"
      />

      <View className="flex-[2] h-full justify-between items-start">
        <Text className="font-dm text-[13px]">{product?.name}</Text>
        <Text className="font-dmMed text-[13px] text-green">{product?.price}</Text>
        <View className="flex-row w-full items-center">
          <AddButton product={product as Product} moreStyles="flex-[2] mr-2" />
          <Heart heartStyles="w-7 h-7 border border-softYellow rounded-full justify-center items-center" productId={product?.id || ""} />
        </View>
      </View>
    </View>
  );
};
export default FavouriteItem;
