import { View, Text, FlatList, Image } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, Product } from "@/app/_layout";
import { products } from "@/products";

const Favourites = () => {
  const favIds = useSelector((state: RootState) => state.favourites.value);
  const [productsList, setProductsList] = useState<(Product | undefined)[]>([]);

  useEffect(() => {
    (async () => {
      const list = favIds.map((id) => products.find((product) => product.id === id));
      setProductsList(list);
    })();
  }, [favIds]);

  return productsList.length === 0 ? (
    <View className="flex-1 justify-center items-center">
      <Text className="font-dm text-[17px]">No Items Added</Text>
    </View>
  ) : (
    <View>
      <FlatList
        data={productsList}
        renderItem={({ item, index }) => (
          <View key={index}>
            <Image source={typeof item?.image === "string" ? { uri: item?.image } : item?.image} />
            <Text>{item?.name}</Text>
            <Text>{item?.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Favourites;
