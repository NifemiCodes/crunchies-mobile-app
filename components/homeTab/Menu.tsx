import { View, Text, Image, FlatList } from "react-native";
import AddButton from "../AddButton";
import Heart from "../Heart";
import { Product } from "@/app/_layout";
import { products } from "./../../products";

const MenuItem = ({ product, itemIndex }: { product: Product; itemIndex: number }) => {
  return (
    <View key={itemIndex} className="w-[50%] border border-lightGrey border-solid rounded-md overflow-hidden mb-[15px]">
      <View className="flex-[1] relative">
        <Image
          // remove the source conditional(they should all be url strings)
          source={typeof product.image === "string" ? { uri: product.image, width: 183, height: 117 } : product.image}
          className="flex-[1] w-full"
          resizeMode="cover"
          resizeMethod="scale"
        />
        <Heart productId={product.id} heartStyles="absolute z-[1] top-[5px] right-[5px]" />
      </View>

      <View className="px-[10px] pt-[10px] w-full">
        <Text className="font-dm text-[13px] min-h-[34px]">{product.name}</Text>
        <Text className="font-dmMed text-[13px]">{product.price}</Text>
      </View>
      <View className="w-full self-center px-[10px] my-[10px]">
        <AddButton />
      </View>
    </View>
  );
};

const Menu = () => {
  return (
    <View className="flex-[2]">
      <FlatList
        data={products}
        renderItem={({ item, index }) => <MenuItem product={item} itemIndex={index} />}
        numColumns={2}
        style={{ flex: 1 }}
        contentContainerStyle={{ marginHorizontal: 20 }}
        centerContent={true}
      />
    </View>
  );
};
export default Menu;
