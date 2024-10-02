import { View, Text, Image, FlatList, Pressable } from "react-native";
import AddButton from "../AddButton";
import Heart from "../Heart";
import type { Product } from "@/app/_layout";
import { products } from "./../../products";
import { router } from "expo-router";

const MenuItem = ({ product, itemIndex }: { product: Product; itemIndex: number }) => {
  return (
    <View key={itemIndex} className="w-[50%] border border-lightGrey border-solid rounded-md overflow-hidden mb-[15px]">
      <View className="flex-[1] relative">
        <Pressable className="flex-[1]" onPress={() => router.push(`/${product.id}`)}>
          <Image source={{ uri: product.image, width: 183, height: 117 }} className="flex-[1] w-full" resizeMode="cover" resizeMethod="scale" />
        </Pressable>
        <Heart productId={product.id} heartStyles="w-5 h-5 absolute z-[1] top-[5px] right-[5px]" />
      </View>

      <Pressable onPress={() => router.push(`/${product.id}`)} className="px-[10px] pt-[10px] w-full">
        <Text className="font-dm text-[13px] min-h-[34px]">{product.name}</Text>
        <Text className="font-dmMed text-[13px]">{product.price}</Text>
      </Pressable>
      <View className="w-full self-center px-[10px] my-[10px]">
        <AddButton product={product} />
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
