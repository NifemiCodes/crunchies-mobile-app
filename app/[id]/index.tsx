import { View, Text, Image, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { products } from "@/products";
import { Product } from "../_layout";
import { StatusBar } from "expo-status-bar";
import Heart from "@/components/Heart";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  const params: { id: string } = useLocalSearchParams();
  const id: string = params.id;
  const product = products.find((product: Product) => product.id === id);

  return (
    <View className="flex-1 bg-white">
      <StatusBar backgroundColor="transparent" />

      {/* top image */}
      <View className="w-full h-[37.4%] items-center">
        <View className="absolute z-[1] left-5 right-5 top-10 flex-row justify-between items-center">
          <TouchableOpacity className="bg-white rounded-full w-10 h-10 justify-center items-center" onPress={() => router.back()}>
            <Image className="w-6 h-6" source={require("../../assets/images/back-arrow-icon.png")} />
          </TouchableOpacity>
          <Heart productId={id} heartStyles="w-10 h-10" />
        </View>

        <Image className="w-full h-full" source={{ uri: product?.image }} />
      </View>

      {/* text */}
      <View className="flex-1 px-5 gap-y-4">
        <View className="gap-y-1">
          <Text className="font-dmMed text-[20px] leading-[30px]">{product?.name}</Text>
          <Text className="font-dmb text-[16px] text-red">{product?.price}</Text>
        </View>
        <Text className="font-dm text-[14px] text-grey leading-[22px]">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa consectetur quos nam quae, debitis cum id sed explicabo maxime natus dolorum
          ab non, aspernatur numquam odio ex laborum saepe facere?
        </Text>
      </View>
    </View>
  );
};
export default index;
